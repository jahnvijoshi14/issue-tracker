const project = require("../models/project");

module.exports.add = (req, res) => {
  project.create(req.body);
  res.redirect("/");
};

// this is desplaying all the projects
module.exports.home = async (req, res) => {
  try {
    let data = await project.find({}).sort("-createdAt");

    return res.render("home", {
      projects: data,
    });
  } catch (err) {
    return res.redirect("back");
  }
};

// this is for showing the details of the project
module.exports.details = async (req, res) => {
  try {
    let id = req.query.id;

    const projectDetail = await project.findById(id);

    return res.render("details", {
      project: projectDetail,
    });
  } catch (err) {
    console.log(err);
    return res.redirect("back");
  }
};
