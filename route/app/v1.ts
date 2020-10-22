import * as express from "express";
import UserController from '../../controller/app/userController'
import HomeController from '../../controller/app/homeController'
import zcController from '../../controller/app/zcController'
import userAuth from "../../middleware/app/userAuth"



const router = express.Router();

//-------------------- User Router ------------------
router.post('/register', UserController.register);
router.post('/otp', UserController.OTPCheck);
router.post('/login', UserController.login);
router.post('/invoice', UserController.makeInvoce);
router.post('/changePsw', UserController.changePassword);

//-------------------- Home Router ------------------

router.get("/categories", HomeController.getCategories);
router.get("/products/:category", HomeController.getProducts);
router.get("/methods", HomeController.getMethods);
router.get("/invoices", userAuth, HomeController.getInvoices);

//-------------------- Home Router ------------------

router.post("/zainCashPay", zcController.zcPay)
router.get("/redirect", zcController.redirect)


export default router;