
import { errRes } from "../../helpers/app/tools.helper";
import * as jwt from "jsonwebtoken";
import config from "../../config";
import { User } from "../../src/entity/User";


let userAuth: any;

export default userAuth = async (req, res, next) => {
    const token = req.headers.token;
  if (!token) return errRes(res, "Token is required ");

  let payload: any;
  try {
    payload = jwt.verify(token, config.jstSecret);
  } catch (error) {
    return errRes(res, "Invalid token");
  }

  let user = await User.findOne({
    where: { id: payload.id, active: true, complete: true },
  });
  if (!user) return errRes(res, "Please complete the registration process");

  req.user = user;

  return next();
}