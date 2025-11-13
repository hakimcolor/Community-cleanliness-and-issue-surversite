// const express = require('express');
// const cors = require('cors');
// const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

// const app = express();
// const port = 3000;

// app.use(cors());
// app.use(express.json());

// app.get('/', (req, res) => {
//   res.send('Server is running fine....');
// });

// // MongoDB URI
// const uri =
//   'mongodb+srv://3Dmodel:RqJJiTWf1DjUFl5B@cluster0.wcellxl.mongodb.net/?appName=Cluster0';

// // MongoClient setup
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   },
// });

// async function run() {
//   try {
//     // ✅ Connect once only
//     await client.connect();

//     const db = client.db('CommunityCln');
//     const issuesCollection = db.collection('AllIssue');
//     const contributionsCollection = db.collection('mycontribute');
//     const myissues = db.collection('myissues');
//     console.log('✅ MongoDB Connected Successfully!');
// // PUT: Update my issue by ID
//     app.put('/myissues/:id', async (req, res) => {
//       const id = req.params.id;
//       const updatedData = req.body;

//       try {
//         const result = await myissues.updateOne(
//           { _id: new ObjectId(id) },
//           { $set: updatedData }
//         );

//         if (result.modifiedCount === 0) {
//           return res.status(404).json({ message: 'Issue not found or data unchanged' });
//         }

//         res.json({ message: 'Issue updated successfully', result });
//       } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Failed to update issue' });
//       }
//     });

//     // DELETE: Delete my issue by ID
//     app.delete('/myissues/:id', async (req, res) => {
//       const id = req.params.id;

//       try {
//         const result = await myissues.deleteOne({ _id: new ObjectId(id) });

//         if (result.deletedCount === 0) {
//           return res.status(404).json({ message: 'Issue not found' });
//         }

//         res.json({ message: 'Issue deleted successfully' });
//       } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Failed to delete issue' });
//       }
//     });





//     // get on my isues
//     app.get('/allmyissues', async (req, res) => {
//       const result = await myissues.find().toArray();
//       res.send(result);
//     });
//     app.get('/allmyissues/:id', async (req, res) => {
//       const id = req.params.id;
//       const result = await myissues.findOne({ _id: new ObjectId(id) });
//       res.send(result);
//     });

    

//     // post form add issue222222
//     app.post('/myissue', async (req, res) => {
//       const issues = req.body;
//       const result = await myissues.insertOne(issues);
//       res.send(result);
//     });

//     app.post('/issue', async (req, res) => {
//       const issues = req.body;
//       const result = await issuesCollection.insertOne(issues);
//       res.send(result);
//     });

//     // ✅ POST: Save contribution
//     app.post('/contributions', async (req, res) => {
//       try {
//         const contribution = req.body;
//         console.log('Received Contribution:', contribution);
//         const result = await contributionsCollection.insertOne(contribution);
//         res.status(201).send(result);
//       } catch (error) {
//         res.status(500).send({ message: 'Failed to save contribution' });
//       }
//     });

//     // ✅ GET all contributions
//     app.get('/contrbutessssssssssss', async (req, res) => {
//       try {
//         const result = await contributionsCollection.find().toArray();
//         res.send(result);
//       } catch (error) {
//         console.error(error);
//         res.status(500).send({ message: 'Failed to fetch contributions' });
//       }
//     });

//     // ✅ GET all issues
//     app.get('/issue', async (req, res) => {
//       try {
//         const result = await issuesCollection.find().toArray();
//         res.json(result);
//       } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Server error' });
//       }
//     });

//     // ✅ GET single issue by id
//     app.get('/issue/:id', async (req, res) => {
//       try {
//         const id = req.params.id;
//         const issue = await issuesCollection.findOne({ _id: new ObjectId(id) });

//         if (!issue) {
//           return res.status(404).json({ message: 'Issue not found' });
//         }

//         res.json(issue);
//       } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Server error' });
//       }
//     });

//     // ✅ Check MongoDB connection
//     await db.command({ ping: 1 });
//     console.log('Pinged MongoDB. Connection active!');
//   } catch (err) {
//     console.error('❌ MongoDB connection failed:', err);
//   }
// }

// run().catch(console.dir);

// // Start Server
// app.listen(port, () => {
//   console.log(`🚀 Server running on port ${port}`);
// });
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
    await client.connect();

    const db = client.db('CommunityCln');
    const issuesCollection = db.collection('AllIssue');
    const myissues = db.collection('myissues');
    const contributionsCollection = db.collection('mycontribute');

    console.log('✅ MongoDB Connected Successfully!');

    // GET all my issues
    app.get('/allmyissues', async (req, res) => {
      const result = await myissues.find().toArray();
      res.send(result);
    });

    // GET single my issue by ID
    app.get('/allmyissues/:id', async (req, res) => {
      const id = req.params.id;
      const result = await myissues.findOne({ _id: new ObjectId(id) });
      res.send(result);
    });

    // POST: Add new issue
    app.post('/myissue', async (req, res) => {
      const issues = req.body;
      const result = await myissues.insertOne(issues);
      res.send(result);
    });

    // POST: Add issue to AllIssue
    app.post('/issue', async (req, res) => {
      const issues = req.body;
      const result = await issuesCollection.insertOne(issues);
      res.send(result);
    });

    // PUT: Update my issue by ID
    app.put('/myissues/:id', async (req, res) => {
      const id = req.params.id;
      const updatedData = req.body;

      try {
        const result = await myissues.updateOne(
          { _id: new ObjectId(id) },
          { $set: updatedData }
        );

        if (result.modifiedCount === 0) {
          return res
            .status(404)
            .json({ message: 'Issue not found or data unchanged' });
        }

        res.json({ message: 'Issue updated successfully', result });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to update issue' });
      }
    });

    // DELETE: Delete my issue by ID
    app.delete('/myissues/:id', async (req, res) => {
      const id = req.params.id;

      try {
        const result = await myissues.deleteOne({ _id: new ObjectId(id) });

        if (result.deletedCount === 0) {
          return res.status(404).json({ message: 'Issue not found' });
        }

        res.json({ message: 'Issue deleted successfully' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to delete issue' });
      }
    });

    // GET all contributions
    app.get('/contrbutessssssssssss', async (req, res) => {
      try {
        const result = await contributionsCollection.find().toArray();
        res.send(result);
      } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Failed to fetch contributions' });
      }
    });

    // POST: Save contribution
    app.post('/contributions', async (req, res) => {
      try {
        const contribution = req.body;
        const result = await contributionsCollection.insertOne(contribution);
        res.status(201).send(result);
      } catch (error) {
        res.status(500).send({ message: 'Failed to save contribution' });
      }
    });

    // GET all issues
    app.get('/issue', async (req, res) => {
      try {
        const result = await issuesCollection.find().toArray();
        res.json(result);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
      }
    });

    // GET single issue by id
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

    await db.command({ ping: 1 });
    console.log('Pinged MongoDB. Connection active!');
  } catch (err) {
    console.error('❌ MongoDB connection failed:', err);
  }
}

run().catch(console.dir);

app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});
