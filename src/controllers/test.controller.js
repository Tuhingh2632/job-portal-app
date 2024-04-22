export const renderLandingPage = (req, res) => {
  res.render("landingPage", {
    userName: req.session.userName,
    userEmail: req.session.userEmail,
    errorMessage: null,
  });
};

export const renderCreateJobPage = (req, res) => {
  res.render("newJobPage", {
    userName: req.session.userName,
    userEmail: req.session.userEmail,
    errorMessage: null,
  });
};
