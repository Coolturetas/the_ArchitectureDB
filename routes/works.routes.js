const express = require('express')
const router = express.Router()
const Work = require('../models/work.model')
const Trend = require('../models/trend.model')
const Arch = require('../models/architect.model')
const Comment = require('../models/comment.model')
const List = require('../models/list.model')
const cloudUploader = require('../configs/cloudinary.config')

function checkAuth(req, res, next) {
	return req.isAuthenticated() ? next() : res.redirect('/login')
}

router.get('/', (req, res, next) => {
	Work.find({ isVerified: true })
		.populate('architect')
		.then((workFound) => res.render('works/works-index', { workFound, user: req.user }))
		.catch((err) => next(new Error('No se ha encontrado nada', err)))
})

//Edit
router.get('/edit/:id', checkAuth, (req, res, next) => {
	const workPromise = Work.findById(req.params.id).populate('trend').populate('architect')
	const archPromise = Arch.find()
	const trendPromise = Trend.find()

	Promise.all([workPromise, archPromise, trendPromise])
		.then((results) =>
			res.render('works/works-edit', {
				works: results[0],
				archs: results[1],
				trends: results[2],
			})
		)
		.catch((err) => next(new Error('No se ha encontrado nada para editar', err)))
})

router.post('/edit/:id', checkAuth, cloudUploader.single('photo-work'), (req, res, next) => {
	let verification = true
	req.user.role === 'colaborator' ? (verification = false) : null

	let pic
	if (req.file !== undefined) {
		pic = req.file.url
	}

	const editWork = {
		trend: req.body.trend,
		country: req.body.country,
		finished: req.body.finished,
		architect: req.body.architect,
		name: req.body.name,
		description: req.body.description,
		workType: req.body.workType,
		address: req.body.address,
		isVerified: verification,
	}

	Work.findByIdAndUpdate(req.params.id, editWork, { picWork: pic, new: true })
		.then((data) => {
			console.log(data)
			res.redirect('/works')
		})
		.catch((err) => console.log(err))
})

//Add new
router.get('/new', checkAuth, (req, res, next) => {
	const allPromise = [Arch.find(), Trend.find()]

	Promise.all(allPromise)
		.then((results) => res.render('works/works-add', { archs: results[0], trends: results[1] }))
		.catch((err) => next(new Error('No se han encontrado las opciones para el formulario', err)))
})

router.post('/', checkAuth, cloudUploader.single('photo-work'), (req, res, next) => {
	let verification = true
	req.user.role === 'colaborator' ? (verification = false) : null
	let pic

	if (req.file === undefined) {
		pic = 'https://res.cloudinary.com/dxf11hxhh/image/upload/v1587913924/theArchitectureDB/default_dh4el6.jpg'
	} else {
		pic = req.file.url
	}

	const newWork = {
		trend: req.body.trend,
		country: req.body.country,
		finished: req.body.finished,
		architect: req.body.architect,
		name: req.body.name,
		description: req.body.description,
		workType: req.body.workType,
		address: req.body.address,
		isVerified: verification,
	}

	Work.create(newWork, { picWork: pic })
		.then(res.redirect('/works'))
		.catch((err) => next(new Error('No se ha creado nada', err)))
})

//Delete
router.post('/delete/:id', checkAuth, (req, res, next) => {
	if (req.user.role == 'editor' || req.user.role == 'admin') {
		Work.findByIdAndRemove(req.params.id)
			.then(res.redirect('/works'))
			.catch((err) => next(new Error('No se ha borrado nada', err)))
	}
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
		.then(res.redirect(`/works/show/${newComment.postedIn}`))
		.catch((err) => next(new Error('No se ha posteado comentario', err)))
})

router.post('/post-comment/delete/:id', checkAuth, (req, res, next) => {
	const placePosted = req.body.reference
	Comment.findById(req.params.id)
		.then((result) => {
			if (result.creatorId == req.user.id) {
				return result.id
			} else {
				return res.redirect(`/works/show/${placePosted}`)
			}
		})
		.then((resultId) => Comment.findByIdAndRemove(resultId))
		.then(() => res.redirect(`/works/show/${placePosted}`))
		.catch((err) => console.log(err))
})

//Find One by ID
router.get('/show/:id', (req, res, next) => {
	const promisePost = Comment.find({ postedIn: req.params.id }).populate('creatorId')
	const promiseWork = Work.findById(req.params.id).populate('trend').populate('architect')

	Promise.all([promiseWork, promisePost])
		.then((data) => res.render('works/works-dets', { works: data[0], posts: data[1], user: req.user }))
		.catch((err) => next(new Error('No se ha encontrado nada para ver', err)))
})

//
//Likes
//

// router.post('/add-like/:id', checkAuth, (req, res, next) => {
// 	console.log('paice que funsiona')
// 	const newList = {
// 		typeOfList: 'Like',
// 		owner: req.user.id,
// 		likeId: req.params.id,
// 	}
// 	List.create(newList)
// 		.then(res.redirect('/works'))
// 		.catch((err) => console.log('No se ha creado ningun like', err))
// })

// router.post('/add-fav/:id', checkAuth, (req, res, next) => {
// 	console.log('paice que funsiona')
// 	const newList = {
// 		typeOfList: 'Fav',
// 		owner: req.user.id,
// 		likeId: req.params.id,
// 	}
// 	List.create(newList)
// 		.then(res.redirect('/works'))
// 		.catch((err) => console.log('No se ha creado ningun fav', err))
// })

module.exports = router
