import Job from "../models/job.model.js";

export default class JobController {
  getAllJobs(req, res, next) {
    const jobs = Job.getAllJobs();
    // console.log(jobs);
    res.render("jobListingPage", {
      jobs: jobs,
      userName: req.session.userName,
      userEmail: req.session.userEmail,
    });
  }
  getJobById(req, res, next) {
    const id = req.params.id;
    const job = Job.getJobById(id);
    console.log(job);
    if (job) {
      res.render("jobDetailsPage", {
        job: job,
        userName: req.session.userName,
        userEmail: req.session.userEmail,
        errorMessages: null,
      });
    } else {
      res.render("404Page", { message: "Sorry... No jobs found !!" });
    }
  }

  renderUpdateJobPage(req, res) {
    const id = req.params.id;
    const jobDetails = Job.getJobById(id);
    res.render("updateJobPage", {
      job: jobDetails,
      userName: req.session.userName,
      userEmail: req.session.userEmail,
    });
  }

  applyJobById(req, res, next) {
    console.log(req.body);
    console.log(req.params.id);
    const { name, email, contact } = req.body;
    const id = req.params.id;
    const resumePath = "resumes/" + req.file.filename;
    Job.addApplicant(id, name, email, contact, resumePath);
    res.redirect(`/jobs/${id}`);
  }
  getAllApplicantForASpecificJob(req, res, next) {
    const id = req.params.id;
    const applicants = Job.getAllApplicantForASpecificJob(id);
    console.log(applicants);
    res.render("applicantListPage", { applicants: applicants });
  }
  createJob(req, res, next) {
    console.log(req.body);
    const {
      jobcategory,
      jobdesignation,
      companyname,
      joblocation,
      salary,
      numberofopenings,
      skillsrequired,
      applyby,
    } = req.body;
    Job.createJob(
      jobcategory,
      jobdesignation,
      companyname,
      joblocation,
      salary,
      numberofopenings,
      skillsrequired,
      applyby
    );
    res.redirect("/jobs");
  }

  updateJob(req, res, next) {
    // const id = req.params.id;
    console.log(req.body);
    const {
      id,
      jobcategory,
      jobdesignation,
      companyname,
      joblocation,
      salary,
      numberofopenings,
      skillsrequired,
      applyby,
    } = req.body;
    const job = Job.updateJob(
      id,
      jobcategory,
      jobdesignation,
      companyname,
      joblocation,
      salary,
      numberofopenings,
      skillsrequired,
      applyby
    );
    if (job) {
      res.redirect(`/jobs/${id}`);
    }
  }

  deleteJob(req, res, next) {
    const id = req.params.id;
    Job.deleteJob(id);
    res.redirect("/jobs");
  }

  searchJobs(req, res, next) {
    const cname = req.body.job;
    const jobs = Job.getAllJobs();
    const matchedJob = jobs.find((job) => job.companyname.startsWith(cname));
    if (matchedJob) {
      const jobsarr = [];
      jobsarr.push(matchedJob);
      res.render("jobListingPage", {
        jobs: jobsarr,
        userName: req.session.userName,
        userEmail: req.session.userEmail,
      });
    }
  }
}
