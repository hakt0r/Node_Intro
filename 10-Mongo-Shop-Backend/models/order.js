const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    "Date": {
        type: Date,
        default: Date.now
    },
    "User": {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    "Items": [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Item",
        "Quantity": Number,
        "Price": Number,            // <<< Not sure about security. Maybe we should parse
        "Price Reduction": Number   // <<<  the relevant price and discount from the Item DB...
    }],
    "Delivery Address": {
        "Country": {
            type: String,
            enum: ["Albania", "Andorra", "Austria", "Belarus", "Belgium", "Bosnia and Herzegovina", "Bulgaria", "Croatia", "Cyprus", "Czechia", "Denmark", "Estonia", "Finland", "France", "Germany"],
            default: "Germany"
        },
        "Address line 1": String,
        "Address line 2": String,
        "City": String,
        "Postcode": Number
    },
    "Payment Method": {}
});

const Order = mongoose.model("Order", orderSchema);

module.exports = { Order };