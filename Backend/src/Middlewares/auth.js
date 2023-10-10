const { getUser } = require("../Services/auth");

async function restrictToLoggedinUserOnly(req, res, next) {
  const userUid = req.cookies?.uid;

  if (!userUid) return res.status(400).json({ success: false, message: "No Cookie" });
  const user = getUser(userUid);

  if (!user) return res.status(400).json({ success: false, message: "Invalid Cookie" });
  req.user = user;
  console.log(req.user);
  next();
}

async function checkAuth(req, res, next) {
  const userUid = req.cookies?.uid;

  const user = getUser(userUid);

  req.user = user;
  next();
}

module.exports = {
  restrictToLoggedinUserOnly,
  checkAuth,
};