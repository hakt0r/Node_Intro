const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    "Email": {
        required: true,
        unique: true,
        type: String
    },
    "Password": {
        required: true,
        type: String,
    },
    "token": {
        index: true,
        type: String
    },
    "First Name": {
        required: true,
        type: String,
    },
    "Last Name": {
        required: true,
        type: String,
    },
    "Mobile Phone Number": String,
    "Two-Step Verification": Boolean,
    "Saved Delivery Addresses": [{
        "Country": {
            type: String,
            enum: ["Albania", "Andorra", "Austria", "Belarus", "Belgium", "Bosnia and Herzegovina", "Bulgaria", "Croatia", "Cyprus", "Czechia", "Denmark", "Estonia", "Finland", "France", "Germany"],
            default: "Germany"
        },
        "Address line 1": String,
        "Address line 2": String,
        "City": String,
        "Postcode": Number
    }],
    "Saved Payment Methods": [{}],
    "Saved Items": [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Item"
    }],
    "Orders History": [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order"
    }]
});

const User = mongoose.model("User", userSchema);

module.exports = { User };