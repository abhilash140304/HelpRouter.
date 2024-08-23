const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = process.env.PORT || 5000;

// In-memory store for user data
const users = {};

// Middleware
app.use(bodyParser.json());

// Register route
app.post('/register', async (req, res) => {
    const { username, email, phoneNumber, password } = req.body;

    if (!username || !email || !phoneNumber || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    if (users[email]) {
        return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save user data
    users[email] = {
        username,
        email,
        phoneNumber,
        password: hashedPassword,
    };

    res.status(201).json({ message: 'User registered successfully' });
});

// Login route
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    const user = users[email];
    if (!user) {
        return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT
    const token = jwt.sign({ email }, 'your_jwt_secret', { expiresIn: '1h' });

    res.json({ token });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
