import jwt from "jsonwebtoken";
import User from "../models/user.js";
import dotenv from "dotenv";
import Role from "../models/role.js";
import { transporter } from "../config/mailer.js";

dotenv.config();

export const signIn = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email }).populate(
      "roles"
    );

    if (!user)
      return res.status(400).json({ message: "Usuario no encontrado" });
    const matchedPassword = await User.comparePass(
      req.body.password,
      user.password
    );

    if (!matchedPassword)
      return res
        .status(401)
        .json({ token: null, message: "Password incorrecta" });
    const token = jwt.sign({ id: user._id }, process.env.SECRET, {
      expiresIn: 35000,
    });
    return res
      .status(200)
      .json({ token: token, id: user._id, email: req.body.email });
  } catch (error) {
    return res.status(401).json(error.message);
  }
};

export const signUp = async (req, res) => {
  try {
    const { email, password, roles } = req.body;
    const user = new User({
      email,
      password: await User.encryptPass(password),
      purchases: [],
    });
    if (roles) {
      const foundRoles = await Role.find({ name: { $in: roles } });
      user.roles = foundRoles.map((role) => role._id);
    } else {
      const role = await Role.findOne({ name: "user" });
      user.roles = [role._id];
    }
    const savedUser = await user.save();
    const token = jwt.sign({ id: savedUser._id }, process.env.SECRET, {
      expiresIn: 35000,
    });
    return res.status(200).json({ token });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json("Email o usuario ya utilizado");
    }
  }
};

export const checkEmailForForgotPassword = async (req, res) => {
  const { emailReq } = req.body;
  if (!emailReq)
    return res.status(400).json({ message: "Debe ingresar un email" });
  const response = await User.find({ email: emailReq });
  if (!(response.length > 0))
    return res.status(400).json({ message: "Ha ocurrido un error" });
  const message = "Revisa tu email para cambiar la contraseña";
  let emailStatus = "OK";
  let link = "";
  try {
    const token = jwt.sign({ id: response[0].id }, process.env.SECRET, {
      expiresIn: 4000,
    });
    link = `http://localhost:3000/new-password/${token}`;
    console.log(token);
  } catch (error) {
    res.status(400).json({ message });
  }
  try {
    await transporter.sendMail({
      from: '"Contraseña olvidada" <cristian.emanuel.m96@gmail.com>', // sender address
      to: `${emailReq}`, // list of receivers
      subject: "Restaurar contraseña", // Subject line
      html: `
        <b>Haz click en el siguiente enlace para restaurar tu contraseña</b>
        <a href="${link}">${link}</a>
      `, // html body
    });
  } catch (error) {
    emailStatus = error;
    res.status(400).json({ message: "Algo ha salido mal" });
  }
  res.status(200).json(message);
};

export const createNewPassword = async (req, res) => {
  const { passwordR, passwordVerification } = req.body;
  const token = req.headers["x-access-token"];
  if (!(passwordR == passwordVerification))
    return res.status(400).json({ message: "Las contraseñas deben coincidir" });
  try {
    let jwtPayload = jwt.verify(token, process.env.SECRET);
    console.log(jwtPayload.id);
    await User.findByIdAndUpdate(jwtPayload.id, {
      password: await User.encryptPass(passwordR),
    });
    return res.status(200).json({ message: "Contraseña actualizada" });
  } catch (error) {
    return res.status(400).json(error);
  }
};
