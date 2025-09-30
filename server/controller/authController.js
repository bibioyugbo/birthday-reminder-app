
const User = require("../model/user/userModel");
const schedule = require("node-schedule");
const { sendBirthdayEmail } = require("../utils/mailer");



exports.signup  = async (req,res)=>{
    const {userName, email, birthday} = req.body
try{
    const existingUser = await User.findOne({ email });
    // const existingUser = await User.findOne({ email });

    if (existingUser){
           return  res.status(400).json({
               responseCode: "400",
               responseMessage:"This user already exists, enter new email",
           })
       }
    const user = await User.create({
        userName,
        email,
        birthday: new Date(birthday)
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

exports.handleBirthday = async ()=> {
    schedule.scheduleJob("0 7 * * * ", async () => {
        const today = new Date();
        const month = today.getMonth() + 1;
        const day = today.getDate();

        try {
            const users = await User.find({
                $expr: {
                    $and: [
                        {$eq: [{$dayOfMonth: "$birthday"}, day]},
                        {$eq: [{$month: "$birthday"}, month]},
                    ],
                },
            });

            if (users.length > 0) {
                users.forEach((user) => {
                    console.log(`🎉 It's ${user.userName}'s birthday!`);
                    sendBirthdayEmail(user.email, user.userName);
                });
            } else {
                console.log("No birthdays today.");
            }
        } catch (err) {
            console.error("Error checking birthdays:", err.message);
        }
    });

}


// schedule.scheduleJob()
