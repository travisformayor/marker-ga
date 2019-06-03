module.exports = {
  signup: (req, res) => {
    console.log(req.body);
    // Check to see if email is already in db
    db.User.find({ email: req.body.email })
      .exec()
      .then(user => {
        // if a user is found with that email
        if (user.length >= 1) {
          // send an error and let the user know that the email already exists
          return res.status(409).json({
            message: "email already exists"
          });
          // if we don't have this user's email in our db, lets get them set up!
        } else {
          // lets hash our plaintext password
          bcrypt.hash(req.body.password, 10, (err, hash) => {
            if (err) {
              console.log("hashing error:", err);
              res.status(200).json({ error: err });
              // we now have a successful hashed password
            } else {
              // we are creating a User object with their email address and OUR hashed password
              db.User.create(
                {
                  email: req.body.email,
                  password: hash
                },
                (err, newUser) => {
                  console.log("here is the result", newUser);
                  // if(err){ return res.status(500).json({err})}
                  // we send our new data back to user or whatever you want to do.
                  let user = {
                    email: newUser.email,
                    _id: newUser._id
                  };

                  jwt.sign(
                    user,
                    "waffles",
                    {
                      // its good practice to have an expiration amount for jwt tokens.
                      expiresIn: "1h"
                    },
                    (err, signedJwt) => {
                      res.status(200).json({
                        message: "User Created",
                        user,
                        signedJwt
                      });
                    }
                  );
                  // send success back to user, along with a token.
                }
              );
            }
          });
        }
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ err });
      });
  }
};
