const router = require("express").Router();
const moment = require("moment");

let Issue = require("./../models/issues.model");

router.route("/").get((req, res) => {
  Issue.find()
    .then(issues => res.json(issues))
    .catch(err => res.status(400).json("Error") + err);
});


router.route("/:id/comments").get((req,res) => {
  let issue_id = req.params.id;
  Issue.find({_id: issue_id},{_id: 0, comments: 1})
  .then(comments => res.json(comments))
  .catch(err => res.status(400).json("Error ")+ err );
})

router.route("/:id/comments/add").post((req, res) => {
  let issue_id = req.params.id;
  let comment = req.body.comment;
  let newComment = { comment };

  var options = { new: true };
  Issue.findByIdAndUpdate(issue_id,
    {
      $push: {
        comments: {
          $each: [newComment]
        }
      }
    },
    options
  )
    .then(issue => {
      res.status(201).json(issue);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({
        error: "Could not add comment"
      });
    });
});

router.route("/:id").get((req, res) => {
  Issue.findById(req.params.id)
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

  const newIssue = new Issue({
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
  Issue.findById(req.params.id)
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
  Issue.findByIdAndDelete(req.params.id)
    .then(() => res.json("Issue deleted.."))
    .catch(err => res.status(400).json("Error deleting -- " + err));
});

module.exports = router;
