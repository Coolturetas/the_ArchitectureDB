const mongoose = require('mongoose')
const Schema = mongoose.Schema

const architectSchema = new Schema({
	name: { type: String, required: true, unique: true },
	country: String,
	flagshipWork: String,
	description: String,
	works: Array,
	photo: String,
})

const Architect = mongoose.model('Architect', architectSchema)
module.exports = Architect
