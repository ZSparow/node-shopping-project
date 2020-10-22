require("dotenv").config();

let config:any;
export default config ={
    jstSecret : process.env.JWT_SECRET || "shhh"
}

