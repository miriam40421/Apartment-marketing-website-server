import Apartment from '../models/Apartment.js'
import Category from '../models/Category.js'
import City from '../models/City.js'
import Advertiser from '../models/Advertiser.js'
// •	שליפת כל הדירות
export const getAll = (req, res) => {
    Apartment.find()
    .populate({ path: 'codeCategory', select: '-_id nameCategory' })
    .populate({ path: 'codeCity', select: '-_id namecity' })
    .populate({ path: 'codeadvertiser', select: ' email phone anotherPhone' })
        .then(x => {
            res.status(200).send(x)
        })
        .catch(err => {
            res.status(500).send({ error: err.message })
        })
}
//הוספה
export const create = (req, res) => {
        console.log(req.file);
        console.log("---------------");
        
        console.log(req.body);

        const{path:image}=req.file
        console.log(req.body);

        const { name, description, codeCategory, codeCity, adress, numBed, more, price, codeadvertiser } = req.body

    const newApartment = new Apartment({
        name, description,
        image: image.replace('\\', '/'),
         codeCategory, codeCity, adress, numBed, more, price, codeadvertiser
    })
    
    newApartment.save()
    .then(async apart => {

        let x = await Category.findByIdAndUpdate(apart.codeCategory, { $push: { arrApartment: apart._id } })
        if (!x) {
            
            return res.status(1).send({ message: `create apart ${apart._id} succeed! update category failed!` })
        }
        let y = await City.findByIdAndUpdate(apart.codeCity, { $push: { arrApartment: apart._id } })
        if (!y) {

            return res.status(2).send({ message: `create apart ${apart._id} succeed! update city failed!` })
        }
        let z = await Advertiser.findByIdAndUpdate(apart.codeadvertiser, { $push: { arrApartment: apart._id } })
        if (!z) {
            console.log("z");
            
            return res.status(3).send({ message: `create apart ${apart._id} succeed! update advertiser failed!` })
        }

        return res.status(200).send({ message: `create apart ${apart._id} succeed!` })
    })
    .catch(err => {
        console.log("err");

        return res.status(4).send({ error: err.message })
    })
}
// מחיקה
export const remove = (req, res) => {
    
    const { id, codeadvertiser } = req.params
    let a = Apartment.find().where({ _id: { $eq: id } })
        .then(async ap => {
            const [app] = ap
            if (app.codeadvertiser != codeadvertiser)
                return res.status(404).send("you cant remove")
            Apartment.findByIdAndDelete(app._id)
                .then(async a => {
                    let x = await Category.findByIdAndUpdate(app.codeCategory, { $pull: { arrApartment: app._id } })
                    if (!x) {
                        return res.status(500).send({ message: `create apart ${app._id} succeed! update category failed!` })
                    }
                    let y = await City.findByIdAndUpdate(app.codeCity, { $pull: { arrApartment: app._id } })
                    if (!y) {
                        return res.status(500).send({ message: `create apart ${app._id} succeed! update city failed!` })
                    }
                    let z = await Advertiser.findByIdAndUpdate(app.codeadvertiser, { $pull: { arrApartment: app._id } })
                    if (!z) {
                        return res.status(500).send({ message: `create apart ${app._id} succeed! update person failed!` })
                    }
                    res.status(200).send(a._id)

                })
                .catch(err => {
                    res.status(500).send(err.message)
                })
        })
        .catch(err => {
            res.status(500).send(err.message)
        })
}


// •	שליפת דירה לפי קוד
export const getById = (req, res) => {
    Apartment.findById(req.params.id)
        .then(Apartment => {
            if (!Apartment) {
                return res.status(404).send({ error: `Apartment not found!` })
            }
            res.status(200).send({ Apartment })
        })
        .catch(err => {
            res.status(500).send({ error: err.message })
        })
}
// עדכון
export const update = (req, res) => {
console.log( );

    let a = Apartment.find().where({ _id: { $eq: req.params.id } })
        .then(ap => {
            const [aa] = ap
            console.log(aa);
            if (aa.codeadvertiser != req.params.codeadvertiser) {
                res.status(401).send("you can't")
            }
            else {
                Apartment.findByIdAndUpdate( req.params.id, req.body, { new: true })
                    .then(Apartment => {
                        console.log(Apartment._id);

                        res.status(200).send(Apartment)

                    })
                    .catch(err => {
                        res.status(500).send({ error: err.message })
                    })
            }

        }
        )
        .catch(err => {
            res.status(500).send({ error: err.message })
        })

}
// •	שליפת דירות לפי קוד קטגוריה
export const getByCodeCategory = (req, res) => {

    Apartment.find().where({ codeCategory: { $eq: req.params.codeCategory } })
        .then(A => {
            if (A.length == 0) {
                return res.status(404).send({ error: `Apartment not found!` })
            }
            res.status(200).send(A)
        })
        .catch(err => {
            res.status(500).send({ error: err.message })
        })

}

// •	שליפת דירות לפי קוד עיר
export const getByCodeCity = (req, res) => {

    Apartment.find().where({ codeCity: { $eq: req.params.codeCity } })
        .then(A => {
            if (A.length == 0) {
                return res.status(404).send({ error: `Apartment not found!` })
            }
            res.status(200).send(A)
        })
        .catch(err => {
            res.status(500).send({ error: err.message })
        })

}
// •	שליפת דירות לפי קוד מפרסם 
export const getByCodeAddvertiser = (req, res) => {

    Apartment.find().where({ codeadvertiser: { $eq: req.params.codeadvertiser } })
        .then(A => {
            if (A.length == 0) {
                return res.status(404).send({ error: `Apartment not found!` })
            }
            res.status(200).send(A)
        })
        .catch(err => {
            res.status(500).send({ error: err.message })
        })

}
// •	שליפת דירות לפי כמות מיטות (גדולה מ / קטנה מ / שווה ל פונקציות דומות, אבל עם תנאי שונה...)
export const getWhereBed = (req, res) => {
    const { min, max } = req.params;

    Apartment.find().where({
        $and: [
            { numBed: { $gte: min } },
            { numBed: { $lte: max } }
        ]
    })
        .then(data => {
            res.status(200).send(data)
        })
        .catch(err => {
            res.status(500).send({ error: err.message })
        })

}
// •	שליפת דירות לפי מחיר (גדול מ / קטן מ - כנ"ל)
export const getWhereCost = (req, res) => {

    const { min, max } = req.params;

    Apartment.find().where({
        $and: [
            { price: { $gte: min } },
            { price: { $lte: max } }
        ]
    })
        .then(data => {
            res.status(200).send(data)
        })
        .catch(err => {
            res.status(500).send({ error: err.message })
        })

}

