const express = require('express')
const router = express.Router()
const Work = require('../models/work.model')
const User = require('../models/user.model')
const List = require('../models/list.model')

router.get('/', (req, res, next) => {
	const wishes = req.user.wishList.likesId
	const visites = req.user.visitedList.likesId

	Promise.all([wishes, visites])
		.then((data) => res.render('list/my-lists', { wishes: data[0], visites: data[1] }))
		.catch((err) => console.log('No se ha encontrado nada', err))
})
router.post('/delete/:id', (req, res, next) => {
	const wishes = req.user.wishList.likesId
	const visites = req.user.visitedList.likesId

	visites.forEach((elm) => {
		if (elm.id === req.params.id) {
			List.findByIdAndUpdate(req.user.visitedList, { $pull: { likesId: req.params.id } })
				.then(res.redirect('/list'))
				.catch((err) => console.log('No se ha borrado de visitas', err))
		}
	})
	wishes.forEach((elm) => {
		if (elm.id === req.params.id) {
			List.findByIdAndUpdate(req.user.wishList, { $pull: { likesId: req.params.id } })
				.then(res.redirect('/list'))
				.catch((err) => console.log('No se ha borrado de deseos', err))
		}
	})
})
module.exports = router
