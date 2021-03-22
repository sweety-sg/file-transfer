const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const fileSchema = new Schema({
    filename:{ type: String, required: true },
    path:{ type: String, required: true },
    size:{ type: Number, required: true },
    uuid:{ type: String, required: true },
    //id generated for every file
}, { timestamps: true });
//timestamps include created at and updated at

module.exports = mongoose.model('File', fileSchema);
 