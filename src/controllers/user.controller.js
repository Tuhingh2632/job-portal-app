import User from "../models/user.model.js";

export default class UserController {
  getLogin(req, res, next) {
    return res.render("loginPage", {
      errorMessage: null,
    });
  }

  registerUser(req, res, next) {
    const { name, email, password } = req.body;
    console.log(req.body);
    User.add(name, email, password);
    res.render("loginPage", {
      errorMessage: null,
    });
  }

  loginUser(req, res, next) {
    console.log(req.body);
    const { email, password } = req.body;
    const user = User.isValid(email, password);
    if (!user) {
      return res.render("loginPage", {
        errorMessage: "Invalid Credentials",
      });
    }
    req.session.userEmail = email;
    req.session.userName = user.name;
    res.render("landingPage", {
      user: user,
      userName: req.session.userName,
      userEmail: req.session.userEmail,
      errorMessage: null,
    });
  }

  logout(req, res) {
    // On logout destroy the session

    req.session.destroy((err) => {
      if (err) {
        console.log(err);
      } else {
        res.redirect("/");
      }
    });
  }
}
