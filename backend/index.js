let express = require('express');
let mongoose = require('mongoose');
let cors = require('cors');
let enquiryRoutes = require('./App/routes/web/enquiryRoutes');
require('dotenv').config();

let app = express();
app.use(cors())
app.use(express.json());

// Routes
app.use('/api/webside/enquiry', enquiryRoutes);

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB successfully');
    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server is running on port ${process.env.PORT || 8000}`);
    });
  })
  .catch(err => {
    console.error('Error connecting to MongoDB:', err);
  });
