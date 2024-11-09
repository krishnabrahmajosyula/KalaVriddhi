const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Server } = require('http');

const app = express();
const port = 5001;


app.use(bodyParser.json());
app.use(cors());



mongoose.connect('mongodb+srv://KalaVriddhi:kalavriddhi_ug6@kalavriddhi.fg8vb.mongodb.net/featureRequests', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Failed to connect to MongoDB:', err));

const featureRequestSchema = new mongoose.Schema({
    title: String,
    description: String,
    category: String,
    rating: Number
});


const FeatureRequest = mongoose.model('FeatureRequest', featureRequestSchema);


app.post('/submit-feature', async (req, res) => {
    const { title, description, category, rating } = req.body;

    if (!title || !description || !category || rating == null) {
        return res.status(400).send({ message: 'Invalid Input' });
    }

    try {
        const newFeatureRequest = new FeatureRequest({ title, description, category, rating });
        await newFeatureRequest.save();
        res.status(200).send({ message: 'Feature Requested Successfully' });
    } catch (error) {
        res.status(500).send({ message: 'Error saving feature request' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
