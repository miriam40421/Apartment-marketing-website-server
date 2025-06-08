import Category  from "../models/Category.js"
export const getAll = (req, res) => {

    Category.find()
        .then(x => {
            res.status(200).send(x)
        })
        .catch(err => {
            res.status(500).send({ error: err.message })
        })


}
export const create = (req, res) => {

    const {nameCategory} = req.body

    const newCategory = new Category({
        nameCategory,
    })

    newCategory.save()
        .then(Category => {
            res.status(200).send(Category._id)
        })
        .catch(err => {
            res.status(500).send({ error: err.message })
        })
}
