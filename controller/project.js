import Project from "../models/project.js";
import cloudinary from 'cloudinary'

export const getAllProjects = async (req, res) => {

    try {

        let projects = await Project.find();

        let projectsCount = await Project.countDocuments()

        return res.status(200).json({
            success: true,
            projects,
            projectsCount
        })


    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}


export const getProjectDetail = async (req, res) => {

    try {

        let project = await Project.findById(req.params.id)

        return res.status(200).json({
            success: true,
            project
        })


    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message
        })
    }
}


export const addNewProject = async (req, res) => {

    try {


        let images = [];

        if (typeof req.body.image === "string") {
            images.push(req.body.image);
        } else {
            images = req.body.image;
        }

        const imagesLinks = [];

        for (let i = 0; i < images.length; i++) {
            const result = await cloudinary.v2.uploader.upload(images[i], {
                folder: "Artline-Projects",
            });


            imagesLinks.push({
                public_id: result.public_id,
                url: result.secure_url,
            });
        }
        req.body.image = imagesLinks

        let project = await Project.create(req.body)

        return res.status(201).json({
            success: true,
            message: "Project Added Successfully",
            project
        })


    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message
        })
    }
}


export const updateProject = async (req, res) => {

    try {

        let project = await Project.findById(req.params.id)

        if (!project) {
            return res.status(404).json({
                success: false,
                message: "Project Not Found"
            })
        }

        let images = [];

        if (typeof req.body.image === "string") {
            images.push(req.body.image);
        } else {
            images = req.body.image;
        }

        if (images !== undefined) {
            // Deleting Images From Cloudinary
            for (let i = 0; i < project.image.length; i++) {
                await cloudinary.v2.uploader.destroy(project.image[i].public_id);
            }

            const imagesLinks = [];

            for (let i = 0; i < images.length; i++) {
                const result = await cloudinary.v2.uploader.upload(images[i], {
                    folder: "Artline-Projects",
                });

                imagesLinks.push({
                    public_id: result.public_id,
                    url: result.secure_url,
                });
            }

            req.body.image = imagesLinks;
        }

        project = await Project.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        })

        return res.status(200).json({
            success: true,
            message: "Project Updated Successfully"
        })


    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}


export const deleteProject = async (req, res) => {

    try {


        let project = await Project.findById(req.params.id)

        if (!project) {
            return res.status(404).json({
                success: false,
                error: "Project Not Found"
            })
        }


        for (let i = 0; i < project.image.length; i++) {
            await cloudinary.v2.uploader.destroy(project.image[i].public_id);
        }

        await Project.deleteOne(project)

        return res.status(200).json({
            success: true,
            message: "Project Deleted Successfully"
        })


    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message
        })
    }
}