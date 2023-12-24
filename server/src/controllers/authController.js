const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models/User');
require('dotenv').config();


const AuthController = {

    // // Tạo accessToken 
    generateAccessToken: (user) => {
        const accessToken = jwt.sign({
            id: user.id, email: user.email, isAdmin: user.isAdmin
        }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '2h' });
        return accessToken;
    },
    // // Tạo refreshToken
    generateRefreshToken: (user) => {
        const refreshToken = jwt.sign({
            id: user.id, email: user.email, isAdmin: user.isAdmin
        }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
        return refreshToken;
    },

    // // Đăng nhập
    login: async (req, res) => {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ email: email });
            if (!user)
                return res.status(404).json('Không tìm thấy người dùng');

            //         // Tìm thấy tài khoản, so sánh mật khẩu
            const isSamePassword = bcrypt.compareSync(password, user.password);
            if (isSamePassword) {
                const accessToken = AuthController.generateAccessToken(user);
                user.accessToken = accessToken;
                const refreshToken = AuthController.generateRefreshToken(user);
                user.refreshTokens.push(refreshToken);
                res.cookie('refreshToken', refreshToken, {
                    httpOnly: true,
                    secure: false,
                    sameSite: "strict"
                });

                await User.updateOne({ _id: user._id }, user);
                const { password, ...others } = user._doc;
                return res.status(200).json(others);
            } else {
                return res.status(401).json('Mật khẩu không chính xác! Vui lòng nhập lại');
            }
        } catch (err) {
            return res.status(400).json({ message: `Có lỗi trong quá trình đăng nhập : ${err}` });
        }
    },

    refreshToken: async (req, res) => {
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken)
            res.status(401).json('Unauthorized error!');

        const { email } = req.body;
        const user = await User.findOne({ email: email });

        if (!user.refreshTokens.includes(refreshToken))
            res.status(403).json('Forbidden action!');
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (err, user) => {
            console.log(user);
            if (err) {
                res.status(403).json('Forbidden error!');
            }
            const newAccessToken = AuthController.generateAccessToken(user);
            user.accessToken = newAccessToken;
            const newRefreshToken = AuthController.generateRefreshToken(user);
            user.refreshTokens.push(newRefreshToken);
            await User.updateOne({ _id: user._id }, user);
            const { password, ...others } = user._doc;
            return res.status(200).json(others);
        })
    },

    logout: async (req, res) => {
        try {
            const { _id } = req.body;
            const user = await User.findOne({ _id: _id });
            if (!user) {
                return res.status(404).json('Không tìm thấy người dùng');
            }
            user.accessToken = "";
            user.refreshTokens = [];
            await User.updateOne({ _id: user._id }, user);
            return res.status(200).json(user);
        } catch (err) {
            return res.status(400).json({ message: `Có lỗi trong quá trình đăng xuất : ${err}` });
        }
    },
}


module.exports = AuthController;