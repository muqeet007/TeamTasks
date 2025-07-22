import express from 'express';
import {
  getTasksByTeam,
  createTaskInTeam,
  updateTaskInTeam,
  deleteTaskInTeam,
  searchTasksInTeam
} from '../controllers/Task.controller.js';
import { validateTaskDetails } from '../middlewares/Task.validator.js';

const router = express.Router();

router.get('/:teamId/tasks', getTasksByTeam);
router.post('/:teamId/tasks',validateTaskDetails, createTaskInTeam);
router.put('/:teamId/tasks/:taskId',validateTaskDetails, updateTaskInTeam);
router.delete('/:teamId/tasks/:taskId',validateTaskDetails, deleteTaskInTeam);
router.get('/:teamId/tasks/search', searchTasksInTeam); // optional filtering

export default router;
