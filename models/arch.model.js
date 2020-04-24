const mongoose = require('mongoose')
const Schema = mongoose.Schema

const archSchema = new Schema(
	{
		name: String,
		picArch: String,
		country: String,
		description: String,
		bestWork: String,
		works: String,
	},
	{
		timestamps: true,
	}
)

const Archs = mongoose.model('achitect', archSchema)
module.exports = Archs
