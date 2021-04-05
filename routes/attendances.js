const express = require ('express');
const {
    postAtttedance,
    updateAttendance,
    deleteAttendance
    
} = require('../controllers/attendanceController');

const router =express.Router();

router.route('/')
.post(postAtttedance)
.put(updateAttendance)
.delete(deleteAttendance);

module.exports = router;