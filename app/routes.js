const express = require("express");
const router = express.Router();

// import controller
const eventController = require("./controllers/eventController");

module.exports = function () {
    // home route
    router.get("/",
        eventController.eventsHome
    )

    // get all events 
    router.get("/api/events",
        eventController.getEvents
    )

    // create new event
    router.post("/api/events",
        eventController.createNewEvent
    )

    // event by id
    router.get("/api/events/:id",
        eventController.getEventById
    )

    // delete event by id
    router.delete("/api/events/:id",
        eventController.deleteEventById
    )

    return router;
}