import mongoose from "mongoose";
const { Schema } = mongoose;

const statusInformationSchema = Schema({
  status: {
    type: String,
    required: [true, "status is required"],
  },
  __v: {
    type: Number,
    select: false,
  },
});

export default mongoose.model("Status", statusInformationSchema);
