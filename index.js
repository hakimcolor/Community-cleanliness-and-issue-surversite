const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Server is running fine....');
});

// MongoDB URI
const uri =
  'mongodb+srv://3Dmodel:RqJJiTWf1DjUFl5B@cluster0.wcellxl.mongodb.net/?appName=Cluster0';

// MongoClient setup
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // ✅ Connect once only
    await client.connect();

    const db = client.db('CommunityCln');
    const issuesCollection = db.collection('AllIssue');
    const contributionsCollection = db.collection('mycontribute');
    const myissues = db.collection('myissues');
    console.log('✅ MongoDB Connected Successfully!');
// get on my isues
    app.get('/allmyissues', async(req, res) => {
   const result = await myissues.find().toArray();
        res.send(result);
})

// post form add issue
    app.post('/myissue', async (req, res) => {
      const issues = req.body;
      const result = await myissues.insertOne(issues);
      result.send(result);
    });
    // ✅ POST: Save contribution
    app.post('/contributions', async (req, res) => {
      try {
        const contribution = req.body;
        console.log('Received Contribution:', contribution);
        const result = await contributionsCollection.insertOne(contribution);
        res.status(201).send(result);
      } catch (error) {
        res.status(500).send({ message: 'Failed to save contribution' });
      }
    });

    // ✅ GET all contributions
    app.get('/contrbutessssssssssss', async (req, res) => {
      try {
        const result = await contributionsCollection.find().toArray();
        res.send(result);
      } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Failed to fetch contributions' });
      }
    });

    // ✅ GET all issues
    app.get('/issue', async (req, res) => {
      try {
        const result = await issuesCollection.find().toArray();
        res.json(result);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
      }
    });

    // ✅ GET single issue by id
    app.get('/issue/:id', async (req, res) => {
      try {
        const id = req.params.id;
        const issue = await issuesCollection.findOne({ _id: new ObjectId(id) });

        if (!issue) {
          return res.status(404).json({ message: 'Issue not found' });
        }

        res.json(issue);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
      }
    });

    // ✅ Check MongoDB connection
    await db.command({ ping: 1 });
    console.log('Pinged MongoDB. Connection active!');
  } catch (err) {
    console.error('❌ MongoDB connection failed:', err);
  }
}

run().catch(console.dir);

// Start Server
app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});
