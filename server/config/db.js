import mongoose from 'mongoose';
 
export const connectDB = async () => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log('Connected to MongoDB successfully!');
    })
    .catch((error) => {
      console.log('Error:', error);
    });
};