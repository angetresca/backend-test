const {Schema, model} = require("mongoose");


// Schema mongo
const eventSchema = new Schema({
    name: String,
    location: String,
    description: String,
    highlighted: Boolean,
    photoUrl: String,
    dates: [{datetime: Date, price: Number}],
});

// Transform the fields that are different
eventSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id;
        delete returnedObject._id;
        delete returnedObject.__v;
        returnedObject.dates.forEach(date => {
            delete date._id;
        });
    }
});

// Model mongo

const Event = model("Event", eventSchema);

module.exports = Event;