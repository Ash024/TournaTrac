const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config({ path: './config.env' });

require('./database/connection');
app.use(express.json());
app.use(cors());
app.use(require('./router/auth'));
app.use((req, res) => {
    res.status(404).json({ error: "Endpoint not found" });
});

const port = process.env.PORT || 5000;

const middleware = (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) {
        res.send({ "error": "Authorization is required" });
    }
    const token = authorization.split(' ')[1];
    try {
        const { _id } = jwt.verify(token, bosbsonindbjdbjewjdnciwuuwbksslcskjbkssjbcwowincieeslcbclscnecnekrf);
        next();
    } catch (err) {
        res.send({ "error": "Token is invalid or expired" });
    }
};

app.post('/register', (req, res) => {
    res.send(`Hello signup world from server`);
});
app.post('/signin', (req, res) => {
    res.send(`Hello signin world from server`);
});
app.get('/', (req, res) => {
    res.send(`Hello world from server on homepage`);
});
app.get('/create', middleware, (req, res) => {
    res.send(`Hello world from server on create tournament`);
});
app.get('/player/:id', middleware, (req, res) => {
    res.send(`Hello world from server on player register`);
});
app.listen(port, () => {
    console.log(`Server is running at port ${port}`);
});
