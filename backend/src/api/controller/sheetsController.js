// /backend/src/api/controllers/sheetsController.js
const sheetService = require('../services/sheetService');
const { handleError } = require('../../utils/errorHandlers');
const logger = require('../../utils/logger');

exports.createSheet = async (req, res) => {
  try {
    const sheetData = {
      ...req.body,
      fileUrl: `/uploads/${req.file.filename}`,
    };
    const sheet = await sheetService.createSheet(sheetData);
    res.status(201).json(sheet);
  } catch (error) {
    handleError(error, res);
  }
};

exports.getAllSheets = async (req, res) => {
  try {
    const sheets = await sheetService.getAllSheets();
    res.json(sheets);
  } catch (error) {
    handleError(error, res);
  }
};

exports.updateSheet = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedSheet = await sheetService.updateSheet(id, req.body);
    res.json(updatedSheet);
  } catch (error) {
    handleError(error, res);
  }
};

exports.deleteSheet = async (req, res) => {
  try {
    const { id } = req.params;
    await sheetService.deleteSheet(id);
    res.json({ msg: 'Sheet removed' });
  } catch (error) {
    handleError(error, res);
  }
};

exports.downloadSheet = async (req, res) => {
  try {
    const { id } = req.params;
    const filePath = await sheetService.getSheetFilePath(id);
    res.download(filePath);
  } catch (error) {
    handleError(error, res);
  }
};