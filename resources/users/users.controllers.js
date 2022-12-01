import { User } from "./users.model.js";

export const createUser = async(req, res) => {
    const newUser = new User({
        name: req.body.name,
        lastName: req.body.lastName,
        age: req.body.age,
        genre: req.body.genre

    });
    try {
        const savedUser = await newUser.save();
        return res.status(200).json(savedUser);
    } catch (err) {
        return res.status(500).json(err);
    }
};

export const getUsers = async(req, res) => {
    try {
        const users = await User.find();
        return res.status(200).json(users);
    } catch (err) {
        return res.status(500).json(err);
    }
};
export const getUser = async(req, res) => {
    const id = req.params.user;

    try {
        const user = await User.findById(id);
        return res.status(200).json(user);
    } catch (err) {
        return res.status(500).json(err);
    }
};
export const deleteUser = async(req, res) => {
    const id = req.params.user;
    try {
        const user = await User.findByIdAndDelete(id);
        return res.status(200).json(user);
    } catch (err) {
        return res.status(500).json(err);
    }
};
export const updateUser = async(req, res) => {
    const id = req.params.user;
    try {
        const user = await User.findByIdAndUpdate(id, req.body, {
            new: true,
        });
        return res.status(200).json(user);
    } catch (err) {
        return res.status(500).json(err);
    }
};