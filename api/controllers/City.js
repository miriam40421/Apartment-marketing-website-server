import City from "../models/City.js"

export const getAll = (req, res) => {

    City.find()
        .then(x => {
            res.status(200).send(x)
        })
        .catch(err => {
            res.status(500).send({ error: err.message })
        })
}

export const create = (req, res) => {

    const {namecity} = req.body

    const newCity = new City({
        namecity,
    })

    newCity.save()
        .then(City => {
            res.status(200).send(City._id)
        })
        .catch(err => {
            res.status(500).send({ error: err.message })
        })
}

