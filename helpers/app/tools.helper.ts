
import * as bcrypt from "bcrypt";

/**
 * 
 * @param res 
 * @param err 
 * @param statusCod 
 */
const errRes = (res, err, statusCod = 400)=>{
    let response = {status: false, err}
    res.statusCode = statusCod;
    return res.json(response)
}

/**
 * 
 * @param res 
 * @param data 
 * @param status 
 */
const okRes = (res, data, status = 200)=>{
    let response = {status : true, data }
    res.statusCode = status;
    return res.json(response)
}

/**
 * 
 */

const otpGenerator =()=> Math.floor(1000 + Math.random() * 9000);


/**
 * 
 * @param plainPassword 
 */
const  hashMyPassword = async (plainPassword: string )=> {
    const salt = await bcrypt.genSalt(10);
  const password = await bcrypt.hash(plainPassword, salt);
  return password;
}

/**
 * 
 * @param plainPassword 
 * @param hash 
 */
const comparePassword = async (plainPassword: string, hash) => await bcrypt.compare(plainPassword, hash)




export {errRes, okRes, otpGenerator, hashMyPassword , comparePassword};