const mongoose = require('mongoose');
const DB = process.env.DATABASE || 'mongodb://localhost:27017/TournaTrack';
mongoose.set("strictQuery", false);


mongoose.connect(DB)
.then(() => {
    console.log("I am here");
})
.catch((error) => {
    console.log(error);
})