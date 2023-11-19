const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete')
const Schema = mongoose.Schema;


const Student = new Schema({
    studentID: { type: String, require: true, unique: true },
    studentName: { type: String, require: true, maxLength: 225 },
    studentPassword: { type: String, require: true, maxLength: 225 },
    isStudy: { type: Boolean, default: true },
    DOB: { type: Date, default: Date.now },
    Major: { type: String, require: true, maxLength: 225 },
    slug: { type: String, slug: 'studentName' },
}, {
    timestamps: true,
});

mongoose.plugin(slug);
Course.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all'
});

module.exports = mongoose.model('Student', Student);