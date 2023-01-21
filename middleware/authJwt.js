import jwt from "jsonwebtoken";
import User from "../models/user.js";
import dotenv from "dotenv";
import Role from "../models/role.js";
dotenv.config();

export const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers["x-access-token"];
    if (!token)
      return res.status(403).json({ message: "Token no encontrado." });
    const decoded = jwt.verify(token, process.env.SECRET);
    req.userId = decoded.id;
    const user = User.findById(req.userId);
    if (!user)
      return res.status(404).json({ message: "Usuario no encontrado" });
    next();
  } catch (error) {
    return res.status(401).json({ message: "Usuario no autorizado" });
  }
};

export const isAdmin = async (req, res, next) => {
  const user = await User.findById(req.userId)
  const roles = await Role.find({_id:{$in:user.roles}})
  for(let i = 0; i < roles.length; i++){
    if(roles[i].name === "admin"){
      next()
      return
    }
  }
  return res.status(403).json({message:"Requiere permiso de administrador para realizar esta tarea."})
};
