// const { v4: uuidv4 } = require('uuid');
const express = require('express');

const PlacesControllers = require('../controllers/PlacesControllers')


const router = express.Router();


router.get('/:pid', PlacesControllers.getPlaceById);

router.get('/users/:uid',PlacesControllers.getPlacesByUserId);

router.post('/addPlace',PlacesControllers.createPlace);

router.patch('/update/:pid', PlacesControllers.updatePlace);

router.patch('/delete/:pid')

// router.get('/', (req, res, next)=> {
//     console.log(uuidv4())
// });

module.exports = router;