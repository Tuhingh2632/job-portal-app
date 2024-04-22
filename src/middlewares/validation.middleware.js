import { body, validationResult } from "express-validator";
import Job from "../models/job.model.js";
const validateRequest = async (req, res, next) => {
  //Create rules
  const rules = [
    body("name").notEmpty().withMessage("name is required"),
    body("email").isEmail().withMessage("please provide a valid email address"),
    body("password").notEmpty().withMessage("password is required"),
  ];

  //   Run those rules
  await Promise.all(rules.map((rule) => rule.run(req)));

  //Getting errors

  var validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    req.session.errorMessage = validationErrors.array()[0].msg;
    return res.render("landingPage", {
      userName: req.session.userName,
      userEmail: req.session.userEmail,
      errorMessage: req.session.errorMessage,
    });
  }
  next();
};

const validateNewJobRequest = async (req, res, next) => {
  //Create rules
  const rules = [
    body("jobcategory").notEmpty().withMessage("jobcategory is required"),
    body("jobdesignation").notEmpty().withMessage("jobdesignation is required"),
    body("companyname").notEmpty().withMessage("companyname is required"),
    body("joblocation").notEmpty().withMessage("joblocation is required"),
    body("salary").custom((value) => {
      const salary = Number(value.slice(0, -3));
      if (isNaN(salary) || salary <= 0) {
        throw new Error("Salary must be a valid positive number");
      }
      return true;
    }),
    body("numberofopenings").custom((value) => {
      const numberofopenings = Number(value);
      if (isNaN(numberofopenings) || numberofopenings <= 0) {
        throw new Error("Please provide a valid number of openings");
      }
      return true;
    }),
    body("skillsrequired")
      .notEmpty()
      .withMessage("please select skills for the job"),
    body("applyby")
      .notEmpty()
      .withMessage("please select the deadline to apply"),
  ];

  //   Run those rules
  await Promise.all(rules.map((rule) => rule.run(req)));

  //Getting errors

  var validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    req.session.errorMessage = validationErrors.array()[0].msg;
    return res.render("newJobPage", {
      userName: req.session.userName,
      userEmail: req.session.userEmail,
      errorMessage: req.session.errorMessage,
    });
  }
  next();
};

const validateApplicantDetails = async (req, res, next) => {
  //Get the job
  const id = req.params.id;
  const job = Job.getJobById(id);
  //Create rules
  const rules = [
    body("name").notEmpty().withMessage("name is required"),
    body("email").isEmail().withMessage("please provide a valid email address"),
    body("contact").custom((value) => {
      console.log(value);
      if (toString(value).length == 10) {
        return true;
      }
      throw new Error("Please Provide a valid phone number");
    }),
    body("file").custom((value, { req }) => {
      if (!req.file) {
        throw new Error("Please upload your resume");
      }
      return true;
    }),
  ];

  //   Run those rules
  await Promise.all(rules.map((rule) => rule.run(req)));

  //Getting errors

  var validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    req.session.errorMessages = validationErrors.array()[0].msg;
    return res.render("jobDetailsPage", {
      job: job,
      userName: req.session.userName,
      userEmail: req.session.userEmail,
      errorMessages: req.session.errorMessages,
    });
  }
  next();
};

export { validateRequest, validateNewJobRequest, validateApplicantDetails };
