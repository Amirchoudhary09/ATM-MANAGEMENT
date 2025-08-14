const express = require('express');
const enquiryController = require('../../controllers/web/enquirycontroller');

const enquiryRoutes = express.Router();

enquiryRoutes.post('/insert', enquiryController.enquiryInsert);

module.exports = enquiryRoutes;
