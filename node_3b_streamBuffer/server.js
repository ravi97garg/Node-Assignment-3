express = require('express')
var app = express()
var router = require('express').Router()

// predicate the router with a check and bail out when needed
// router.use(function (req, res, next) {
// 	console.log("came here 1");
//   if (!req.headers['x-auth']) return next('router')
//   next()
// })

app.get('/', function (req, res) {
	console.log("came here 2");
  res.send('hello, user!')
})

// use the router and 401 anything falling through
router.use('/admin', router, function (req, res) {
	console.log("came here 3");
  res.sendStatus(401)
})

app.listen(4000, console.log("started it bro!"))