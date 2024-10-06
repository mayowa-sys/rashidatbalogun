require('dotenv').config();

const express = require('express');
const multer = require('multer'); // Middleware to handle form data
const cors = require('cors'); // Import CORS middleware
const upload = multer();
const app = express();
const nodemailer = require('nodemailer');

// Use CORS to allow requests from any origin
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Endpoint to handle contact form submissions
app.post('/contact', upload.none(), (req, res) => {
    const { name, email, message } = req.body;

    // Check if fields are being received correctly
    console.log(`Name: ${name}, Email: ${email}, Message: ${message}`);

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    // Set up mail options
    const mailOptions = {
        from: email,
        to: 'mabdurrahman.balogun@gmail.com',
        subject: `Contact Form Submission from ${name}`,
        text: message,
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            return res.status(500).json({ success: false });
        } else {
            console.log('Email sent: ' + info.response);
            return res.status(200).json({ success: true, redirectUrl: 'app.html' });
        }
    });
});

app.listen(3000, () => {
    console.log('Server started on http://localhost:3000');
});
