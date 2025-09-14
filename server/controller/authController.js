
const User = require("../model/user/userModel");


exports.signup  = async (req,res)=>{
    const {userName, email, birthday} = req.body
try{
        console.log("I get here")
       const existingUser = await User.findOne({email})
       if (existingUser){
           return  res.status(400).json({
               responseCode: "400",
               responseMessage:"This user already exists, enter new email",
           })
       }
    const user = await User.create({
        userName,
        email,
        birthday
    })
    res.status(200).json({
        responseCode: "00",
        responseMessage:"Signup successful!",
        responseData: user,
    });
}catch (e){
        console.log("Error",e)
        return res.status(500).json({
            responseCode: "500",
            responseMessage: "Server error",
        });
    }

}

