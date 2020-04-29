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
	visitedList: { type: Schema.Types.ObjectId, ref: 'List' },
	wishList: { type: Schema.Types.ObjectId, ref: 'List' },
	myLists: [{ type: Schema.Types.ObjectId, ref: 'List' }],
})

const User = mongoose.model('User', userSchema)
module.exports = User
