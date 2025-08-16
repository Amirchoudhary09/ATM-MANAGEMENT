const express = require("express");
const router = express.Router();
const enquiryController = require("../controllers/enquiry.controller");

router.post("/enquiry-insert", enquiryController.insertEnquiry);
router.get("/enquiry-list", enquiryController.getAllEnquiries);
router.delete("/enquiry-delete/:id", enquiryController.deleteEnquiry);
router.put("/enquiry-update/:id", enquiryController.updateEnquiry);

module.exports = router;
