import Image from "../models/Image.js";
import Product from "../models/Product.js";
import Comment from "../models/Comment.js";
// const { ObjectId } = require('mongodb');
import approotpath from 'app-root-path'
import mongoose from "mongoose"
import multer from 'multer';
// Get all Products
async function findAll(req, res) {
    // console.log(1234);
    try {
        let productAggregate = [
            // { $unwind: "$images" }, // Giả sử 'image' là một mảng trong Product
            {
                $lookup: {
                    from: "images",
                    localField: "images._id",
                    foreignField: "_id",
                    as: "images"
                },
            },
        ];
        return await Product.aggregate(
            productAggregate
        );
        // return Product.find({});
    } catch (error) {
        throw new Error(error.message)
    }
}

async function findOne(req, res, next) {
    const { id } = req.params;
    try {
        console.log(req.params.id);
        return Product.findById(id).exec();
    } catch (error) {
        throw new Error(error.message)
    }

}
async function findComment(req, res, next) {
    const { id } = req.params;
    const idP = new mongoose.Types.ObjectId(id);
    try {
        const productJoin = await Product.aggregate([
            {
                $match: { _id: idP }
            },
            {
                $lookup: {
                    from: "comments",
                    localField: "comments._id",
                    foreignField: "_id",
                    as: "comments",

                }
            },
            {
                $lookup: {
                    from: "users",
                    localField: "comments.user", // Assuming there is a "userId" field in comments
                    foreignField: "_id",
                    as: "users"
                }
            }
        ]);
        if (productJoin[0].comments) {
            return productJoin[0].comments;
        }
        return [];
    } catch (error) {
        throw new Error(error.message)
    }

}
async function createOne(req, res, next) {
    try {
        let image, comment;
        console.log(req.body);
        if (req.body.images) { image = await Image.insertMany(req.body.images); }
        if (req.body.comments) { comment = await Comment.insertMany(req.body.comments); }
        // const thumbnail = req.file.filename;
        // console.log(thumbnail);
        return await Product.create({
            ...req.body,
            images: image,
            comments: comment,

        });
    } catch (error) {
        throw new Error(error.message)
    }

}
async function deleteOne(req, res, next) {
    const { id } = req.params;
    try {
        return await Product.deleteOne({ _id: id }).exec();

    } catch (error) {
        throw new Error(error.message)
    }

}
async function updateOne(req, res, next) {
    const { id } = req.params;
    try {
        return await Product.updateOne({ _id: id }, { ...req.body }).exec();

    } catch (error) {
        throw new Error(error.message)
    }

}

export default {
    findAll,
    findOne,
    createOne,
    deleteOne,
    updateOne,
    findComment
}
