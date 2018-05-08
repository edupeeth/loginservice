var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var UsersSchema = new Schema({
    email: {
        type: String, required: true,
        trim: true, unique: true,
        match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    },    
    password: {
        type: String,
        required: false,
        select: false
    },        
    createdOn: {
        type: Date,
        default: Date.now,
        required: true,
        select: false
    }    
});

module.exports = mongoose.model('Users', UsersSchema);