import mongoose from 'mongoose';
import 'dotenv/config';

try {
  mongoose.connect(process.env.ATLAS_URI, { useNewUrlParser: true });
  mongoose.connection.once('open', () => {
    console.log('MongoDB is Connected');
  });
} catch (error) {
  console.error('mongoDB error');
  console.log(error);
}
