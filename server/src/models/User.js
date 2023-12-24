const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const UserSchema = new Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    role: { type: String },
    isAdmin: { type: Boolean, default: false },
    isActived: { type: Boolean, default: true },
    accessToken: { type: String, default: "" },
    refreshTokens: [{ type: String, default: "" }],
    accessCode: { type: String },
}, {
    timestamps: true,
});

const User = mongoose.model('Users', UserSchema);

module.exports = {
    User
}