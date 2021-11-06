const mongoose = require("mongoose")

const { MONGO_URL } = process.env

exports.connect = () => {
    mongoose.connect(MONGO_URL).then(() => console.log("mongoose connected")).catch((error) =>  console.log("mongoose don't connected", error))
}
