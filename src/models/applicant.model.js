export default class Applicant {
  constructor(applicantid, name, email, contact, resumePath) {
    this.applicantid = applicantid;
    this.name = name;
    this.email = email;
    this.contact = contact;
    this.resumePath = resumePath;
  }
  static addApplicant(name, email, contact, resumePath) {
    const applicant = new Applicant(
      applicants.length + 1,
      name,
      email,
      contact,
      resumePath
    );
    applicants.push(applicant);
    return applicant;
  }
}
var applicants = [];
