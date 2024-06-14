import mongoose from "mongoose";

const BillSchema = new mongoose.Schema({
    totalItems: {
        type: Number, 
        required: true,
    },
    total: {
        type: Number,
        required: true,
    },
    paymentType : {
        type : String,
        require : true
    },
    product: {
        type: Array,
        required: true,
    },
    customerDetails: {
        id: String,
        name: String,
        country: String,
        address: String,
        city: String,
        state: String,
        zip: String,
        phone: String,
        email: String
      }
});

const Bill = mongoose.model('Bill', BillSchema);

export { Bill };
