const { v4: uuidv4 } = require('uuid');

let DUMMY_PLACES = [
    {
        id: 'p1',
        title: 'Empire State Building',
        description: 'One of the most famous sky scrapers in the world!',
        location: {
            lat: '',
            lng: ''
        },
        address: '',
        creator: 'u1'
    }
    ];


const getPlaceById = (req, res, next)=> {
    const placeId = req.params.pid;
    const place = DUMMY_PLACES.find(p => {
        return placeId === p.id;
    });

    if(!place){
        const error = new Error('Could not find place with id');
        error.code = 404;
        return next(error); // for asynchronous
    }
    res.json({place});
};

const getPlacesByUserId =  (req, res, next)=> {
    const userId = req.params.uid;
    const places = DUMMY_PLACES.filter(p => {
        return userId === p.creator;
    });
    if(!places || places.length){
        // return res.status(404).json({message: "Could not find place with id"})
        const error = new Error('Could not find place with id');
        error.code = 404;
        throw error; // for synchronous
    }
    res.json({place});
}

const createPlace = (res, req, next) => {
    const { title, description, coordinates, address, creator } = req.body;
    const createdPlace = {
        id: uuidv4(),
        title,
        description,
        location: coordinates,
        address,
        creator
    };
    DUMMY_PLACES.push(createPlace);
    res.status(201).json({message: "place has been added successfully!"})
}

const updatePlace = (req, res, next) => {
    const placeId = req.params.pid;
    const {title, description} = req.body;

    const placeIndex = DUMMY_PLACES.findIndex(p=> p.id === placeId);
    const updatedPlace = { ...DUMMY_PLACES.find(p => p.id === placeId) };

    updatedPlace.title = title;
    updatedPlace.description = description;

    DUMMY_PLACES[placeIndex] = updatedPlace;

    res.status(200).json({place: updatedPlace})

};
const deletePlace = (req, res, next) => {
    DUMMY_PLACES = DUMMY_PLACES.filter(p => p.id !== req.params.pid);
    res.status(200).json({message: "Deleted object"});
};



exports.getPlaceById = getPlaceById;
exports.getPlacesByUserId = getPlacesByUserId;
exports.createPlace = createPlace;
exports.updatePlace = updatePlace;
exports.deletePlace = deletePlace;