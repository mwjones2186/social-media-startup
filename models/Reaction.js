const {Schema, Types} = require("mongoose");
const timeSince =  require('../utils/timeSince')

const reactionSchema = new Schema(
    {
        reactionId: {
            //use mongoose ObjectId data type
            //default value is set to a new objecId
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        reactionBody: {
            type: String,
            required: true,
            maxLength: 280,
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (Date)=> timeSince(Date),
        }
    }, {
        toJSON: {
          virtuals: true,
        },
        id: false,
      }

)




module.exports = reactionSchema;