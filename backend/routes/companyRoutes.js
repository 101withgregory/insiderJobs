import express from 'express';
import { changeJobApplicationStatus, changeVisibility, getCompanyData, getCompanyJobApplicants, getCompanyPostedJobs, loginCompany, postJob, registerCompany } from '../controllers/companyController.js';
import upload from '../config/multer.js';
import { protectCompany } from '../middlewares/authMiddleware.js';
const router = express.Router();

//register a company
router.post('/register',upload.single
    ('image'), registerCompany);

//company login
router.post('/login', loginCompany)

//get company data
router.get('/company',protectCompany, getCompanyData)

//post a job
router.post('/post-job',protectCompany, postJob)

//get applicatns data of a company
router.get('/applicants',protectCompany, getCompanyJobApplicants)

router.get('/list-jobs',protectCompany,getCompanyPostedJobs)


router.post('/change-status',protectCompany, changeJobApplicationStatus)

router.post('/change-visibility',protectCompany,changeVisibility)

export default router;