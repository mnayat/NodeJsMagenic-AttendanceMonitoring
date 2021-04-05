
const Attendance = require('../models/Attendance');
const Member = require('../models/Member');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/asyncHandler'); 
const Event = require('../models/Event');

//@Desc    Create an members
//@route   post /api/members
//@access  public 
exports.postAtttedance = asyncHandler( async (req, res, next) =>{
   
    const member = await Attendance.create(req.body).then((dbAttendance)=>{
        return Member.findOneAndUpdate(
            { _id: req.body.members }, 
            {$push: {attendances: dbAttendance._id}  }, 
            { new: true });

    }).then((events)=>{
        return Event.findOneAndUpdate(
            { _id: req.body.event }, 
            {$push: {members: events._id}  }, 
            { new: true });
       
    }).then(successful => 
        {
            res.status(200).json({ success: true, data: successful });

        });

});

//@Desc    UPDATE an member
//@route   PUT /api/members
//@access  public 
exports.updateAttendance=asyncHandler( async (req, res, next) =>{

    const attendance = await Attendance.findByIdAndUpdate(req.body._id, req.body,{
        new:true,
        runValidators: true
    });
    if(!attendance){
        return next(new ErrorResponse(`Member not found with member id of ${req.params.id}`, 404));
    }
    res.status(200).json({ success: true, data: attendance });
  
   
});

//@Desc    DELETE an member
//@route   DELETE /api/members
//@access  public 
exports.deleteAttendance =asyncHandler( async (req, res, next) =>{
        const attendance = await Attendance.findByIdAndDelete(req.body._id);
        if(!attendance){
            return next(new ErrorResponse(`attendance not found with attendance id of ${req.body._id}`, 404));
        }
        res.status(200).json({ success: true, data: {} });
});

