import "reflect-metadata";
import * as express from "express";
import v1 from "../route/app/v1"
const app = express();
app.use(express.json())
const port =3000;


app.use("/v1", v1)






app.listen(port, ()=>{console.log(`listening on port ${port}`)})