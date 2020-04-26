const mongoose = require('mongoose')
const Schema = mongoose.Schema

const trendSchema = new Schema(
	{
		name: String,
		picTrend: {
			type: String,
			default: 'https://res.cloudinary.com/dxf11hxhh/image/upload/v1587913924/theArchitectureDB/default_dh4el6.jpg',
		},

		country: String,
		description: String,
		bestWork: String,
		year: Number,
		isVerified: { type: Boolean, default: false },
	},
	{
		timestamps: true,
	}
)

const Trend = mongoose.model('trend', trendSchema)
module.exports = Trend
