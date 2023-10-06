const User = require("../models/User")
const mailSender = require("../utils/mailSender")
// resetpassword token

exports.resetPasswordToken = async (req, res, next) => {

    // get email from req body
    const email = req.body.email;

    // check user for this email and validate 
    const user = await User.findOne({ email: email });
    if (!user) {
        return res.json({
            success: false,
            message: 'Your Email is not registered with us'
        })
    }

    // generate token
    const token = crypto.randomUUID();
    
    // update user by adding token and expiration time
    // create url
    // send mail containing the url
    // return response


    const url = `http://localhost:3000/update/${token}`
}

// reset password