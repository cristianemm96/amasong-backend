import User from "../models/user.js";
import Role from "../models/role.js";

export const createUser = async (req, res) => {
  const { email, password, roles } = req.body;
  const allRoles = await Role.find({ name: { $in: roles } });
  const user = await new User({
    email,
    password,
    roles: allRoles.map((r) => r._id),
    purchases: [],
  });
  user.password = await User.encryptPass(user.password);
};

export const getUserData = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  res.json(user.email);
};

export const getUsers = async (req, res) => {
  const users = await User.find();
  return res.json(users);
};



/*
export const getPurchases = async(req, res)=>{
  const { id } = req.params;
  const user = await User.findById(id)
  const purchases = user.purchases.map(p=> p.id)
  res.status(200).json(purchases)
}*/