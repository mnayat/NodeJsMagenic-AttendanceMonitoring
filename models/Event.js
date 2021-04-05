//@Desc    Event Schema for events
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EventSchema = new Schema({
   eventname: {
       type: String,
       required: [true, 'Event Name is Required'],
       trim:true,
       maxlength: [100 ,'Event name cannot be more than 100 character']
   },
   eventtype:{
    type: String,
    required: [true, 'Event Type is Required'],
    trim:true,
    maxlength: [100 ,'Event tye cannot be more than 100 character']
    },
    startdate:{
        type:Date,
        required: [true, ' Start Date is required']
    },
    enddate:{
        type:Date,
        required: [true, ' End Date is required']
    },
   members: [{ 
      type: mongoose.Schema.Types.ObjectId,
      ref: "Member"
   }]
});
EventSchema.pre('validate', function (next) {
    if(this.startdate > this.enddate){
        next(new Error('Start Date must not be less than End Date'));
    } else { 
    next(); 
}
})
const Event = mongoose.model("Event", EventSchema);
module.exports = Event;