const { v4: uuidv4 } = require("uuid");
const User = require("../Models/userModel");
const { setUser } = require("../Services/auth");

async function handleUserSignup(req, res) {
    const { username, email, password } = req.body;
    try {
      const user = new User({ username, email, password });
      await user.save();
      res.status(201).json({ success: true, data: user });
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
}

async function handleUserLogin(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ email, password });

  if (!user)
    res.status(400).json({ success: false, message: "user not found" });

  const sessionId = uuidv4();
  setUser(sessionId, user);
  res.cookie("uid", sessionId);
  res.status(201).json({ success: true, data: user, message: sessionId});
}

module.exports = {
  handleUserSignup,
  handleUserLogin,
};