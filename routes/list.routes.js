const express = require('express')
const router = express.Router()
const Work = require('../models/work.model')
const Trend = require('../models/trend.model')
const Arch = require('../models/architect.model')
const Comment = require('../models/comment.model')
const List = require('../models/list.model')

router.get('/', (req, res, next) => {
	// const promiseList = List.find({ owner: req.user.id })
	const promiseFav = List.find({ owner: req.user.id, typeOfList: 'Fav' }).populate('owner').populate('likeId')
	const promiseLike = List.find({ owner: req.user.id, typeOfList: 'Like' }).populate('owner').populate('likeId')

	Promise.all([promiseFav, promiseLike])
		.then((data) => res.render('list/my-lists', { favs: data[0], likes: data[1], lists: data[2] }))
		.catch((err) => console.log('No se ha encontrado lista alguna', err))
})

// //Add list
// router.post('/new', (req, res, next) => {
// 	const newList = {
// 		nameList: req.body.nameList,
// 		owner: req.user.id,
// 	}
// 	console.log(req.body)

// 	List.create(newList)
// 		.then((data) => console.log(data))
// 		.catch((err) => console.log('No se ha creado ninguna lista'))
// })

module.exports = router
