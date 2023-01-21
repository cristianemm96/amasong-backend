import Product from "../models/product.js";

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (err) {
    res.status(504).json("No se pudo obtener la información");
  }
};

export const getProduct = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id)
    const product = await Product.findById(id);
    console.log("Producto:" ,product)
    res.status(200).json(product);
  } catch (err) {
    res.status(504).json("No se pudo obtener la información");
  }
};

export const addProduct = async (req, res) => {
  const newProduct = new Product({
    categorie: req.body.categorie,
    desc: req.body.desc,
    imgUrl: req.body.imgUrl,
    name: req.body.name,
    price: req.body.price,
    selled: 0,
  });
  await newProduct.save();
  res.status(200).json(newProduct);
};

export const addSellToProduct = async (req, res) => {
  const { id } = req.params;
  const productToUpdate = await Product.findById(id);
  const cantSells = productToUpdate.selled;
  await Product.findByIdAndUpdate(id, {
    selled: cantSells + 1,
  });
  res.status(200).json("Producto actualizado");
};
