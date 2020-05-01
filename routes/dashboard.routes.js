const express = require('express')
const router = express.Router()
const Architect = require('./../models/architect.model')
const Trend = require('./../models/trend.model')
const Work = require('./../models/work.model')

const checkIsInRole = (role) => (req, res, next) => (req.isAuthenticated() && req.user.role === role ? next() : res.redirect('/login'))


//access to validation screen

router.get('/validate', checkIsInRole('editor', 'admin'), (req, res, next) => {
	const architectPromise = Architect.find({ isVerified: false })
	const trendPromise = Trend.find({ isVerified: false })
	const workPromise = Work.find({ isVerified: false })

	Promise.all([architectPromise, trendPromise, workPromise])
		.then((results) => {
			res.render('./dashboard/validation-screen', {
				architects: results[0],
				trends: results[1],
				works: results[2],
				user: req.user,
			})
		})
		.catch((err) => {
			next(new Error(err))
		})
})

//Acceptance-Rejection

router.post('/works/accept/:id', checkIsInRole('editor', 'admin'), (req, res, next) => {
	Work.findByIdAndUpdate(req.params.id, { isVerified: true }, { new: true })
		.then(() => res.redirect('/dashboard/validate'))
		.catch((err) => next(new Error(err)))
})

router.post('/architects/accept/:id', checkIsInRole('editor', 'admin'), (req, res, next) => {
	Architect.findByIdAndUpdate(req.params.id, { isVerified: true }, { new: true })
		.then(() => res.redirect('/dashboard/validate'))
		.catch((err) => next(new Error(err)))
})

router.post('/trends/accept/:id', checkIsInRole('editor', 'admin'), (req, res, next) => {
	Trend.findByIdAndUpdate(req.params.id, { isVerified: true }, { new: true })
		.then(() => res.redirect('/dashboard/validate'))
		.catch((err) => {
			next(new Error(err))
		})
})

router.post('/works/reject/:id', checkIsInRole('editor', 'admin'), (req, res, next) => {
	Work.findByIdAndDelete(req.params.id)
		.then(() => res.redirect('/dashboard/validate'))
		.catch((err) => next(new Error(err)))
})

router.post('/architects/reject/:id', checkIsInRole('editor', 'admin'), (req, res, next) => {
	Architect.findByIdAndDelete(req.params.id)
		.then(() => res.redirect('/dashboard/validate'))
		.catch((err) => next(new Error(err)))
})

router.post('/trends/reject/:id', checkIsInRole('editor', 'admin'), (req, res, next) => {
	Trend.findByIdAndDelete(req.params.id)
		.then(() => res.redirect('/dashboard/validate'))
		.catch((err) => next(new Error(err)))
})

module.exports = router
