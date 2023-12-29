import Applicant from '../models/Applicant.js';
import { connectToMySQL } from '../utils/db.js'

const db = connectToMySQL()

export const getApplicants = async (req, res, next) => {
    try {
        const applicants = await Applicant.findAll(); // same as 'SELECT * FROM applicants'
        res.json(applicants);
    } catch (error) {
        console.error('Error fetching applicants:', error);
        res.status(500).json({ error: 'Error fetching applicants' });
    }
};


export const getApplicantByUserId = async (req, res, next) => {
    try {
      const userId = req.params.userId; // Extract the userId from request parameters
      const applicant = await Applicant.findAll({ where: {userId: userId}}); //same as 'SELECT * FROM applicants WHERE userId = ?'
  
      if (!applicant) {
        return res.status(404).json({ error: 'Applicant not found' });
      }
  
      res.json(applicant);
    } catch (error) {
      console.error('Error fetching applicant by User ID:', error);
      res.status(500).json({ error: 'Error fetching applicant by User ID' });
    }
  };


export const createApplicant = async (req, res, next) => {
    try {
        const applicant = req.body
        await Applicant.create(applicant)
        res.json("New applicant added successfully")
    } catch (error) {
        console.error('Error creating applicant', error)
        res.status(500).json("Error creating applicant")
    }
}


export const updateApplicant = async (req, res, next) => {
    try {
        const applicantId = req.params.id;
        const {
            firstName,
            middleName,
            lastName,
            birthMonth,
            birthDay,
            birthYear,
            age,
            civilStatus,
            sex,
            contact,
            email,
            altEmail,
            homeAddress,
            highestEducationalAttainment,
            lastSchoolAttended,
            bpoExpYears,
            bpoExpPosition,
            endorsementDate,
            interviewTime,
            clientCompany,
            clientCompanySite,
            applicantStatus,
            agencyRemarks,
            clientCompanyRemarks,
            resume,
            userId
        } = req.body;

        // Find the applicant by ID
        const applicant = await Applicant.findByPk(applicantId);

        if (!applicant) {
            return res.status(404).json({ error: 'Applicant not found' });
        }

        // Update applicant attributes
        applicant.firstName = firstName;
        applicant.middleName = middleName;
        applicant.lastName = lastName;
        applicant.birthMonth = birthMonth;
        applicant.birthDay = birthDay;
        applicant.birthYear = birthYear;
        applicant.age = age;
        applicant.civilStatus = civilStatus;
        applicant.sex = sex;
        applicant.contact = contact;
        applicant.email = email;
        applicant.altEmail = altEmail;
        applicant.homeAddress = homeAddress;
        applicant.highestEducationalAttainment = highestEducationalAttainment;
        applicant.lastSchoolAttended = lastSchoolAttended;
        applicant.bpoExpYears = bpoExpYears;
        applicant.bpoExpPosition = bpoExpPosition;
        applicant.endorsementDate = endorsementDate;
        applicant.interviewTime = interviewTime;
        applicant.clientCompany = clientCompany;
        applicant.clientCompanySite = clientCompanySite;
        applicant.applicantStatus = applicantStatus;
        applicant.agencyRemarks = agencyRemarks;
        applicant.clientCompanyRemarks = clientCompanyRemarks;
        applicant.resume = resume;        
        applicant.userId = userId;

        // Save the updated applicant to the database
        await applicant.save();

        res.json({ message: 'Applicant updated successfully' });
    } catch (error) {
        console.error('Error updating applicant', error);
        res.status(500).json({ error: 'Error updating applicant' });
    }
};


export const deleteApplicant = async (req, res, next) => {
    try {
      const applicantId = req.params.id;
  
      // Find the applicant by ID
      const applicant = await Applicant.findByPk(applicantId);
  
      if (!applicant) {
        return res.status(404).json({ error: 'Applicant not found' });
      }
  
      // Delete the applicant
      await applicant.destroy();
  
      res.json({ message: 'Applicant deleted successfully' });
    } catch (error) {
      console.error('Error deleting applicant', error);
      res.status(500).json({ error: 'Error deleting applicant' });
    }
  };

