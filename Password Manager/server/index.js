const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Password = require("./models/Password");
const CryptoJS = require("crypto-js");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(" // Mongo db url", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Get all passwords
app.get("/api/passwords", async (req, res) => {
  const passwords = await Password.find();
  // Decrypt before sending
  const decrypted = passwords.map((item) => ({
    ...item._doc,
    password: CryptoJS.AES.decrypt(item.password, process.env.SECRET_KEY).toString(CryptoJS.enc.Utf8),
  }));
  res.json(decrypted);
});

// Add password
app.post("/api/passwords", async (req, res) => {
  const { site, username, password } = req.body;
  const encryptedPassword = CryptoJS.AES.encrypt(password, process.env.SECRET_KEY).toString();
  const newPass = new Password({ site, username, password: encryptedPassword });
  await newPass.save();
  res.status(201).json(newPass);
});

// Delete password
app.delete("/api/passwords/:id", async (req, res) => {
  await Password.findByIdAndDelete(req.params.id);
  res.sendStatus(204);
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
