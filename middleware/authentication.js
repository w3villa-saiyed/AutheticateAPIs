// authentication.js

const jwt = require('jsonwebtoken');
const UserModal = require('../modals/user_modal');
const asyncHandler = require('express-async-handler');

const protect = asyncHandler(async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decode = jwt.verify(token, process.env.SCREAT_KEY);
      console.log("Decoder===>",decode);
      req.user = await UserModal.findById(decode.userId);
      console.log("user information==>",req.user)
      next();
    } catch (err) {
      res.status(401);
      throw new Error('Not authenticated, token failed');
    }
  }
});


module.exports = protect;
