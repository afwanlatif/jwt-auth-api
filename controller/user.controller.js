const envConfig = require('../config/env.config');
const { RecordStatus } = require("../constants");
const UserModel = require("../model/user.model");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')


// Add User

const addUser = async (req, res) => {
    try {
        const userData = req.body;
        if (!userData) {
            return res.status(400).json({ message: 'Required fields are missing' })
        }
        const existingUser = await UserModel.findOne({ email: userData.email });
        if (existingUser) {
            return res.status(409).json({ message: 'User with the same email already exists in db' })
        }
        const hashedPassword = await bcrypt.hash(userData.password, 10);
        const createdUser = new UserModel({ ...userData, password: hashedPassword, createdBy: userData.email });
        console.log(createdUser);
        await createdUser.save();
        return res.status(201).json({ message: 'User Created Sucessfully', createdUser });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error', error })
    }
};

// Update User

const updateUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const userData = req.body;
        if (!userId) {
            return res.status(400).json({ message: 'User Id is required for update' });
        }
        if (!userData) {
            return res.status(400).json({ message: 'Required fields are missing' })
        }
        const user = await UserModel.findByIdAndUpdate(userId, { ...userData, updatedBy: userData.email });
        if (!user) {
            return res.status(404).json({ message: 'User Not Found' });
        }
        return res.status(200).json({ message: 'User Updated Sucessfully', userData })
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error', error })
    }
}

// Get User

const getUser = async (req, res) => {
    try {
        const userId = req.params.id;
        if (!userId) {
            return res.status(400).json({ message: 'UserId Is Required' })
        }
        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User Not Found' });
        }
        return res.status(200).json({ message: 'User Fetched Sucessfully', user })
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error', error })
    }
};

// Delete User

const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;
        if (!userId) {
            return res.status(400).json({ message: 'UserId Is Required' });
        }
        const user = await UserModel.findByIdAndUpdate(userId, { recStatus: RecordStatus.DEACTIVE }, { new: true });
        if (!user) {
            return res.status(404).json({ message: 'User Not Found' });
        };
        return res.status(200).json({ message: 'User Deleted Sucessfully', user })
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error', error })
    }
};

// User Lists

const userLists = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1; // Default to page 1
        const limit = envConfig.pagination_limit; // 5 per page
        const offSet = (page - 1) * limit;
        
        const totalUsers = await UserModel.countDocuments({ recStatus: RecordStatus.ACTIVE });
        const users = await UserModel.find().skip(offSet).limit(limit);
        const totalPages = Math.ceil(totalUsers / limit);
        
        return res.status(200).json({
            message: 'User Lists Fetched Sucessfully',
            page,
            limit,
            totalPages,
            totalUsers,
            users
        });
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error', error })
    }
}

// Login

const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and Password are required for Login' });
        };
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User Not Found Authentication Failed' });
        };
        const matchPassword = await bcrypt.compare(password, user.password);
        if (!matchPassword) {
            return res.status(401).json({ message: 'Invalid Password' });
        };
        const accessToken = jwt.sign({ userId: user._id }, envConfig.my_secret_key, { expiresIn: envConfig.access_token_expires_in });
        const refreshToken = jwt.sign({ userId: user._id }, envConfig.my_secret_key, { expiresIn: envConfig.refresh_token_expires_in });
        user.refreshToken = refreshToken;
        await user.save();
        return res.status(200).json({ accessToken, refreshToken });
    } catch (error) {
        return res.status(500).json({ message: 'User LogedIn Failed', error })
    };
};

// RefreshToken 

const refreshToken = async (req, res) => {
    try {
        const { refreshToken } = req.body;
        if (!refreshToken) {
            return res.status(401).json({ message: 'Refresh Token is required' });
        };

        // Verify refresh token signature
        jwt.verify(refreshToken, envConfig.my_secret_key);

        const user = await UserModel.findOne({ refreshToken });
        if (!user) {
            return res.status(403).json({ message: 'Invalid Refresh Token' });
        };

        const newaccessToken = jwt.sign({ userId: user._id }, envConfig.my_secret_key, { expiresIn: envConfig.access_token_expires_in });
        const newrefreshToken = jwt.sign({ userId: user._id }, envConfig.my_secret_key, { expiresIn: envConfig.refresh_token_expires_in });
        user.refreshToken = newrefreshToken;
        await user.save();
        return res.status(200).json({ newaccessToken, newrefreshToken });
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error', error });
    };
};

module.exports = {
    addUser,
    updateUser,
    getUser,
    deleteUser,
    userLists,
    userLogin,
    refreshToken
}