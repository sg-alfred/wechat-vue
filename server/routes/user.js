/**
 *
 * Created by chenjz on 2017/9/18.
 */
'use strict'

const express = require('express')
const router = express.Router()

const user = require('../controller/user')

router.post('/user/register', user.register)
router.post('/user/login', user.login)
router.get('/user/logout', user.logout)

// 这个，或许可以更加 具体一点～
router.get('/users/:id', user.getUserById)

