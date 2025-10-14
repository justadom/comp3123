const express = require('express');
const mongoose = require('mongoose');
const noteRoutes = require('./routes/NoteRoutes.js'); 

const DB_URL = process.env.DB_URL || "mongodb://localhost:27017/comp3095-mongodb";
const PORT = process.env.PORT || 8080;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send("<h1>Welcome to Note taking application - Week06 Exercise</h1>");
});

app.use('/', noteRoutes); 

mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log("✅ Successfully connected to MongoDB.");
    app.listen(PORT, () => {
        console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
})
.catch(err => {
    console.error("❌ Could not connect to MongoDB...", err);
    process.exit();
});
