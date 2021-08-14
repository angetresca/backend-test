const mongoose = require("mongoose");
const Event = require("../models/Event");

exports.eventsHome = (req, res) => {
    res.send("<h1>Esta es la API de eventos de Angelina Tresca</h1>");
};

exports.getEvents = (req, res) => {
    Event.find({}).then(events => {
        res.json(events);
    });
};

exports.createNewEvent = (req, res) => {
    const data = req.body;

    if (!data || !data.name) {
        return res.status(400).json({error: "event.name is missing"});
    }

    const newEvent = new Event({
        "name": data.name,
        "location": data.location,
        "description": data.description,
        "photoUrl": data.photoUrl,
        "dates": [
            {
                "datetime": new Date(),
                "price": 200
            },
            {
                "datetime": new Date(),
                "price": 300
            }
        ]
    });
    
    newEvent.save()
        .then(()=> {
            mongoose.connection.close();
            res.status(201).json(newEvent);
        })
        .catch(err => {
            mongoose.connection.close();
            res.status(500).end(err.toString());
        });
};

exports.getEventById = (req, res, next) => {
    const {id} = req.params;
    Event.findById(id).then(event => {
        mongoose.connection.close();
        if (event) {
            res.status(200).json(event);
        } else {
            res.status(404).end("Event not found");
        }
        
    }).catch(err => {
        mongoose.connection.close();
        next(err);
    });
};

exports.deleteEventById = (req, res, next) => {
    const {id} = req.params;
    Event.findByIdAndRemove(id).then(()=> {
        res.status(200).send(`event with id: ${id} was deleted`);
    }).catch(err=> next(err));
};

exports.modifyEventById = (req, res, next) => {
    const {id} = req.params;

    const data = req.body;

    if (!data || !data.name) {
        return res.status(400).json({error: "event.name is missing"});
    }
    
    const newEventInfo = new Event({
        "name": data.name,
        "location": data.location,
        "description": data.description,
        "photoUrl": data.photoUrl,
        "dates": [
            {
                "datetime": new Date(),
                "price": 200
            },
            {
                "datetime": new Date(),
                "price": 300
            }
        ]
    });

    Event.findByIdAndUpdate(id, newEventInfo, {new: true}).then(result=> {
        res.status(200).json(result);
    }).catch(err=> next(err));
};