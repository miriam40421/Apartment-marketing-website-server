import express from "express";

import {
    create,
    getAll,
} from "../controllers/Category.js";
import { checkAdd } from "../middlewares.js";


const router = express.Router()
router.get('', getAll)
router.post('',checkAdd, create)
export default router