import mongoose from "mongoose";


const pricingSchema = new mongoose.Schema({
    price: Number,
    packageName: String
})


const Pricing = mongoose.model("Pricing", pricingSchema)


export default Pricing