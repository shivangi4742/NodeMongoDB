const mongoose = require('mongoose');

const nb = mongoose.Schema({
    acccount_holder_name : String,
    account_no: String
}, {
    timestamps: true
});

module.exports = mongoose.model('rest_api', nb);