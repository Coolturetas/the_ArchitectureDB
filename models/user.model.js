const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
	username: String,
	password: String,
	status: {
		type: String,
		enum: ['Pending Confirmation', 'Active'],
		default: 'Pending Confirmation',
	},
	confirmationCode: String,
	email: String,
	role: {
		type: String,
		enum: ['admin', 'editor', 'colaborator'],
		default: 'colaborator',
	},
})

const User = mongoose.model('user', userSchema)
module.exports = User
