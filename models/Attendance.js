const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AttendanceSchema = new Schema({
    event: {
       type: mongoose.Schema.Types.ObjectId,
       ref: "Event"
    },
    members: {
       type: mongoose.Schema.Types.ObjectId,
       ref: "Member"
    },
    timein: {
        type: Date,
        required: [true, 'Time in is Required']
    },
    timeout: {
        type: Date
    }
 });

 AttendanceSchema.pre('validate', function (next) {
     if(!this.timeout==="undefined"){
            if(this.timein > this.timeout){
                next(new Error('Time in must not be less than Time out'));
            } else { 
            next(); 
        }
     }else {
         console.log('rigger')
         next();
     }
})
 const Attendance = mongoose.model("Attendance", AttendanceSchema);

 
module.exports = Attendance;
 