const router = require("express").Router();
const bcrypt = require('bcryptjs');

const Users = require("../users/users-model.js");

router.post("/register", (req, res) => {
    const creds = req.body;

    function hashPass(creds) {
        var salt = bcrypt.genSaltSync(10);

        var hash = bcrypt.hashSync(creds.password,salt);
    return {
      ...creds,
      password: hash,
    };
  }
    
    //hash the creds.password
    //update the creds to use the hash

  Users.add(hashPass(creds))
    .then(saved => {
        res.status(201).json(saved)
    })
    .catch(err => res.send(err));
});

router.post("/login", (req, res) => {
    let {username,password} = req.body;

  Users.findBy({username})
    .then(([user]) => {
        if(user && bcrypt.compareSync(password,user.password)){
            req.session.loggedIn = true;
            res.status(200).json({message:'Successfully Logged in!'})
        } else {
            res.status(401).json({message: 'Nah dude lmao'})
        }
        
    })
    .catch(err => res.status(500).json({message: err.message}));
});

router.get('/logout',(req,res) => { 
  if (req.session){
  req.session.destroy(error => {
    if(error){
      res.status(500).json({errorMessage: 'plenty of room at the hotel calif'})
    }else{
      res.status(204).end();
    }
    
  })}
  else {
    res.status(204).end();
  }
})

module.exports = router;
