const mongoose = require("mongoose")
const mailSender = require("../utils/mailSender")

const OTPSchema = new mongoose.Schema({
   email:{
    type: String
   },
   otp:{
    type: String,
    require:true
   },
   createdAt:{
    type: Date,
    default:Date.now(),
    expires: 5*60,
   },
  
})

// function to send email

async function sendVerificationEmail(email, otp){
   try{

    const mailResponse = await mailSender(email, "Verification Email from StudyNotion", otp);
    console.log("Email sent Successfully", mailResponse)

   } catch(error){
    console.log(error, "error while sending mails")
   }
}

OTPSchema.pre("save", async function(next){
    await sendVerificationEmail(this.email, this.otp);
    next();
})

module.exports = mongoose.model("OTP", OTPSchema)