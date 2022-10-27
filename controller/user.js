const pool = require("../database");
const queries = require("../queries");

const checkUser = (req, res) => {
  pool.query(queries.checkUser, [req.body.user_name], (error, result) => {
    if (result.rows.length !== 0) {
      if (error) throw error;
      return res.json({
        message : "This username already use"
      })
    }
    else{
      pool.query(queries.addNewUser,[req.body.user_name, req.body.user_password])
      return res.json({
        message : 'Add user successful'
      })
    }
  });
};

const getUserByName = (req, res) => {
  pool.query(queries.getUserByName, [req.body.user_name, req.body.user_password], (error, result) => {
    if (result.rows.length !== 0) {
      return res.json(result.rows);
    }
    if (error) throw error;
    return res.json({
      message : 'Wrong username or password'
    })
  });
};

module.exports = {
  checkUser,
  getUserByName,
};
