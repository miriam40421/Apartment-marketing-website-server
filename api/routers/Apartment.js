import express from "express";
import { checkAdd } from "../middlewares.js";
import { upload } from '../middlewares.js'
import {
    create,
    update,
    remove,
    getAll,
    getWhereCost,
    getWhereBed,
    getByCodeAddvertiser,
    getByCodeCity,
    getByCodeCategory,
    getById
} from "../controllers/Apartment.js";


const router = express.Router()
router.get('', getAll)
router.get('/getWhereCost/:min/:max', getWhereCost)
router.get('/getWhereBed/:min/:max', getWhereBed)
router.get('/getbyAdd/:codeadvertiser', getByCodeAddvertiser)
router.get('/getbyCity/:codeCity', getByCodeCity)
router.get('/getbyCat/:codeCategory', getByCodeCategory)
router.get('/getbyid/:id', getById)
router.post('', checkAdd, upload.single('image'), create)
router.delete('/:id/:codeadvertiser', remove)
router.patch('/:id/:codeadvertiser', update)

export default router