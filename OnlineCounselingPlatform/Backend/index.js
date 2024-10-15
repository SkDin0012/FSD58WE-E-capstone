const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');
const sessionNoteRoutes = require('./routes/sessionNoteRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const counselorRoutes = require('./routes/counselorRoutes');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express(); 
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

// app.use(cors({
//   origin: 'http://localhost:3000', 
//   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
//   allowedHeaders: ['Content-Type', 'Authorization'],
//   credentials: true 
// }));

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//       cb(null, 'uploads/'); 
//   },
//   filename: (req, file, cb) => {
//       cb(null, Date.now() + '-' + file.originalname);
//   }
// });

// const upload = multer({ storage });

// app.use(cors());

// app.post('/upload', upload.array('attachments'), (req, res) => {
//   try {
//       const { note, counselor } = req.body;
//       console.log('Note:', note);
//       console.log('Counselor:', counselor);
//       console.log('Files:', req.files);

//       res.status(200).json({ message: 'Session note and attachments uploaded successfully' });
//   } catch (error) {
//       console.error('Upload error:', error);
//       res.status(500).json({ message: 'Failed to upload session note and attachments' });
//   }
// });




app.use('/api/users', userRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/session-notes', sessionNoteRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/counselors', counselorRoutes);

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));
const PORT = process.env.PORT || 5111;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
