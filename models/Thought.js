const { Schema, model } = require("mongoose");
const reactionSchema = require("./Reaction");
const timeSince = require("../utils/timeSince");

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      maxlength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp) => timeSince(timestamp),

      // Date: true
      // set value to the current timestamp
      // use a getter methof to format the timestamp on query
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [reactionSchema],
  },
  //Need to look into virtual [reactionCount] that retrieves the length of thoughts [reactions] array field on query
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);
thoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

const Thought = model("Thought", thoughtSchema);

module.exports = Thought;
