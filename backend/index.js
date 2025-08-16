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

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected"))
.catch((err) => console.log("Error connecting to MongoDB:", err));

// Port bind for Render
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
