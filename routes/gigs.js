const express = require("express");
const router = express.Router();
const db = require("../config/database");
const Gig = require("../models/gigs");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

router.get("/", (req, res) => {
  Gig.findAll()
    .then((result) => {
      console.log(result);
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
    });
});
router.get("/:id", (req, res) => {
  Gig.findOne({
    where: { id: req.params.id },
  })
    .then((result) => {
      res.json(result);
      console.log(result);
    })
    .catch((err) => {
      console.log(err);
    });
});
router.post("/addjob", async (req, res) => {
  const add = await new Gig({
    title: req.body.title,
    budget: req.body.budget,
    technologies: req.body.technologies,
    contact_email: req.body.contact_email,
  });
  add
    .save()
    .then((result) => {
      res.json(result);
      console.log(result);
    })
    .catch((err) => {
      console.log(err);
    });
});
router.delete("/deletejob/:id", (req, res) => {
  const _id = req.params.id;
  Gig.destroy({
    where: { id: _id },
  })
    .then((result) => {
      res.json({ status: "deleted succefully", result: result });
      console.log("deleted succesfully");
    })
    .catch((err) => {
      console.log(err);
    });
});
router.put("/update/:id", (req, res) => {
  const _id = req.params.id;
  Gig.findOne({
    where: { id: _id },
  })
    .then((result) => {
      result
        .update({
          title: req.body.title,
          budget: req.body.budget,
          technologies: req.body.technologies,
          contact_email: req.body.contact_email,
        })
        .sucess((update) => {
          console.log(update);
          res.json(update);
        });
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
