const mongoose = require('mongoose')
const Schema = mongoose.Schema

const postSchema = new Schema(
	{
		subject: String,
		content: String,
		creatorId: { type: Schema.Types.ObjectId, ref: 'User' },
		postedIn: String,
	},
	{
		timestamps: true,
	}
)

const Comment = mongoose.model('Post', postSchema)
module.exports = Comment
