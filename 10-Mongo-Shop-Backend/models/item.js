const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
    "Name": {
        required: true,
        type: String,
    },
    "SubName": String,
    "Description": String,
    "Category Level 1": {
        required: true,
        type: String,
        enum: ["C.L. 1.1", "C.L. 1.2", "C.L. 1.3", "C.L. 1.4", "C.L. 1.5"]
    },
    "Category Level 2": {
        required: true,
        type: String,
        enum: ["C.L. 2.1", "C.L. 2.2", "C.L. 2.3", "C.L. 2.4", "C.L. 2.5"]
    },
    "Category Level 3": {
        required: true,
        type: String,
        enum: ["C.L. 3.1", "C.L. 3.2", "C.L. 3.3", "C.L. 3.4", "C.L. 3.5"]
    },
    "UPC/EAN Code": Number,
    "Manufacturing Counry": String,
    "Brand": String,
    "Color": String,
    "Colors Available": [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Item"
    }],
    "Product Sizes, cm": {
        "Width": Number,
        "Height": Number,
        "Depth": Number
    },
    "Category-specific Feature 1 (e.g. 'Sizes Available')": [Number],
    "Category-specific Feature 2 (e.g. 'Memory')": String,
    "Category-specific Feature 3 (e.g. 'Pcs in a Package')": Number,
    "Pictures": [],
    "Current Price": {
        required: true,
        type: Number,
    },
    "Price-change History": [{
        "Date": Date,
        "Price": Number
    }],
    "Discount Category": {
        required: true,
        type: String,
        enum: ["none", "10%", "20%", "30%", "40%", "50%"],
        default: "none"
    },
    "Similar Products": [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Item"
    }],
    "Accessory Products": [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Item"
    }]
});

const Item = mongoose.model("Item", itemSchema);

module.exports = { Item };