const express = require("express");
const router = express.Router();

// import controller
const eventController = require("./controllers/eventController");

module.exports = function () {
    // home route
    router.get("/",
        eventController.eventsHome
    );

    // get events 
    router.get("/api/events",
        eventController.getEvents
    );

    // create new event
    router.post("/api/events",
        eventController.createNewEvent
    );

    // event by id
    router.get("/api/events/:id",
        eventController.getEventById
    );

    // delete event by id
    router.delete("/api/events/:id",
        eventController.deleteEventById
    );

    // modify event by id
    router.put("/api/events/:id",
        eventController.modifyEventById
    );

    // share event in twitter by id
    router.get("/api/events/:id/share/tw",
        eventController.shareEventInTwitter
    );

    return router;
};