import express from 'express'
import { validateCreateTeam , validateUpdateTeam} from '../middlewares/Team.validator.js';

import {
     getAllTeams,
     getTeamById,
     createTeam,   
     updateTeam,
     deleteTeam
 } from '../controllers/Team.controller.js';

const router=express.Router()


router.get('/', getAllTeams); // GET /api/teams

router.get('/:id', getTeamById); // GET /api/teams/:id
router.post('/', validateCreateTeam ,createTeam); // POST /api/teams

router.put('/:id', validateUpdateTeam ,updateTeam); // PUT /api/teams/:id

router.delete('/:id', deleteTeam); // DELETE /api/teams/:id



export default router
