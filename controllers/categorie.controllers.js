import Categorie from '../models/categorie.js'

export const addCategorie = async (req, res)=>{
    const newCategorie = new Categorie({
        categorie: req.body.categorie
    })
    await newCategorie.save()
    res.status(200).json("Categoria agregada")
}

export const getCategories = async (req, res)=>{
    const categories = await Categorie.find();
    res.status(200).json(categories)
}