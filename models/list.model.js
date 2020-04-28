const mongoose = require('mongoose')
const Schema = mongoose.Schema

const listSchema = new Schema(
	{
		nameList: String,
		typeOfList: {
			type: String,
			enum: ['Like', 'Fav'],
		},
		owner: { type: Schema.Types.ObjectId, ref: 'user' },
		likeId: { type: Schema.Types.ObjectId, ref: 'Work' },
		myLikes: Array,
	},
	{
		timestamps: true,
	}
)

const List = mongoose.model('list', listSchema)
module.exports = List
