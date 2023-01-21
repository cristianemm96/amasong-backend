import { currentRoles } from "../models/role.js";
import User from "../models/user.js";

export const checkDuplicateEmail = async (req, res, next) => {
    const email = await User.findOne({email: req.body.email})
    if(email) return res.status(400).json({message: "Email ya utilizado"})
    next()
};  

export const checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!currentRoles.includes(req.body.roles[i])) {
        return res.status(400).json({
          message: `Rol ${req.body.roles[i]} no existe`,
        });
      }
    }
  }
  next();
};
