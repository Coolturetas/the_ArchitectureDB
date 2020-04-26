const express = require('express')
const router = express.Router()
const Architect = require('./../models/architect.model')
const passport = require('passport')

function checkAuth(req, res, next) {
  return req.isAuthenticated() ? next() : res.redirect('/login')
}


//Creation

router.get('/create', checkAuth, (req, res, next) => {
  res.render('./architects/create')
})

router.post('/create', checkAuth, cloudUploader.single('photo-arch'), (req, res, next) => {
  const { name, country, flagshipWork } = req.body

  let verification = true
  req.user.role == 'colaborator' ? (verification = false) : null

  Architect.create({ name, country, flagshipWork, isVerified: verification, photo: req.file.url })
    .then(() => {
      res.redirect('/architects')
    })
    .catch((err) => {
      next(new Error(err))
    })
})

//Edition

router.get('/edit/:id', (req, res, next) => {
	Architect.findById(req.params.id)
		.then((architect) => {
			res.render('./architects/edit', architect)
		})
		.catch((err) => {
			next(new Error(err))
		})
})

router.post('/edit/:id', cloudUploader.single('photo-arch'), checkAuth, (req, res, next) => {

	let verification = true
	req.user.role === 'colaborator' ? (verification = false) : null
	
	const editArch = {
		name: req.body.name,
		country: req.body.country,
		flagshipWork: req.body.flagshipWork,
		photo: req.file.url,
		isVerified: verification,
	}

	console.log(editArch)

	Architect.findByIdAndUpdate(req.params.id, editArch, { new: true })
		.then((architect) => {
			res.redirect(`/architects/view/${architect._id}`)
		})
		.catch((err) => {
			next(new Error(err))
		})
})

//Deletion

router.post('/delete/:id', checkAuth, (req, res, next) => {
  if (req.user.role == 'admin' || req.user.role == 'editor') {
    Architect.findByIdAndDelete(req.params.id)
      .then(() => {
        res.redirect('/architects')
      })
      .catch((err) => {
        next(new Error(err))
      })
  }
})

//Listing and detail view

router.get('/', (req, res, next) => {
  Architect.find({ isVerified: true })
    .then((architects) => {
      res.render('./architects/index', { architects })
    })
    .catch((err) => {
      next(new Error(err))
    })
})

router.get('/view/:id', (req, res, next) => {
	const promiseWork = Work.find({ architect: req.params.id })
	const promiseArch = Architect.findById(req.params.id)

	Promise.all([promiseArch, promiseWork])
		.then((data) => res.render('architects/detail', { arch: data[0], works: data[1] }))
		.catch((err) => next(new Error('No se ha encontrado nada', err)))
})

module.exports = router
