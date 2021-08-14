const events = require("../events.json");

exports.eventsHome = async (req, res) => {
    res.send("<h1>HOLA MUNDO</h1>");
};

exports.getEvents = async (req, res) => {
    res.json(events);
};

exports.createNewEvent = async (req, res) => {
    const data = req.body;

    if (!data || !data.name) {
        return res.status(400).json({error: "event.name is missing"});
    }

    const ids = events.map(ev => ev.id);
    const maxId = Math.max(...ids);
    const newEvent = {
        id: maxId + 1,
        name: data.name,
        location: data.location,
        description: data.description,
        photoUrl: data.photoUrl,
        dates: data.dates
    };
    //events = [...events, newEvent]  TODO: SAVE NEW EVENT
    res.status(201).json(newEvent);
};

exports.getEventById = async (req, res) => {
    const id = Number(req.params.id);
    const event = events.find(ev => ev.id === id);
    if (event) { res.json(event); } else { res.status(404).end("event not found"); }
};

exports.deleteEventById = async (req, res) => {
    const id = Number(req.params.id);
    const evs = events.find(ev => ev.id !== id);
    //res.status(200).end(`event with id: ${id} was deleted`);
    res.status(200).json(evs);
};