import * as express from "express";
import {Request, Response} from "express"
import {errRes, okRes, otpGenerator} from "../../helpers/app/tools.helper"
import PhoneFormat from './../../helpers/app/phone.helper';
import {User} from "../../src/entity/User"
import * as jwt from "jsonwebtoken";
import * as validate from "validate.js"
import validator from "../../helpers/app/validator.helper"
const app = express()
app.use(express.json())





export default class UserController {



    //FIXME: this is first task

    static async register(req: Request, res: Response){

        //TODO: validate the req.body 
        let notValid = validate(req.body, validator.register() )
        if(notValid) return errRes(res, notValid)

        //TODO: check phone number
        let phoneNumber = PhoneFormat.getAllFormats(req.body.phone)
        if(!phoneNumber.isNumber) return errRes(res, `Phone number you have enterd is not valid`)
        //TODO: hash the password
        //TODO: save all adata to the database in the User tabel
        // let user = await User.create({
        //     ...req.body,
        //     active: true,
        //     complete: false,
        //     otp: otpGenerator(),
        //   });
      
        // //   await user.save();


        //TODO: send a token to the user and save it in the localstorage
        let token = jwt.sign(req.body, "mith");
        res.json(okRes(res, {token}));
        // return okRes(res, req.body);
        // res.json(req.body.phone);

    }


    //FIXME: this is the second task (OTP check)

    static OTPCheck(req: Request, res: Response){
        //TODO: generate a random OTP of 4 digits
        const otpCode = otpGenerator();

        //TODO: check the OTP lenth = 4 digits
        if(req.body.otp < 4) res.send(okRes(res, {otpCode}))
        res.send(errRes(res, "the otp is invalid"))
        //TODO: check the OTP if it is the same one in the database
        //TODO: if true set Completed in database to = True
    }


}