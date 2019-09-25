const router = require("express").Router();

let Issue = require("./../models/issues.model");

router.route("/").get((req, res) => {
  Issue.find()
    .then(issues => res.json(issues))
    .catch(err => res.status(400).json("Error") + err);
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

  newIssue.save()
    .then(() => res.json('New issue added'))
    .catch(err => res.status(400).json('Error me') + err);
});



module.exports = router;
