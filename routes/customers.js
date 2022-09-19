const { Customer, validate } = require("../models/customer");
const express = require("express");
const router = express.Router();
router.get("/", async (req, res) => {
  const customers = await Customer.find().sort("name");
  res.send(customers);
});
router.post("/", async (req, res) => {
  let errs = [];
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  try {
    const customer = new Customer({
      isGold: req.body.isGold,
      name: req.body.name,
      phone: req.body.phone,
    });
    await customer.save();
    res.send(customer);
  } catch (ex) {
    for (field in ex.errors) {
      errs.push(ex.errors[field].message);
    }
    res.send(errs);
  }
});
router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const customer = await Customer.findByIdAndUpdate(
    req.url.slice(1),
    {
      isGold: req.body.isGold,
      name: req.body.name,
      phone: req.body.phone,
    },
    { new: true }
  );
  if (!customer)
    return res
      .status(404)
      .send("The Customer with the given ID does not exist!");
  res.send(customer);
});
router.delete("/:id", async (req, res) => {
  const customer = await Customer.findByIdAndRemove(req.url.slice(1));
  if (!customer)
    return res
      .status(404)
      .send("The Customer with the given ID does not exist!");
  res.send(customer);
});
router.get("/:id", async (req, res) => {
  const customer = await Customer.findById(req.url.slice(1));
  if (!customer)
    return res
      .status(404)
      .send("The Customer with the given ID does not exist!");
  res.send(customer);
});
module.exports = router;
