import Applicant from "./applicant.model.js";
let date = new Date();
export default class Job {
  constructor(
    id,
    jobcategory,
    jobdesignation,
    joblocation,
    companyname,
    salary,
    applyby,
    skillsrequired,
    numberofopenings
  ) {
    this.id = id;
    this.jobcategory = jobcategory;
    this.jobdesignation = jobdesignation;
    this.joblocation = joblocation;
    this.companyname = companyname;
    this.salary = salary;
    this.applyby = applyby;
    this.skillsrequired = skillsrequired;
    this.numberofopenings = numberofopenings;
    this.jobposted = `${date.getFullYear()}-${date.getMonth()}-${date.getDay()}`;
    this.applicants = [];
  }

  static getAllJobs() {
    return jobs;
  }

  static getJobById(id) {
    return jobs.find((j) => j.id == id);
  }

  static addApplicant(id, name, email, contact, resumePath) {
    let jobIndex = jobs.findIndex((job) => job.id == id);
    console.log(jobIndex);
    const applicant = Applicant.addApplicant(name, email, contact, resumePath);
    jobs[jobIndex].applicants.push(applicant);
  }

  static getAllApplicantForASpecificJob(id) {
    const job = this.getJobById(id);
    return job.applicants;
  }
  static createJob(
    jobcategory,
    jobdesignation,
    companyname,
    joblocation,
    salary,
    numberofopenings,
    skillsrequired,
    applyby
  ) {
    let newJob = new Job(
      jobs.length + 1,
      jobcategory,
      jobdesignation,
      joblocation,
      companyname,
      salary,
      applyby,
      skillsrequired,
      numberofopenings
    );
    jobs.push(newJob);
  }

  static updateJob(
    id,
    jobcategory,
    jobdesignation,
    companyname,
    joblocation,
    salary,
    numberofopenings,
    skillsrequired,
    applyby
  ) {
    const jobIndex = jobs.findIndex((job) => job.id == id);
    jobs[jobIndex].jobcategory = jobcategory;
    jobs[jobIndex].jobdesignation = jobdesignation;
    jobs[jobIndex].companyname = companyname;
    jobs[jobIndex].joblocation = joblocation;
    jobs[jobIndex].salary = salary;
    jobs[jobIndex].numberofopenings = numberofopenings;
    jobs[jobIndex].skillsrequired = skillsrequired;
    jobs[jobIndex].applyby = applyby;
    console.log(jobs[jobIndex]);
    return jobs[jobIndex];
  }
  static deleteJob(id) {
    const jobIndex = jobs.findIndex((job) => job.id == id);
    jobs.splice(jobIndex, 1);
  }
}

var jobs = [
  {
    id: 1,
    jobcategory: "MERN Developer",
    jobdesignation: "SDE-I",
    joblocation: "Bangalore",
    companyname: "Coding Ninja",
    salary: "10-15 lpa",
    applyby: "12-8-2024",
    skillsrequired: ["Java Script", "React JS", "Node JS"],
    numberofopenings: 3,
    jobposted: `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`,
    applicants: [],
  },
  {
    id: 2,
    jobcategory: "Backend Developer",
    jobdesignation: "SDE-II",
    joblocation: "Pune",
    companyname: "TCS",
    salary: "6.5 lpa",
    applyby: "12-9-2024",
    skillsrequired: ["Java", "Spring Boot", "Junit"],
    numberofopenings: 10,
    jobposted: `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`,
    applicants: [],
  },
  {
    id: 3,
    jobcategory: "Frontend Developer",
    jobdesignation: "SDE-I",
    joblocation: "Kolkata",
    companyname: "Tech Mahindra",
    salary: "6 lpa",
    applyby: "12-7-2024",
    skillsrequired: ["Html", "JS", "Node JS"],
    numberofopenings: 15,
    jobposted: `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`,
    applicants: [],
  },
];
