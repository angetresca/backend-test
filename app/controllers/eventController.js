const Event = require("../models/Event");

exports.eventsHome = (req, res) => {
    res.send("<h1>Esta es la API de eventos de Angelina Tresca</h1>");
};

exports.getEvents = (req, res) => {
    let filters = {};
    const {name, startDate, endDate} = req.query;
    
    if (name) {
        filters["name"] = { $regex: ".*" + name + ".*", $options: "i" };
    }

    if (startDate && endDate) {
        filters["dates.datetime"] = {
            "$gte": new Date(startDate), 
            "$lt": new Date(endDate)
        };
    }
    Event.find(filters).sort("dates.datetime").then(events => {
        res.json(events);
    });
};

exports.createNewEvent = (req, res) => {
    const data = req.body;

    if (!data || !data.name || !data.location || !data.description || !data.dates || data.dates.length === 0) {
        return res.status(400).json({error: "event info is incomplete"});
    }
  
    data.dates = data.dates.map((date) => {
        return {
            "datetime": new Date(date.datetime),
            "price": date.price
        };
    });

    const newEvent = new Event(data);
    
    newEvent.save()
        .then(()=> {
            res.status(201).json(newEvent);
        })
        .catch(err => {
            res.status(500).end(err.toString());
        });
};

exports.getEventById = (req, res, next) => {
    const {id} = req.params;
    Event.findById(id).then(event => {
        if (event) {
            res.status(200).json(event);
        } else {
            res.status(404).end("Event not found");
        }
        
    }).catch(err => next(err));
};

exports.deleteEventById = (req, res, next) => {
    const {id} = req.params;
    Event.findByIdAndRemove(id).then(()=> {
        res.status(200).send(`event with id: ${id} was deleted`);
    }).catch(err => next(err));
};

exports.modifyEventById = (req, res, next) => {
    const {id} = req.params;

    const data = req.body;

    if (!data) {
        return res.status(400).json({error: "event info is incomplete"});
    }
    
    if (data.dates && data.dates.length) {
        data.dates = data.dates.map((date) => {
            return {
                "datetime": new Date(date.datetime),
                "price": date.price
            };
        });
    }
    
    const newEventInfo = {};

    Object.keys(data).forEach((key)=> {
        newEventInfo[key] = data[key];
    });

    Event.findByIdAndUpdate(id, newEventInfo, {new: true}).then(result=> {
        if (result) {
            res.status(200).json(result);
        } else {
            res.status(404).end("Event not found");
        }
    }).catch(err => next(err));
};

exports.shareEventInTwitter = (req, res, next) => {
    const {id} = req.params;

    Event.findById(id).then(event => {
        if (event) {
            // Here should be the api call to twitter. 
            // Now it is simulated that the event is shared correctly.
            setTimeout(function(){ 
                res.status(200).json(event);
            }, 1000);
        } else {
            res.status(404).end("Event not found");
        }
        
    }).catch(err => next(err));
};