import express from 'express'
import { addNewPricing, editPricing, getAllPricings, getPricing } from '../controller/price.js'
import { isAdmin, isAuthenticated } from '../auth/isAuthenticated.js'


const router = express.Router()


router.get("/prices", getAllPricings)

router.post("/price/add", addNewPricing)

router.put("/price/:id", editPricing)

router.get("/price/:id", getPricing)




export default router