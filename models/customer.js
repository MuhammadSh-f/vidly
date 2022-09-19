const mongoose = require("mongoose");
const Joi = require("joi");

const Customer = mongoose.model(
  "customers",
  new mongoose.Schema({
    isGold: {
      type: Boolean,
      default: false,
    },
    name: { type: String, required: true, minlength: 3, maxlength: 50 },
    phone: { type: String, required: true, minlength: 10, maxlength: 12 },
  })
);
function validateCustomer(customer) {
  const schema = {
    name: Joi.string().min(3).max(50).required(),
    phone: Joi.string().min(11).max(12).required(),
    isGold: Joi.boolean(),
  };

  return Joi.validate(customer, schema);
}

exports.Customer = Customer;
exports.validate = validateCustomer;
