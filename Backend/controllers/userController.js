import { userRepository } from '../repositories/index.js'

async function findAll(req, res) {
    try {
        const users = await userRepository.findAll(req, res);
        res.status(200).json({
            message: 'Get all users successfully.',
            data: users
        })
    } catch (error) {
        res.status(500).json({
            message: error.toString()
        })
    }
}

async function findOne(req, res, next) {

    try {

        const user = await userRepository.findOne(req, res, next);

        if (user.length !== 0) {
            return res.status(200).json({
                message: 'find one user successfully',
                data: user
            })
        }
        return res.status(404).json({
            message: 'user not found'
        });
    } catch (error) {

        res.status(500).json({
            message: error.toString()
        })
    }

}
async function createOne(req, res, next) {

    try {

        const user = await userRepository.createOne(req, res, next);
        if (user) {
            return res.status(201).json({
                message: 'Create user successfully',
                data: user
            })
        }
        return res.status(400).json({
            message: 'Can not create user'
        });

    } catch (error) {
        return res.status(500).json({
            message: error.toString()
        })

    }

}
async function deleteOne(req, res, next) {

    try {

        const user = await userRepository.deleteOne(req, res, next);
        if (user.deletedCount > 0) {
            return res.status(200).json({
                message: 'Delete user successfully',
                data: user
            })
        }
        return res.status(400).json({
            message: 'user not found',
        })
    } catch (error) {

        return res.status(500).json({
            message: error.toString()
        })
    }

}
async function updateOne(req, res, next) {

    try {

        const user = await userRepository.updateOne(req, res, next);
        if (user.modifiedCount > 0) {
            return res.status(200).json({
                message: 'Update user successfully',
                data: user
            })
        }
        return res.status(400).json({
            message: 'user not found',
        })
    } catch (error) {

        return res.status(500).json({
            message: error.toString()
        })
    }

}




export default {
    findAll,
    findOne,
    createOne, deleteOne, updateOne
}