import express from "express";

import {
  getAll,
  login,
  sign_in

} from "../controllers/Advertiser.js";
import { checkAdd } from "../middlewares.js";

const router = express.Router()
router.get('', getAll)
router.post('/login', login)
router.post('/sign', sign_in)

export default router