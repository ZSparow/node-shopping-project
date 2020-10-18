import * as express from "express";
import {otpGenerator} from "../../helpers/app/tools.helper"
import UserController from '../../controller/app/controller'


const router = express.Router();

router.post('/register', UserController.register);
router.post('/otp', UserController.OTPCheck);


export default router;