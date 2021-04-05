const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MemberSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is Required'],
        trim:true,
        maxlength: [100 ,'Name name cannot be more than 100 character']
    },
    joinedate: {
        type: Date
    },
    status: {
        type: String,
        required: [true, 'Status is Required'],
        maxlength: [10 ,'Status name cannot be more than 10 character']
    },
   event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event"
   },
   attendances: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Attendance"
   }]
})

const Member = mongoose.model("Member", MemberSchema);
module.exports = Member;