const express = require('express');
const cors = require('cors');
require('dotenv').config(); // no-op on Vercel, but needed for local dev

const connectDB = require('./config/db');
const issueRoutes = require('./routes/issues');
const myIssueRoutes = require('./routes/myIssues');
const contributionRoutes = require('./routes/contributions');

const app = express();

app.use(cors());
app.use(express.json());

// connect to DB before every request (cached — only connects once per container)
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    console.error('DB connection error:', err.message);
    res
      .status(500)
      .json({ message: 'Database connection failed', error: err.message });
  }
});

// health check
app.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

// routes
app.use(issueRoutes);
app.use(myIssueRoutes);
app.use(contributionRoutes);

// global error handler
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err.message);
  res
    .status(500)
    .json({ message: 'Internal server error', error: err.message });
});

// local dev only — Vercel invokes the exported app directly, doesn't need listen()
if (process.env.NODE_ENV !== 'production') {
  const port = process.env.PORT || 3000;
  app.listen(port, () => console.log(`Server running on port ${port}`));
}

// Vercel needs this export
module.exports = app;
