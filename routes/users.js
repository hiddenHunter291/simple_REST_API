const express = require('express')
const {v1: uuid} = require('uuid');

const router = express.Router()

// all routes in here are starting with /users
// mockDatabase
let users = [
    {
        firstName: "Ryan",
        lastName: "Harris",
        age: 37,
        userId: uuid()
    },
    {
        firstName: "Marshal",
        lastName: "Doe",
        age: 24,
        userId: uuid()
    }
]
router.get('/', (req,res) => {
    res.send(users)
})

router.post('/', (req,res) => {
    const user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        age: req.body.age,
        userId: uuid()
    }
    users.push(user)
    res.send(`User with name ${req.body.firstName} added`)
})

// /users/2 => req.params { id: 2}

router.get('/:id', (req,res) => {
    const id = req.params.id.toString()
    const foundUser = users.find((user) => user.userId === id)
    res.send(foundUser)

})

router.delete('/:id', (req,res) => {
    const id = req.params.id
    users = users.filter((user) => user.userId !== id)
    res.send(`userId: ${id} successfully deleted!!`)
})

router.patch('/:id', (req,res) => {
    const id = req.params.id.toString()
    const {firstName, lastName, age} = req.body
    const user = users.find((user) => user.userId === id)
    //console.log(user)
    if(firstName) {
        user.firstName = firstName
    }
    if(lastName) {
        user.lastName = lastName
    }
    if(age) {
        user.age = age
    }
    res.send(`userId: ${id} updated successfyully!!`)  
})

module.exports = router