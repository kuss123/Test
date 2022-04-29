import mongoose from 'mongoose';

const connectDB = () => {
  const connection = mongoose
    .connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((ok) => {
      console.log(`MongoDB Connected`);
    })
    .catch((err) => {
      console.log(err);
    });
};
export default connectDB;
