
import { errRes, okRes} from '../../helpers/app/tools.helper'
import * as jwt from 'jsonwebtoken'
import * as ZC from 'zaincash'
// import Method from '../../src/entity/Method'


export default class zcController{



    static zcPay = (req, res)=>{
        // preparing payment data
        const paymentData = {
            amount: 250,
            orderId: 'some id',
            serviceType: 'some serviceType',
            redirectUrl: 'example.com/redirect',
            production: false,
            msisdn: '964****',
            merchantId: '5a647d843321dcd9cbc771c',
            secret: '$2y$10$9eaqimBisY15ZJZSSvC3Z.Ar1ET1.7Kgm8p7jysY1X.I8.RuwS.',
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



        

}


static redirect = (req, res) => {

    const token = req.headers.token;
  if(token){
    try {
      var decoded = jwt.verify(token, process.env.jstSecret);
    } catch(err) {
      return errRes(res, 'token is invalid')
    }
    if(decoded.status == 'success'){
      return okRes(res, "everything is working properly")
    }else {
      return errRes(res, 'somthing went wrong')
    }
  }


}
}