import express from 'express';
import { 
    getApplicants, 
    getApplicantByUserId, 
    createApplicant,
    updateApplicant,
    deleteApplicant,
} from '../controllers/applicant.controller.js';

const router = express.Router();

router.get('/', getApplicants)
router.get('/:userId', getApplicantByUserId)
router.post('/', createApplicant)
router.put('/:id', updateApplicant)
router.delete('/:id', deleteApplicant)

export default router