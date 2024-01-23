const userModal = require('../modals/user_modal');
const jwt = require('jsonwebtoken');

exports.userCreate = async (req, res) => {
    const userDetails = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    };
  
    try {
      const user = await userModal.create(userDetails);
      const token =  jwt.sign({userId: user._id, useremail: user.email}, process.env.SCREAT_KEY, { expiresIn: '1h' })

      res.status(201).json({ success: true, data: {user, token} });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
}
exports.userLogin = async (req,res) => { 
        const {email, password } = req.body;
        try {
          const user = await userModal.findOne({email});
          console.log(user);
          if (user && await (user.matchPassword(password))) {
            const token =  jwt.sign({userId: user._id, useremail: user.email}, process.env.SCREAT_KEY, { expiresIn: '1h' })

            res.status(201).json({ success: true, data: {user, token} });
          }
          else{
              console.log('UserNotFound');
              res.send("User Not Exist /n try Again:")
          }
      } catch (err) {
          console.error(err);
          res.status(500).send("Internal Server Error");
       }
}
exports.allUser = async (req,res) => {
     // Access user information from req.user
  const user = req.user;

  // Now you can use the user information as needed
  res.status(200).json({
    success: true,
    user: user,
    message: 'loggin in'
  });
}