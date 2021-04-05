const express = require ('express');
const {
    getAllMembers,
    getmembersByID,
    getmembersByStatus,
    postMember,
    updateMember,
    deleteMember
    
} = require('../controllers/memberController');

const router =express.Router();

router.route('/')
.get(getAllMembers)
.post(postMember)
.put(updateMember)
.delete(deleteMember);

router.route('/search')
.get(getmembersByStatus)



router.route('/:id')
.get(getmembersByID);

module.exports = router;