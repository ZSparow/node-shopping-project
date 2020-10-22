import {Request, Response} from "express"
import {errRes, okRes, otpGenerator, hashMyPassword, comparePassword} from "../../helpers/app/tools.helper"
import PhoneFormat from '../../helpers/app/phone.helper';
import {User} from "../../src/entity/User"
import {Product} from "../../src/entity/Product"
import {Invoice} from "../../src/entity/Invoice"
import {InvoiceItem} from "../../src/entity/InvoiceItem"
import * as jwt from "jsonwebtoken";
import * as validate from "validate.js"
import validator from "../../helpers/app/validator.helper"
import config from "../../config"
import * as ZC from "zaincash"






export default class UserController {



    //FIXME: this is first task

    static async register(req: Request, res: Response){

        //TODO: validate the req.body 
        let notValid = validate(req.body, validator.register() )
        if(notValid) return errRes(res, notValid)

        //TODO: check phone number
        let phoneObj = PhoneFormat.getAllFormats(req.body.phone)
        
        if(!phoneObj.isNumber) return errRes(res, `Phone number you have enterd is not valid`)
        //TODO: save all adata to the database in the User tabel
        let phone = phoneObj.globalP
        let user: any;
    try {
      user = await User.findOne({ where: { phone: req.body.phone } });
      if (user) {
        if (user.complete)
          return errRes(res, `Phone ${req.body.phone} already exists`);
          //TODO: send a token to the user and save it in the localstorage
        const token = jwt.sign({ id: user.id }, config.jstSecret);
        user.otp = otpGenerator();
        await user.save();
        user.password = null;
        user.otp = null;
        return okRes(res, { data: { user, token } });
      }
    } catch (error) {
      return errRes(res, error);
    }

    //TODO: hash the password
    const password = await hashMyPassword(req.body.password);




         user = await User.create({
            ...req.body,
            active: true,
            complete: false,
            otp: otpGenerator(),
          });
                await user.save();


        


    }


    //FIXME: this is the second task (OTP check)

    static async OTPCheck(req: Request, res: Response){
      //TODO: validate the otp from the req.body
      let notValid = validate(req.body, validator.otpChecker())
      if(notValid) return errRes(res, notValid)

        //TODO: read the  token from the req.header
        const token = req.headers.token
        if(!token) errRes(res,"the token is missing")

        let payload: any;
        try{
          payload = jwt.verify(token, config.jstSecret)

        } catch(err){
          return errRes(res, "invalid token")
        }

        //TODO: get the user from DB

        let user = await User.findOne(payload.id)
        if(!user) return errRes(res,'you are not registered')

        //TODO: check if the user is complete
        if(user.complete) return errRes(res,"the user is already complete")
        

        //TODO: compare the otp value from database ith req.body.otp
        if (user.otp != req.body.otp){
          user.otp = null;
          await user.save()
          return errRes(res,`The otp ${req.body.otp} is not correct`)
        }

        user.complete = true;
        await user.save()
        user.password = null;

        return okRes(res,{data: {user}})


        //TODO: check the OTP lenth = 4 digits
    
        //TODO: check the OTP if it is the same one in the database

        //TODO: if true set Completed in database to = True
    }


/**
 * 
 * @param req 
 * @param res 
 */
    static async login(req: Request, res: Response){
    
      //TODO: validate the req.body

      let notValid = validate(req.body, validator.login())
      if(notValid) return errRes(res,"invalid data")


      //TODO: phone format

      let phoneObj = PhoneFormat.getAllFormats(req.body.phone)
      if(!phoneObj.isNumber) return errRes(res,"your phone is invailed")

      const phone = phoneObj.globalP;

      //TODO: find the user from the database
      let user = User.findOne({where: {phone}})

      if(!user) return errRes(res,`Your phone number ${phone} are not registered`)

      //TODO: compare password

      let validPass = await comparePassword(req.body.password,  (await user).password)

      if (!validPass) errRes(res,"invalid password")



      //TODO: create token

      let token = jwt.sign({id: (await user).id}, config.jstSecret)
      return okRes(res, {data: {token}})

}

/**
 * 
 * @param req 
 * @param res 
 */

  static async makeInvoce (req: Request, res: Response){
    //TODO: validate
    let notValid = validate(req.body, validator.invoice)
    if(notValid) return errRes(res, notValid)

    //TODO: check if the product is exists

    let ids= []
    for (const iterator of req.body.products) {
      let notValid = validate(iterator, validator.oneProduct())
      if(notValid) return errRes(res, notValid)
      ids.push(iterator.id)
      }

      //TODO: get the user let user = req.user
    let user = req.user;

    //TODO: get the products from DB
    let products = await Product.findByIds(ids);

    [
      { id: 1, quantity: 2 },
      { id: 2, quantity: 1 },
    ];

    let total = 0;


    //TODO:  calculate the total from the products
    for (const product of products) {
      total =
        total +
        product.price *
          req.body.products.filter((e) => e.id == product.id)[0].quantity;
    }

    //TODO: create the invoice & save
    let invoice: any;
    invoice = await Invoice.create({
      ...req.body,
      total,
      status: "pending",
      user,
    });
    await invoice.save();

    //TODO: make Zain Cash
    const paymentData = {
      amount: invoice.total,
      orderId: invoice.id,
      serviceType: 'my own service',
      redirectUrl: 'example.com/redirect',
      production: false,
      msisdn: '9647835077880',
      merchantId: '5dac4a31c98a8254092da3d8',
      secret: '$2y$10$xlGUesweJh93EosHlaqMFeHh2nTOGxnGKILKCQvlSgKfmhoHzF12G',
      lang: 'ar'
    }
    let zc = new ZC(paymentData);
  zc.init().then(transactionId => {
    //  Save the transactionId in your DB
    console.log(transactionId);
    zc.pay(transactionId, res);
  }).catch(err => {
    res.status(400).send(err);
  });

     //TODO: create the invoice items
     for (const product of products) {
      let invoiceItem = await InvoiceItem.create({
        quantity: req.body.products.filter((e) => e.id == product.id)[0]
          .quantity,
        invoice,
        subtotal:
          req.body.products.filter((e) => e.id == product.id)[0].quantity *
          product.price,
        product,
      });
      await invoiceItem.save();
    }

    return okRes(res, { data: { invoice } });

}

/**
 * 
 * @param req 
 * @param res 
 */
static async changePassword(req: Request, res: Response){
    
  //TODO: validate the req.body

  let notValid = validate(req.body, validator.changePassword())
  if(notValid) return errRes(res,"invalid data")


  //TODO: phone format

  let phoneObj = PhoneFormat.getAllFormats(req.body.phone)
  if(!phoneObj.isNumber) return errRes(res,"your phone is invailed")

  const phone = phoneObj.globalP;

  //TODO: find the user from the database
  let user: any;
   user = User.findOne({where: {phone}})

  if(!user) return errRes(res,`Your phone number ${phone} are not registered`)


        //TODO: generate and check otp
        user.otp = otpGenerator();
        await user.save();


        if (user.otp != req.body.otp){
          user.otp = null;
          await user.save()
          return errRes(res,`The otp ${req.body.otp} is not correct`)
        }


        await user.save()
        user.password = null;

        return okRes(res,{data: {user}})

        //TODO: set a new password 
        const password = await hashMyPassword(req.body.password);

        user.password = password;
        await user.save()


  //TODO: create token

  let token = jwt.sign({id: (await user).id}, config.jstSecret)
  return okRes(res, {data: {token}})

}
}