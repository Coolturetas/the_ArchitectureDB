const mongoose = require('mongoose')
const Schema = mongoose.Schema

const workSchema = new Schema(
  {
    trend: {
      type: Schema.Types.ObjectId,
      ref: 'trend',
    },
    architect: {
      type: Schema.Types.ObjectId,
      ref: 'Architect',
    },
    name: String,
    where: String,
    finished: Number,
    picWork: String,
    description: String,
    workType: String,
    address: String,
    isVerified: Boolean,
  },
  {
    timestamps: true,
  }
)

const Work = mongoose.model('Work', workSchema)
module.exports = Work
