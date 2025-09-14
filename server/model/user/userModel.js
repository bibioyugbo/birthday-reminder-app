const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
    {
        userName:{
            type:String,
            required: true,
            trim: true,
        },
        email:{
            type:String,
            required: true,
            trim: true,
            lowercase: true,
            unique:true
        },
        birthday:{
            type:Date,
            required: true,
        },

    },
{
    timestamps:true
}
)


module.exports = mongoose.model('User', userSchema )