const client = require('twilio')(process.env.TWILLIO_SID, process.env.TWILLIO_TOKEN);

module.exports.sendOTP = async (data) => {

    console.log("TWILLIO_NUMBER : ",process.env.TWILLIO_NUMBER);
    client.messages
    .create({
        body: `LettrBox verification code : ${data.otp}.`,
        from: process.env.TWILLIO_NUMBER,
        to: data.phone_number
    })
    .then(async(message)=>{ 
        console.log("message",message);   
        return message;
    });
}
