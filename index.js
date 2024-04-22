import express from "express";
import {
  renderCreateJobPage,
  renderLandingPage,
} from "./src/controllers/test.controller.js";
import path from "path";
import ejsLayouts from "express-ejs-layouts";
import JobController from "./src/controllers/job.controller.js";
import UserController from "./src/controllers/user.controller.js";
import session from "express-session";
import { uploadFile } from "./src/middlewares/file-upload.middleware.js";
import {
  validateRequest,
  validateNewJobRequest,
  validateApplicantDetails,
} from "./src/middlewares/validation.middleware.js";
import { auth } from "./src/middlewares/auth.middleware.js";

const app = express();
app.use(express.static("public"));

app.use(
  session({
    secret: "SecretKey",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

app.use(ejsLayouts);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set("view engine", "ejs");
app.set("views", path.join(path.resolve(), "src", "views"));

const jobController = new JobController();
const userController = new UserController();
//home page route
app.get("/", renderLandingPage);
app.get("/createJob", auth, renderCreateJobPage);

//Job routes
app.get("/jobs", jobController.getAllJobs);
app.get("/jobs/:id", jobController.getJobById);
app.post("/jobs", auth, validateNewJobRequest, jobController.createJob);
app.get("/updateJob/:id", auth, jobController.renderUpdateJobPage);
app.post("/updateJob", auth, validateNewJobRequest, jobController.updateJob);
app.post("/deleteJob/:id", auth, jobController.deleteJob);
//Applicant apply
app.post(
  "/apply/:id",
  uploadFile.single("file"),
  validateApplicantDetails,
  jobController.applyJobById
);
app.get(
  "/jobs/:id/applicants",
  auth,
  jobController.getAllApplicantForASpecificJob
);

//Search jobs
app.post("/searchJobs", jobController.searchJobs);

// Auth Routes
app.get("/login", userController.getLogin);
app.post("/register", validateRequest, userController.registerUser);
app.post("/login", userController.loginUser);
app.get("/logout", userController.logout);

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
