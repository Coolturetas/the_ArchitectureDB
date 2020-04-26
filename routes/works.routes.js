const express = require('express')
const router = express.Router()
const Work = require('../models/work.model')
const Trend = require('../models/trend.model')
const Arch = require('../models/architect.model')
const cloudUploader = require('../configs/cloudinary.config')

function checkAuth(req, res, next) {
  return req.isAuthenticated() ? next() : res.redirect('/login')
}

router.get('/', (req, res, next) => {
  Work.find()
    .then((workFound) => res.render('works/works-index', { workFound }))
    .catch((err) => next(new Error('No se ha encontrado nada', err)))
})

//Edit
router.get('/edit/:id', checkAuth, (req, res, next) => {
  const workPromise = Work.findById(req.params.id)
    .populate('trend')
    .populate('architect')
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
    .catch((err) =>
      next(new Error('No se ha encontrado nada para editar', err))
    )
})

router.post(
  '/edit/:id',
  checkAuth,
  cloudUploader.single('photo-work'),
  (req, res, next) => {
    let verification = true
    req.user.role === 'colaborator' ? (verification = false) : null

    const editWork = {
      trend: req.body.trend,
      architect: req.body.architect,
      name: req.body.name,
      finished: req.body.finished,
      where: req.body.where,
      description: req.body.description,
      workType: req.body.workType,
      picWork: req.file.url,
      isVerified: verification,
    }
    console.log(editWork)

    Work.findByIdAndUpdate(req.params.id, editWork, { new: true })
      .then((data) => {
        console.log(data)
        // res.redirect('/')
      })
      .catch((err) => next(new Error('No se ha editado nada', err)))
  }
)

//Add new
router.get('/new', checkAuth, (req, res, next) => {
  const allPromise = [Arch.find(), Trend.find()]

  Promise.all(allPromise)
    .then((results) =>
      res.render('works/works-add', { archs: results[0], trends: results[1] })
    )
    .catch((err) =>
      next(
        new Error('No se han encontrado las opciones para el formulario', err)
      )
    )
})

router.post(
  '/',
  checkAuth,
  cloudUploader.single('photo-work'),
  (req, res, next) => {
    let verification = true
    req.user.role === 'colaborator' ? (verification = false) : null

    const newWork = {
      trend: req.body.trend,
      architect: req.body.architect,
      name: req.body.name,
      finished: req.body.finished,
      where: req.body.where,
      description: req.body.description,
      workType: req.body.workType,
      picWork: req.file.url,
      isVerified: verification,
    }
    console.log(newWork)
    Work.create(newWork)
      .then(res.redirect('/works'))
      .catch((err) => next(new Error('No se ha creado nada', err)))
  }
)

//Find One by ID
router.get('/show/:id', (req, res, next) => {
  Work.findById(req.params.id)
    .populate('trend')
    .populate('architect')
    .then((workFound) => res.render('works/works-dets', workFound))
    .catch((err) => next(new Error('No se ha encontrado nada para ver', err)))
})

//Delete
router.post('/delete/:id', checkAuth, (req, res, next) => {
  if (req.user.role == 'editor' || req.user.role == 'admin') {
    Work.findByIdAndRemove(req.params.id)
      .then(res.redirect('/works'))
      .catch((err) => next(new Error('No se ha borrado nada', err)))
  }
})

module.exports = router
