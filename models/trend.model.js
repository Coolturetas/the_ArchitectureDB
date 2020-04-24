const mongoose = require('mongoose')
const Schema = mongoose.Schema

const trendSchema = new Schema(
	{
		name: String,
		picTrend: String,
		country: String,
		description: String,
		bestWork: String,
		year: Number,
	},
	{
		timestamps: true,
	}
)

const Trend = mongoose.model('trend', trendSchema)
module.exports = Trend
