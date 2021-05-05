const path = require('path')
const express = require('express')
const router = express.Router()
const classList = [] // our class list array

/** ********************************************************************* */
router.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'views', 'index.html'))
})

router.get('/api/list', function (req, res) {
  res.json(classList) // Respond with JSON
})

router.get('/api/get/:id', function (req, res) {
  res.json(classList[req.params.id]) // Notice the wildcard in the URL?
  // Try browsing to /api/get/0 once you've added some entries
})

router.get('/api/create', function (req, res) {
  res.sendFile(path.join(__dirname, 'views', 'create.html'))
})

router.post('/api/create', function (req, res) {
  console.log('Creating the following student:', req.body.student)
  var def = 111111
  if (!isNaN(req.body.id) && req.body.id.length !== 0)def = req.body.id
  var student = {
    name: req.body.student,
    studentNumber: def,
    electives: 'ELEN4010'
  }
  classList.push(student)
  res.redirect(req.baseUrl + '/api/list')
})

router.get('/api/delete', function (req, res) {
  res.sendFile(path.join(__dirname, 'views', 'delete.html'))
})

router.post('/api/delete', function (req, res) {
  if (!isNaN(req.body.id) && req.body.id < classList.length && classList.length > 0) {
    console.log('deleting a student: ', classList[req.body.id])
    classList.splice(req.body.id, 1)
  }
  res.redirect(req.baseUrl + '/api/list')
})

router.get('/api/edit', function (req, res) {
  res.sendFile(path.join(__dirname, 'views', 'edit.html'))
})

router.post('/api/edit', function (req, res) {
  if (!isNaN(req.body.id) && req.body.id < classList.length && classList.length > 0 && req.body.name.length > 0) {
    console.log('editing a student name')
    classList[req.body.id].name = req.body.name
  }
  if (!isNaN(req.body.id) && req.body.id < classList.length && classList.length > 0) {
    console.log('editing a student course')
    classList[req.body.id].electives = req.body.course
  }

  res.redirect(req.baseUrl + '/api/list')
})

module.exports = router
