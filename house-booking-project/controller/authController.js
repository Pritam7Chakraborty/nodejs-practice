const { check, validationResult } = require("express-validator");
const User = require("../Models/user");
const bcrypt = require("bcryptjs");

exports.getLogin = (req, res, next) => {
  res.render("auth/login", {
    pageTitle: "Login",
    currentPage: "login",
    isLoggedIn: false,
    errors: [],
    oldInput: { email: "" },
    user: {}
  });
};

exports.getSignup = (req, res, next) => {
  res.render("auth/signup", {
    pageTitle: "Sign up",
    currentPage: "signup",
    isLoggedIn: false,
    errors: [],
    oldInput: { firstName: "", lastName: "", email: "", userType: "" },
    
    user: {}
  });
};

exports.postLogin = async(req, res, next) => {
  const {email,password}= req.body;
  const user = await User.findOne({email});
  if (!user) {
      return res.status(422).render("auth/login", {
        pageTitle: "Login",
        currentPage: "login",
        isLoggedIn: false,
        errors: ["User doesn't exist"],
        oldInput: { email },
    user: {}
      });
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    return res.status(422).render("auth/login", {
      pageTitle: "Login",
      currentPage: "login",
      isLoggedIn: false,
      errors: ["Invalid credentials"],
      oldInput: { email }
      ,
    user: {}
    });
  }

  req.session.isLoggedIn = true;
  req.session.user = user;
  await req.session.save();
  res.redirect("/");
};

exports.postLogout = (req, res, next) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
};

exports.postSignup = [
  check("firstName")
    .trim()
    .notEmpty()
    .withMessage("First name is required")
    .isLength({ min: 3 })
    .withMessage("First name must be at least 3 characters long")
    .matches(/^[a-zA-Z]+$/)
    .withMessage("First name must contain only letters"),
  check("lastName")
    .trim()
    .notEmpty()
    .withMessage("Last name is required")
    .isLength({ min: 3 })
    .withMessage("Last name must be at least 3 characters long")
    .matches(/^[a-zA-Z]+$/)
    .withMessage("Last name must contain only letters"),
  check("email")
    .isEmail()
    .withMessage("Please enter a valid email address")
    .normalizeEmail(),
  check("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long")
    .matches(/[A-Z]/)
    .withMessage("Password must contain at least one uppercase letter")
    .matches(/[a-z]/)
    .withMessage("Password must contain at least one lowercase letter")
    .matches(/[0-9]/)
    .withMessage("Password must contain at least one number")
    .matches(/[@$!%*?&]/)
    .withMessage("Password must contain at least one special character")
    .trim(),
  check("confirmPassword")
    .trim()
    .notEmpty()
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords do not match");
      }
      return true;
    }),
  check("userType")
    .notEmpty()
    .withMessage("User type is required")
    .isIn(["Guest", "Host"])
    .withMessage("User type must be either Guest or Host"),
  check("termsAccepted")
    .notEmpty()
    .withMessage("You must accept the terms and conditions")
    .custom((value) => {
      if (value !== "on") {
        throw new Error("You must accept the terms and conditions");
      }
      return true;
    }),
  (req, res, next) => {
    const { firstName, lastName, email, password, userType } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).render("auth/signup", {
        pageTitle: "Sign up",
        currentPage: "signup",
        isLoggedIn: false,
        userType: null,
        errors: errors.array().map((err) => err.msg),
        oldInput: { firstName, lastName, email, userType },
    user: {}
      });
    }

    bcrypt
      .hash(password, 12)
      .then((hashedPassword) => {
        const user = new User({
          firstName,
          lastName,
          email,
          password: hashedPassword,
          userType,
        });
        return user.save();
      })
      .then(() => {
        res.redirect("/login");
      })
      .catch((err) => {
        return res.status(422).render("auth/signup", {
          pageTitle: "Signup",
          currentPage: "signup",
          isLoggedIn: false,
          errors: [err.message],
          oldInput: { firstName, lastName, email, userType },
        });
      });
  },
];
