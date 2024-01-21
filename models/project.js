import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    link: {
        type: String,
    },
    category: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    image: [
        {
          public_id: {
            type: String,
            required: true,
          },
          url: {
            type: String,
            required: true,
          },
        },
      ],
    featured: {
        type: Boolean,
        default: false
    }

})


const Project = mongoose.model("Project", projectSchema)


export default Project