const express = require('express');

const app = express()
const router = express.Router()

router.get('/rooms',(req,res) => {
    const mainStatus = req.body.mainStatus
    const openAll = req.body.openAll
    const closeAll = req.body.closeAll
});

router.get('/rooms/:id',(req,res) => {
    const roomIdStatus = req.body.roomIdStatus
    
});

router.delete('/rooms/:id', (req, res) => {

});