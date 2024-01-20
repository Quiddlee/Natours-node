import mongoose from 'mongoose';

interface ITour extends mongoose.Document {
  name: string;
  rating: number;
  price: number;
}

const toursSchema = new mongoose.Schema<ITour>({
  name: {
    type: String,
    required: [true, 'A tour must have a name'],
    unique: true,
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  price: {
    type: Number,
    required: [true, 'A tour must have a price'],
  },
});

const Tour = mongoose.model<ITour>('Tour', toursSchema);

export default Tour;
