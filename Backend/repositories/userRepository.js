import User from "../models/User.js";

// Get all Users
async function findAll(req, res) {
    try {
        console.log(1234);
        return User.find({});
    } catch (error) {
        throw new Error(error.message)
    }
}

async function findOne(req, res, next) {
    const { id } = req.params;
    try {
        console.log(req.params.id);
        return User.findById(id).exec();
    } catch (error) {
        throw new Error(error.message)
    }

}
async function createOne(req, res, next) {


    try {
        console.log(req.body);

        return await User.create(req.body);
    } catch (error) {
        throw new Error(error.message)
    }

}
async function deleteOne(req, res, next) {
    const { id } = req.params;
    try {
        return await User.deleteOne({ _id: id }).exec();

    } catch (error) {
        throw new Error(error.message)
    }

}
async function updateOne(req, res, next) {
    const { id } = req.params;
    try {
        return await User.updateOne({ _id: id }, { ...req.body }).exec();

    } catch (error) {
        throw new Error(error.message)
    }

}

export default {
    findAll,
    findOne,
    createOne,
    deleteOne,
    updateOne
}
