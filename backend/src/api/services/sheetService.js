// /backend/src/api/services/sheetService.js
const Sheet = require('../models/Sheet');
const Subject = require('../models/Subject');
const { CustomError } = require('../../utils/errorHandlers');
const { createDefaultSubject } = require('../../utils/subjectUtils');
const { extractDataFromSheet } = require('../../utils/sheetUtils');
const path = require('path');
const logger = require('../../utils/logger');

exports.createSheet = async (sheetData) => {
  try {
    await createDefaultSubject();
    const subject = await getOrCreateSubject(sheetData.subject);
    const extractedData = await extractDataFromSheet(sheetData.fileUrl);
    
    const newSheet = new Sheet({
      ...sheetData,
      subject: subject._id,
      sections: extractedData.sections,
    });

    const sheet = await newSheet.save();
    logger.info('New sheet created', { sheetId: sheet._id });
    return sheet;
  } catch (error) {
    logger.error('Error creating sheet', { error: error.message });
    throw new CustomError('Failed to create sheet', 500);
  }
};

exports.getAllSheets = async () => {
  try {
    return await Sheet.find().populate('subject');
  } catch (error) {
    logger.error('Error fetching sheets', { error: error.message });
    throw new CustomError('Failed to fetch sheets', 500);
  }
};

exports.updateSheet = async (id, updateData) => {
  try {
    const sheet = await Sheet.findByIdAndUpdate(id, updateData, { new: true });
    if (!sheet) {
      throw new CustomError('Sheet not found', 404);
    }
    logger.info('Sheet updated', { sheetId: id });
    return sheet;
  } catch (error) {
    logger.error('Error updating sheet', { sheetId: id, error: error.message });
    throw error;
  }
};

exports.deleteSheet = async (id) => {
  try {
    const sheet = await Sheet.findByIdAndDelete(id);
    if (!sheet) {
      throw new CustomError('Sheet not found', 404);
    }
    logger.info('Sheet deleted', { sheetId: id });
  } catch (error) {
    logger.error('Error deleting sheet', { sheetId: id, error: error.message });
    throw error;
  }
};

exports.getSheetFilePath = async (id) => {
  try {
    const sheet = await Sheet.findById(id);
    if (!sheet) {
      throw new CustomError('Sheet not found', 404);
    }
    return path.join(__dirname, `../../../uploads/${sheet.fileUrl.split('/uploads/')[1]}`);
  } catch (error) {
    logger.error('Error getting sheet file path', { sheetId: id, error: error.message });
    throw error;
  }
};

async function getOrCreateSubject(subjectData) {
  let subject = await Subject.findById(subjectData);
  if (!subject) {
    subject = await Subject.findOne({ name: subjectData });
    if (!subject) {
      subject = new Subject({ name: subjectData });
      await subject.save();
    }
  }
  return subject;
}