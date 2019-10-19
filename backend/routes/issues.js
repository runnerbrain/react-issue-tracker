const router = require("express").Router();
const moment = require("moment");

let Models = require("./../models/issues.model");

router.route("/").get((req, res) => {
  Models.Issue.find()
    .then(issues => res.json(issues))
    .catch(err => res.status(400).json("Error") + err);
});

router.route("/:id/comments/add").post((req,res) => {
  console.log('in add route')
  let comment = req.body.comment;
  let created_at = req.body.created_at;
  let issue_id = req.body.issue_id;
  let newComment = new Models.Comment({ comment: comment,created_at: created_at, issue: issue_id });

  newComment
    .save()
    .then(() => res.json("New issue added"))
    .catch(err => res.status(400).json("Error me") + err);

})

// router.route("/:id/comments/add").post((req, res) => {
//   let comment = req.body.comment;
//   let created_at = req.body.created_at;
//   let issue_id = req.body.issue_id;
//   let commentObj = { comment: comment,created_at: created_at };

//   var options = { new: true };
//   Models.Issue.findByIdAndUpdate(
//     issue_id,
//     {
//       $push: {
//         comments: {
//           $each: [commentObj]
//         }
//       }
//     },
//     options
//   )
//     .then(issue => {
//       res.status(201).json(issue);
//     })
//     .catch(err => {
//       console.error(err);
//       res.status(500).json({
//         error: "Could not add comment"
//       });
//     });
// });

router.route("/:id").get((req, res) => {
  Models.Issue.findById(req.params.id)
    .then(issue => res.json(issue))
    .catch(err => res.status(400).json("Error fetching by Id: " + err));
});

router.route("/add").post((req, res) => {
  const title = req.body.title;
  const category = req.body.category;
  const date_created = req.body.date_created;
  const lead_contributor = req.body.lead_contributor;
  const backup_contributor = req.body.backup_contributor;
  const description = req.body.description;

  const newIssue = new Models.Issue({
    title,
    category,
    date_created,
    lead_contributor,
    backup_contributor,
    description
  });

  newIssue
    .save()
    .then(() => res.json("New issue added"))
    .catch(err => res.status(400).json("Error me") + err);
});

router.route("/edit/:id").put((req, res) => {
  console.log(`In edit route...${req.params.id}`);
  Models.Issue.findById(req.params.id)
    .then(issue => {
      issue.title = req.body.title;
      issue.category = req.body.category;
      issue.date_created = req.body.date_created;
      issue.lead_contributor = req.body.lead_contributor;
      issue.backup_contributor = req.body.backup_contributor;
      issue.description = req.body.description;

      issue
        .save()
        .then(() => res.json("Issue updated"))
        .catch(err => res.status(400).json("Error saving -- " + err));
    })
    .catch(err => res.status(400).json("Error finding by Id --" + err));
});

router.route("/delete/:id").delete((req, res) => {
  Models.Issue.findByIdAndDelete(req.params.id)
    .then(() => res.json("Issue deleted.."))
    .catch(err => res.status(400).json("Error deleting -- " + err));
});

module.exports = router;
