



const errRes = (res, err, statusCod = 400)=>{
    let response = {status: false, err}
    res.statusCode = statusCod;
    return res.json(response)
}


const okRes = (res, data, status = 200)=>{
    let response = {status : true, data }
    res.statusCode = status;
    return res.json(response)
}



const otpGenerator =()=> Math.floor(1000 + Math.random() * 9000);


export {errRes, okRes, otpGenerator};