
const Event = require('../models/Event');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/asyncHandler'); 
const dateFormat = require("dateformat");
const xl = require('exceljs');
//@Desc    Return all events
//@route    GET /api/events
//@access  public 
exports.getEvents = asyncHandler(async(req, res, next) =>{
        const event = await Event.find().then((dbEvents) => {
            res.status(200).json({ 
                success: true,
                data: dbEvents });
        });
          
       
});
// @Desc    Return all events
//@route    GET /api/events/:id
//@access  public 
exports.getEventsByID = asyncHandler( async(req, res, next) =>{
    Event
    .findOne({_id: req.params.id }).select({eventname:1})
    .populate(
        {
            path:'members',
            select: {name: 1},
            populate: {
                path:'attendances',
                select: {timein : 1, timeout: 1}
            }
        }
       
    )
    .then(event => {

      if(!event){
           return next(new ErrorResponse(`Event not found with event id of ${req.params.id}`, 404));
        }
        res.status(200).json({ 
            success: true,
            data: event });
    });
 
        
})

// @Desc    Return an excel files by EventId
//@route    GET /api/events/export?id=
//@access  public 
exports.getExportsbyEventID = (req, res, next) =>{
    const id = req.query.id;
    const wb = new xl.Workbook();
    const ws = wb.addWorksheet('Event');
        Event
        .findOne({_id: req.query.id }).select({eventname:1, startdate: 1})
        .populate(
            {
                path:'members',
                select: {name: 1},
                populate: {
                    path:'attendances',
                    select: {timein : 1, timeout: 1},
                    option: {sort:{timein:"ascending"}}
                }
            }
        )
        .then(event => {
    
          if(!event){
               return next(new ErrorResponse(`Event not found with event id of ${req.params.id}`, 404));
            }
            const data = [];
            const excelFile = `${event.eventname}_${dateFormat(new Date(event.startdate),'yyyy-mm-dd HH:mm:ss')}.xlsx`
            console.log(excelFile);
              event.members.forEach(element => {
                  element.attendances.forEach((attend) => {
                     data.push({"name": element.name, 
                     "timein":attend.timein,
                      "timeout":attend.timeout})
                  })
                  
              });
              ws.columns = [
                { header: "Name", key: "name", width: 5 },
                { header: "Time In", key: "timein", width: 25 },
                { header: "Time Out", key: "timeout", width: 25 }
            ];
            ws.addRows(data);
                   res.setHeader(
                    "Content-Type",
                    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                );
                res.setHeader(
                    "Content-Disposition",
                    "attachment; filename=" +  excelFile
                );
              
                return wb.xlsx.write(res).then(() => {
                            res.status(200).end();
                        });  
        });

}
//@Desc    Create an events
//@route   post /api/events
//@access  public 
exports.postEvent = asyncHandler( async (req, res, next) =>{
       const event = await Event.create(req.body);
        res.status(201).json({ 
            success: true,
            data: event });
});

//@Desc    UPDATE an event
//@route   PUT /api/events
//@access  public 
exports.updateEvent =asyncHandler( async (req, res, next) =>{

    const event = await Event.findByIdAndUpdate(req.body._id, req.body,{
        new:true,
        runValidators: true
    });
    if(!event){
        return next(new ErrorResponse(`Event not found with event id of ${req.params.id}`, 404));
    }
    res.status(200).json({ success: true, data: event });
  
   
});

//@Desc    DELETE an event
//@route   DELETE /api/events
//@access  public 
exports.deleteEvent =asyncHandler( async (req, res, next) =>{
        const event = await Event.findByIdAndDelete(req.body._id);
        if(!event){
            return next(new ErrorResponse(`Event not found with event id of ${req.body._id}`, 404));
        }
        res.status(200).json({ success: true, data: {} });
});

//@Desc    GET an event name with date start and date end
//@route   gett /api/events/search?name=&datestart&searchDateEnd
//@access  public 
exports.getEventsByNameAndDate =async (req, res, next) =>{
    const event = await Event.find( {
        eventname: req.query.name,
        startdate:req.query.datestart,
        enddate:req.query.dateend   });
        if(!event){
            return next(new ErrorResponse(`Event not found with event name of ${req.query}`, 404));
        }
    res.status(200).json({ success: true, data: event });
}



