require('dotenv').config()
const mongoose = require('mongoose')
require('dotenv').config()

mongoose
	.connect(`${process.env.DB}`, { useNewUrlParser: true, useUnifiedTopology: true })
	.then((x) => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
	.catch((err) => console.error('Error connecting to mongo', err))

module.exports = mongoose
