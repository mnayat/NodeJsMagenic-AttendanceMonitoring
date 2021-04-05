const express = require ('express');
const {
    getEvents,
    getEventsByID,
    getExportsbyEventID,
    postEvent,
    updateEvent,
    deleteEvent,
    getEventsByNameAndDate
} = require('../controllers/eventController');

const router =express.Router();

router.route('/')
.get(getEvents)
.get(getExportsbyEventID)
.post(postEvent)
.put(updateEvent)
.delete(deleteEvent);

router.route('/export')
.get(getExportsbyEventID);

router.route('/search')
.get(getEventsByNameAndDate)

router.route('/:id')
.get(getEventsByID);

module.exports = router;