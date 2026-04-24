const User = require('../models/User');

const createUser = async (req, res) => {
    try {
        const { first_name, last_name, age } = req.body;

        if (!first_name || !last_name || age === undefined) {
            return res.status(400).json ({ error: 'first_name, last_name и age обязательны'});
        }
        const user = await User.create({
            first_name,
            last_name,
            age,
            created_at: Math.floor(Date.now() / 1000),
            updated_at: Math.floor(Date.now() / 1000),            
        });

        res.status(201).json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getUserById = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);

        if (!user) {
        return res.status(404).json({ error: 'Пользователь не найден' });
        }

        res.json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const updateUser = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);

        if (!user) {
        return res.status(404).json({ error: 'Пользователь не найден' });
        }

        const { first_name, last_name, age } = req.body;

        await user.update({
        ...(first_name !== undefined && { first_name }),
        ...(last_name !== undefined && { last_name }),
        ...(age !== undefined && { age }),
        updated_at: Math.floor(Date.now() / 1000),
        });

        res.json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const deleteUser = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);

        if (!user) {
        return res.status(404).json({ error: 'Пользователь не найден' });
        }

        await user.destroy();
        res.json({ message: 'Пользователь удалён' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { createUser, getAllUsers, getUserById, updateUser, deleteUser };
