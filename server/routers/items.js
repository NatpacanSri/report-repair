const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Item = require('../models/Item')

router.use(express.json())
router.use(express.urlencoded({ extended: false }))

router.get('/',async (req,res,next)=>{
    try {
        const data = await Item.find()
        console.log(data)
        res.json(data)

    } catch (err) {
        next(err)
    }
}) 

router.get('/oneItem/:id', async (req, res, next) => {
    try {
        const id = req.params.id
        const data = await Item.findById(id)
        res.json(data)
    } catch (err) {
        next(err)
    }
})

router.post('/add', async (req, res, next) => {
    try {
        const data = await Item.create(req.body)
        console.log(data)
        res.json(data)
    } catch (err) {
        next(err)
    }
})

router.put('/edit/:id', async (req, res, next) => {
    try {
        const id = req.params.id
        const { itemID, name, status } = req.body
        const data = await Item.findById(id).updateOne({
            $set: {
                itemID: itemID,
                itemName: itemName,
                status:status,
            }
        })

        res.json(data)
    } catch (err) {
        next(err)
    }
})

router.delete('/delete/:id', async (req,res,next)=>{
    try {
        const id = req.params.id
        const data = await Item.findById(id).deleteOne()
        res.json(data)
    } catch (err) {
        next(err)
    }
})

module.exports = router