const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const quotes = require('./quotes.json');

const app = express();

app.use(cors());

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 5,
  message: { error: "Too many requests. Please try again later." }
});
app.use(limiter);

app.get('/', (req, res) => {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const { type, ...quote } = quotes[randomIndex];
  res.json(quote);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
