
const Member = require('../models/Member');
const Event = require('../models/Event');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/asyncHandler'); 
//@Desc    Return all members
//@route    GET /api/members
//@access  public 
exports.getAllMembers = asyncHandler(async(req, res, next) =>{
        const members = await Member.find();
        res.send(members);
        res.status(200).json({ 
            success: true,
            data: members });
            
});
// @Desc    Return all members
//@route    GET /api/members/:id
//@access  public 
exports.getmembersByID = asyncHandler( async(req, res, next) =>{
        const member = await Member.findById(req.params.id)
        .select({name: 1 })
        .populate("attendances",{timein:1})
        .populate("event",{eventname:1})
        .then(
            (attendance)=>{
                console.log(attendance);
                res.status(200).json({ 
                    success: true,
                    data: attendance });
        });
        // if(!member){
        //    return next(new ErrorResponse(`Member not found with event id of ${req.params.id}`, 404));
        // }
      
})

//@Desc    Create an members
//@route   post /api/members
//@access  public 
exports.postMember = asyncHandler( async (req, res, next) =>{
       const member = await Member.create(req.body);
        res.status(201).json({ 
            success: true,
            data: member });
});

//@Desc    UPDATE an member
//@route   PUT /api/members
//@access  public 
exports.updateMember =asyncHandler( async (req, res, next) =>{

    const member = await Member.findByIdAndUpdate(req.body._id, req.body,{
        new:true,
        runValidators: true
    });
    if(!member){
        return next(new ErrorResponse(`Member not found with member id of ${req.params.id}`, 404));
    }
    res.status(200).json({ success: true, data: member });
  
   
});

//@Desc    DELETE an member
//@route   DELETE /api/members
//@access  public 
exports.deleteMember =asyncHandler( async (req, res, next) =>{

     const memberattendance = await Member.findById(req.body._id);
       console.log(memberattendance.length);
        if(memberattendance.attten > 0){
            return next(new ErrorResponse(`Cannot delete member have a current attendance ${req.body._id}`, 400));
        }
        else{
        const member = await Member.findByIdAndDelete(req.body._id);
                if(!member){
                    return next(new ErrorResponse(`Member not found with member id of ${req.body._id}`, 404));
                }
                res.status(200).json({ success: true, data: {} });
        }
       
});

//@Desc    GET an event name with date start and date end
//@route   get /api/members/search?name=&status
//@access  public 
exports.getmembersByStatus =async (req, res, next) =>{
    const member = await Member.find( {
        name: req.query.name,
        status:req.query.status });
        if(!member){
            return next(new ErrorResponse(`Event not found with event name of ${req.query}`, 404));
        }
    res.status(200).json({ success: true, data: member });
}
