const issue = require("../models/issue");
const mongoose = require("mongoose");

// this is for creating the issue
module.exports.add = (req, res) => {
  let id = req.query.id;

  issue.create({
    title: req.body.title,
    author: req.body.author,
    description: req.body.description,
    project: id,
    labels: req.body.label,
  });
  res.redirect("/details?id=id");
};

// this is to search the issues on the basis of title and description.
module.exports.search = async (req, res) => {
  let id = req.query.id;
  // console.log(id);
  // const objectId = new mongoose.Types.ObjectId(id);
  let title = req.body.title;
  let description = req.body.description;
  try {
    let data = [];
    if (title.trim() && description.trim()) {
      data = await issue
        .find({
          title: title,
          description: description,
          project: id,
        })
        .collation({ locale: "en", strength: 2 })
        .sort("-createdAt");
    } else if (title.trim() && !description.trim()) {
      data = await issue
        .find({
          title: title,

          project: id,
        })
        .collation({ locale: "en", strength: 2 })
        .sort("-createdAt");
    } else if (description.trim() && !title.trim()) {
      data = await issue
        .find({
          description: description,

          project: id,
        })
        .collation({ locale: "en", strength: 2 })
        .sort("-createdAt");
    }

    console.log(data);
    return res.render("issues", {
      searchedIssue: data,
      projectid: id,
    });
  } catch (err) {
    return res.redirect("back");
  }
};

// this is to find all the issuesr.
module.exports.findAll = async (req, res) => {
  let id = req.query.id;

  try {
    let data = await issue.find({ project: id }).sort("-createdAt");

    console.log(data);
    return res.render("issues", {
      searchedIssue: data,
      projectid: id,
    });
  } catch (err) {
    return res.redirect("back");
  }
};

// this is to filter the issues on the basis of labels and author.
module.exports.filter = async (req, res) => {
  let id = req.query.id;
  let labelData = req.body.label;
  let authorData = req.body.author;

  try {
    let data = [];

    if (!authorData.trim() && labelData.length > 0) {
      data = await issue
        .find({
          project: id,
          labels: {
            $all: labelData,
          },
        })
        .sort("-createdAt");
    } else if (!labelData && authorData.trim()) {
      data = await issue
        .find({
          project: id,
          author: authorData,
        })
        .collation({ locale: "en", strength: 2 })
        .sort("-createdAt");
    } else {
      data = await issue
        .find({
          project: id,
          labels: {
            $all: labelData,
          },
          author: authorData,
        })
        .collation({ locale: "en", strength: 2 })
        .sort("-createdAt");
    }

    console.log(data);

    return res.render("issues", {
      searchedIssue: data,
      projectid: id,
    });
  } catch (err) {
    return res.redirect("back");
  }
};
