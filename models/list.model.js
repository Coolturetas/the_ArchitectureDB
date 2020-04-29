const mongoose = require('mongoose')
const Schema = mongoose.Schema

const listSchema = new Schema(
	{
		nameList: {
			type: String,
			default: 'Mi lista',
		},
		typeOfList: {
			type: String,
			enum: ['whish', 'visited', 'custom'],
		},
		likesId: [{ type: Schema.Types.ObjectId, ref: 'Work' }],
	},
	{
		timestamps: true,
	}
)

const List = mongoose.model('List', listSchema)
module.exports = List
