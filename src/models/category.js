import mongoose from "mongoose";
const { Schema } = mongoose;

const categoryInformationSchema = Schema({
  categoryName: {
    type: String,
    required: [true, "category is required"]
  },
  __v: {
    type: Number,
    select: false,
  },
});

export default mongoose.model("Category", categoryInformationSchema);