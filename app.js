const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();

app.get('/api', (req, res) => res.json({ message: 'Welcome to API' }));

app.post('/api/post', verifyToken, (req, res) => {
	jwt.verify(req.token, 'secretKey', (err, authData) => {
		if (err) res.sendStatus(403);
		else res.json({ message: 'Post created...', authData });
	});
});

app.post('/api/login', (req, res) => {
	// Mock User
	const user = { id: 1, username: 'user', email: 'test@user.com' };
	jwt.sign({ user }, 'secretKey', { expiresIn: '30s' }, (err, token) => res.json({ token }));
});

// Verify Token
function verifyToken(req, res, next) {
	// Get auth header value
	const bearerHeader = req.headers['authorization'];
	console.log('bearerHeader: ', bearerHeader);
	// Check if bearer is undefined
	if (typeof bearerHeader !== 'undefined') {
		const bearer = bearerHeader.split(' ');
		// Get token from array
		const bearerToken = bearer[1];
		// Add token in request
		req.token = bearerToken;
		next();
	} else {
		// Forbidden
		res.sendStatus(403);
	}
}

app.listen(5000, () => console.log('Server listening on port 5000'));
