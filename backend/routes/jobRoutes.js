import express from 'express'
import { getJobById, getJobs } from '../controllers/jobController.js';

const router = express.Router();

//To get all jobs data 
router.get('/', getJobs)



// to get a single job by ID

router.get('/:id',getJobById)

export default router;