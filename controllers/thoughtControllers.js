//create the thought, find the user by id, push the thought id into the thoughts array. use aggragates

const { Thought, User } = require("../models");

module.exports = {
  //find all thoughts
  getThoughts(req, res) {
    Thought.find()
      .select("-__v")
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },
  //find a single thought
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },
  //create a thought -/api/thoughts
  createThought(req, res) {
    Thought.create(req.body)
      .then((thought) => {
        return User.findByIdAndUpdate(
          { _id: req.body.userId },
          { $push: { thoughts: thought._id } },
          { new: true, runValidators: true }``
        );
      })
      .then((user) =>
        !thought
          ? res.status(404).json({ message: "No thought with that ID" })
          : res.status(200).json({ message: "Thought has been created!" })
      )
      .catch((err) => res.status(500).json(err));
  },

  //update a thought
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((thought) => {
        !thought
          ? res.status(404).json({ message: "No thought with that ID" })
          : res.status(200).json({ message: "Thought has been updated!" });
      })
      .catch((err) => res.status(500).json(err));
  },

  //delete a thought
  deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId }).then(
      (thought) => {}
    );
    !thought
      ? res.status(404).json({ message: "No thought with that ID" })
      : res
          .status(200)
          .json({ message: "Thought has been removed!" })
          .catch((err) => res.status(500).json(err));
  },

  //create a reaction tied to thought
  createReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $push: { reaction: req.body.reactionId } },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !thought
          ? res.status(404).json({ message: "No thought with that ID" })
          : res.status(200).json({ message: "A reaction has been added!" })
      )
      .catch((err) => res.status(500).json(err));
  },

  // delete a reaction
  deleteReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reaction: req.body.reactionId } },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No thought with that ID" })
          : res.status(200).json({ message: "A reaction has been removed!" })
      )
      .catch((err) => res.status(500).json(err));
  },
};
