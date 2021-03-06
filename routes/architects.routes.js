const express = require('express')
const router = express.Router()
const Architect = require('./../models/architect.model')
const Work = require('../models/work.model')
const Comment = require('../models/comment.model')
const cloudUploader = require('../configs/cloudinary.config')

const checkAuth = (req, res, next) => (req.isAuthenticated() ? next() : res.redirect('/login'))
const checkIsInRole = (role) => (req, res, next) => (req.isAuthenticated() && req.user.role === role ? next() : res.redirect('/login'))

//Creation

router.get('/create', checkAuth, (req, res, next) => res.render('./architects/create', { user: req.user }))

router.post('/create', checkAuth, cloudUploader.single('photo-arch'), (req, res, next) => {
	const { name, country, flagshipWork } = req.body

	let pic
	req.file ? (pic = req.file.url) : (pic = 'https://res.cloudinary.com/dxf11hxhh/image/upload/v1587913924/theArchitectureDB/default_dh4el6.jpg')

	let verification = true
	req.user.role == 'colaborator' ? (verification = false) : null

	Architect.create({ name, country, flagshipWork, isVerified: verification, photo: pic })
		.then(() => res.redirect('/architects'))
		.catch((err) => next(new Error(err)))
})

//Edition

router.get('/edit/:id', (req, res, next) => {
	Architect.findById(req.params.id)
		.then((architect) => res.render('./architects/edit', { architect, user: req.user }))
		.catch((err) => next(new Error(err)))
})

router.post('/edit/:id', cloudUploader.single('photo-arch'), checkAuth, (req, res, next) => {
	let verification = true
	req.user.role === 'colaborator' ? (verification = false) : null

	const editArch = {
		name: req.body.name,
		country: req.body.country,
		flagshipWork: req.body.flagshipWork,
		isVerified: verification,
	}

	if (req.file) {
		editArch.photo = req.file.url
	}

	console.log(editArch)

	Architect.findByIdAndUpdate(req.params.id, editArch, { new: true })
		.then((architect) => res.redirect(`/architects/view/${architect._id}`))
		.catch((err) => next(new Error(err)))
})

//Deletion

router.post('/delete/:id', checkAuth, (req, res, next) => {
	if (req.user.role == 'admin' || req.user.role == 'editor') {
		Architect.findByIdAndDelete(req.params.id)
			.then(() => res.redirect('/architects'))
			.catch((err) => next(new Error(err)))
	}
})

//Listing and detail view

router.get('/', (req, res, next) => {
	Architect.find({ isVerified: true })
		.then((architects) => res.render('./architects/index', { architects, user: req.user }))
		.catch((err) => next(new Error(err)))
})

///
///Comments
///

router.post('/post-comment/:id', checkAuth, (req, res, next) => {
	const newComment = {
		subject: req.body.subject,
		content: req.body.content,
		creatorId: req.user.id,
		postedIn: req.params.id,
	}
	Comment.create(newComment)
		.then(res.redirect(`/architects/view/${newComment.postedIn}`))
		.catch((err) => next(new Error(err)))
})

router.post('/post-comment/delete/:id', checkAuth, (req, res, next) => {
	const placePosted = req.body.reference

	Comment.findById(req.params.id)
		.then((result) => (result.creatorId == req.user.id || checkIsInRole('editor', 'admin') ? result.id : res.redirect(`/architects/view/${placePosted}`)))
		.then((resultId) => Comment.findByIdAndRemove(resultId))
		.then(() => res.redirect(`/architects/view/${placePosted}`))
		.catch((err) => next(new Error(err)))
})

//Show details of each element
router.get('/view/:id', (req, res, next) => {
	const promiseWork = Work.find({ architect: req.params.id })
	const promiseArch = Architect.findById(req.params.id)
	const promisePost = Comment.find({ postedIn: req.params.id }).populate('creatorId')

	Promise.all([promiseArch, promiseWork, promisePost])
		.then((data) => res.render('architects/detail', { arch: data[0], works: data[1], posts: data[2], user: req.user }))
		.catch((err) => next(new Error(err)))
})

module.exports = router
