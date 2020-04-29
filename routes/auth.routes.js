const express = require('express')
const router = express.Router()
const passport = require('passport')

const User = require('../models/user.model')
const List = require('../models/list.model')

const bcrypt = require('bcrypt')
const bcryptSalt = 10

// User signup
router.get('/signup', (req, res) => res.render('auth/signup'))
router.post('/signup', (req, res, next) => {
	const { username, password } = req.body

	if (!username || !password) {
		res.render('auth/signup', { errorMsg: 'Rellena el usuario y la contraseña' })
		return
	}

	User.findOne({ username })
		.then((user) => {
			if (user) {
				res.render('auth/signup', { errorMsg: 'El usuario ya existe en la BBDD' })
				return
			}
			const salt = bcrypt.genSaltSync(bcryptSalt)
			const hashPass = bcrypt.hashSync(password, salt)

			const createVisitedList = { nameList: 'Lugares que visité', typeOfList: 'visited' }
			const createWishList = { nameList: 'Me muero por ir', typeOfList: 'whish' }

			List.create([createVisitedList, createWishList]).then((listsCreated) => {
				User.create({ username, password: hashPass, visitedList: listsCreated[0], wishList: listsCreated[1] })
					.then(() => res.redirect('/'))
					.catch(() => res.render('auth/signup', { errorMsg: 'No se pudo crear el usuario' }))
			})
		})
		.catch((error) => next(error))
})

// User login
router.get('/login', (req, res) => res.render('auth/login', { errorMsg: req.flash('error') }))
router.post(
	'/login',
	passport.authenticate('local', {
		successRedirect: '/',
		failureRedirect: '/login',
		failureFlash: true,
		passReqToCallback: true,
		badRequestMessage: 'Rellena todos los campos',
	})
)

// User logout
router.get('/logout', (req, res) => {
	req.logout()
	res.redirect('/login')
})

module.exports = router
