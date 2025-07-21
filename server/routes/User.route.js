import express from 'express'
import { validateUserDetails } from "../middlewares/User.validator.js";
import 
{
getUsersByTeam,
createUserInTeam,
updateUserInTeam,
deleteUserInTeam,
searchUsersInTeam
} from '../controllers/User.controller.js'

const router=express.Router()


router.get('/:teamId/users', getUsersByTeam);
router.post('/:teamId/users',validateUserDetails, createUserInTeam);
router.put('/:teamId/users/:userId',validateUserDetails,updateUserInTeam);
router.delete('/:teamId/users/:userId', deleteUserInTeam);
router.get('/:teamId/users/search', searchUsersInTeam);

export default router