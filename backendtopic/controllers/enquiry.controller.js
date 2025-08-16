const Enquiry = require("../models/enquiry.model");

// Insert enquiry
insertEnquiry = async (req, res) => {
    
        let{ sName, sEmail, sPhone, sMessage } = req.body;
        const existingEnquiry = await Enquiry.findOne({ email: sEmail });
        if (existingEnquiry) {
            return res.status(400).json({ status: 0, message: "Email already exists" });
        }
        let enquiry = new Enquiry({
            name,
            email,
            phone,
            message
            
        });

        enquiry.save().then(() => {
        res.status(201).json({ status: 1, message: "Enquiry saved successfully", data: enquiry });
    }).catch ((err) {
        res.status(500).json({ status: 0, message: "Error while saving enquiry", error: err.message });
    })
};

// Get all enquiries
getAllEnquiries = async (req, res) => {
    try {
        const enquiryList = await Enquiry.find();
        res.status(200).json({ status: 1, message: "Enquiry list", data: enquiryList });
    } catch (err) {
        res.status(500).json({ status: 0, message: "Error fetching enquiries", error: err.message });
    }
};


// Delete enquiry by ID
deleteEnquiry = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedEnquiry = await Enquiry.deleteOne({ _id: id });
        res.status(200).json({ status: 1, message: "Enquiry deleted successfully", delRes: deletedEnquiry });
    } catch (err) {
        res.status(500).json({ status: 0, message: "Error deleting enquiry", error: err.message });
    }
};

// Update enquiry by ID
updateEnquiry = async (req, res) => {
    try {
        const { id } = req.params;
        const { sName, sEmail, sPhone, sMessage } = req.body;

        const updateRes = await Enquiry.updateOne(
            { _id: id },
            { name: sName, email: sEmail, phone: sPhone, message: sMessage }
        );

        res.status(200).json({ status: 1, message: "Enquiry updated successfully", updateRes });
    } catch (err) {
        res.status(500).json({ status: 0, message: "Error updating enquiry", error: err.message });
    }
};
module.exports = {insertEnquiry, getAllEnquiries, deleteEnquiry, updateEnquiry};
