const mongoose = require('mongoose')
const Schema = mongoose.Schema

const workSchema = new Schema(
	{
		name: String,
		country: String,
		address: String,
		workType: String,
		description: String,
		finished: Number,
		trend: {
			type: Schema.Types.ObjectId,
			ref: 'Trend',
		},
		architect: {
			type: Schema.Types.ObjectId,
			ref: 'Architect',
		},
		picWork: {
			type: String,
			default: 'https://res.cloudinary.com/dxf11hxhh/image/upload/v1587913924/theArchitectureDB/default_dh4el6.jpg',
		},
		isVerified: Boolean,
	},
	{
		timestamps: true,
	}
)

const Work = mongoose.model('Work', workSchema)
module.exports = Work
