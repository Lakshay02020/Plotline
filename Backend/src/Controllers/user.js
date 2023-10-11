const { v4: uuidv4 } = require("uuid");
const User = require("../Models/userModel");
const { setUser } = require("../Services/auth");
const bcrypt = require("bcrypt");
const saltRounds = 10; // Salt rounds for bcrypt

async function handleUserSignup(req, res) {
    console.log(req.body)
    const { username, email, password } = req.body;
    try {
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      console.log(hashedPassword)
      const user = new User({ username, email, password: hashedPassword });
      console.log(user)
      await user.save();
      res.redirect("/login");
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
}

async function handleUserLogin(req, res) {
  console.log(req.body)
  const { email, password } = req.body;
  const user = await User.findOne({email});

  if (!user)
    res.status(400).json({ success: false, message: "user not found" });
  else{ 
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (passwordMatch){
      const sessionId = uuidv4();
      setUser(sessionId, user);
      res.cookie("uid", sessionId);
      res.redirect("/productRoutes");
    }else {
      res.status(400).json({ success: false, message: "Incorrect password" });
    }
  }
}

module.exports = {
  handleUserSignup,
  handleUserLogin,
};