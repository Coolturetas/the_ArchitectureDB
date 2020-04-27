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
    finished: Number,
    picWork: {
      type: String,
      default:
        'https://res.cloudinary.com/dxf11hxhh/image/upload/v1587913924/theArchitectureDB/default_dh4el6.jpg',
    },
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
