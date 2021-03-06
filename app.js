require('dotenv').config()

// Database
require('./configs/mongoose.config')

// Debugger
require('./configs/debugger.config')

// App
const express = require('express')
const app = express()

// Configs
require('./configs/preformatter.config')(app)
require('./configs/middleware.config')(app)
require('./configs/passport.config')(app)
require('./configs/views.configs')(app)
require('./configs/locals.config')(app)

// Base URLS
app.use('/', require('./routes/index.routes'))
app.use('/', require('./routes/auth.routes'))
app.use('/architects', require('./routes/architects.routes'))
app.use('/trend', require('./routes/trend.routes'))
app.use('/dashboard', require('./routes/dashboard.routes'))
app.use('/user', require('./routes/user.routes'))
app.use('/works', require('./routes/works.routes'))
app.use('/api', require('./routes/api.routes'))
app.use('/list', require('./routes/list.routes'))

module.exports = app
