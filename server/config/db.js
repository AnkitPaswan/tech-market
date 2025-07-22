const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('DB connection successful!');
    } catch (error) {
        console.error('DB connection failed:', error);
        process.exit(1); // Exit the process with failure
    }
}
module.exports = connectDB;