const express = require('express')
const router = express.Router()
const Work = require('../models/work.model')
const Trend = require('../models/trend.model')
const Arch = require('../models/architect.model')
const List = require('../models/list.model')
const User = require('../models/user.model')

//WORKS

router.get('/works/search', (req, res, next) => {
	Work.find(req.query)
		.then((works) => {
			res.json({ works })
		})
		.catch((err) => {
			next(new Error(err))
		})
})

router.get('/works/:id', (req, res, next) => {
	Work.findById(req.params.id)
		.then((work) => {
			res.json({ work })
		})
		.catch((err) => {
			next(new Error(err))
		})
})

router.get('/works', (req, res, next) => {
	Work.find({ isVerified: true })
		.then((allWorks) => {
			res.json({ allWorks })
		})
		.catch((err) => {
			next(new Error(err))
		})
})

//ARCHITECTS

router.get('/architects/search', (req, res, next) => {
	Arch.find(req.query)
		.then((architects) => {
			res.json({ architects })
		})
		.catch((err) => {
			next(new Error(err))
		})
})

router.get('/architects/:id', (req, res, next) => {
	Arch.findById(req.params.id)
		.then((arch) => {
			res.json({ arch })
		})
		.catch((err) => {
			next(new Error(err))
		})
})

router.get('/architects', (req, res, next) => {
	Arch.find({ isVerified: true })
		.then((allArchs) => {
			res.json({ allArchs })
		})
		.catch((err) => {
			next(new Error(err))
		})
})
//TRENDS

router.get('/trend/search', (req, res, next) => {
	Trend.find(req.query)
		.then((trends) => {
			res.json({ trends })
		})
		.catch((err) => {
			next(new Error(err))
		})
})

router.get('/trend/:id', (req, res, next) => {
	Trend.findById(req.params.id)
		.then((trend) => {
			res.json({ trend })
		})
		.catch((err) => {
			next(new Error(err))
		})
})

router.get('/trend', (req, res, next) => {
	Trend.find({ isVerified: true })
		.then((allTrends) => {
			res.json({ allTrends })
		})
		.catch((err) => {
			next(new Error(err))
		})
})

//LISTS

router.get('/list/mylists/:id', (req, res, next) => {
	List.findById(req.params.id)
		.then((list) => {
			res.json({ list })
		})
		.catch((err) => {
			next(new Error(err))
		})
})

//USER
router.get('/user', (req, res, next) => {
	User.findById(req.user.id)
		.then((user) => {
			res.json({ user })
		})
		.catch((err) => {
			next(new Error(err))
		})
})

router.get('/user/visitedList/likes', (req, res, next) => {
	User.findById(req.user.id)
		.then((result) => List.findById(result.visitedList))
		.then((visitedList) => res.json({ visitedList }))
		.catch((err) => next(new Error(err)))
})

router.post('/user/visitedList/likes', (req, res, next) => {
	console.log('hola ke ase')
	User.findById(req.user.id)
		.then((result) => List.findByIdAndUpdate(result.visitedList, { likesId: req.body.likesId }))
		.then((visitedList) => res.json({ visitedList }))
		.catch((err) => next(new Error(err)))
})

module.exports = router
