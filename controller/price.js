import Pricing from "../models/price.js"

export const getAllPricings = async (req, res) => {
    try {
        const pricings = await Pricing.find()
        return res.json({
            success: true,
            pricings
        })
    } catch (error) {
        return res.status(200).json({
            success: false,
            message: error.message
        })
    }
}

export const addNewPricing = async (req, res) => {
    try {
        const { packageName, price } = req.body
        await Pricing.create({
            packageName, price
        })

        return res.status(201).json({
            success: true,
            message: "Pricing Added Successfully"
        })
    } catch (error) {
        return res.json({
            success: false,
            message: error.message
        })
    }
}


export const editPricing = async (req, res) => {
    try {

        const { id } = req.params

        let pricing = await Pricing.findById(id)

        if (!pricing) {
            return res.json({
                success: false,
                message: "Package Not Found"
            })
        }

        const { packageName, price } = req.body

        await Pricing.findByIdAndUpdate(id, {
            packageName, price
        })

        return res.status(201).json({
            success: true,
            message: "Price Updated Successfully"
        })
    } catch (error) {
        return res.json({
            success: false,
            message: error.message
        })
    }
}


export const getPricing = async (req, res) => {
    try {

        const { id } = req.params

        let pricing = await Pricing.findById(id)

        if (!pricing) {
            return res.status(404).json({
                success: false,
                message: "Package Not Found"
            })
        }

        return res.status(200).json({
            success: true,
            pricing
        })
    } catch (error) {
        return res.json({
            success: false,
            message: error.message
        })
    }
}
