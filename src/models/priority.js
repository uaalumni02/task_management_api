import mongoose from "mongoose";
const { Schema } = mongoose;

const priorityInformationSchema = Schema({
  priority: {
    type: String,
    required: [true, "priority is required"]
  },
  __v: {
    type: Number,
    select: false,
  },
});

export default mongoose.model("Priority", priorityInformationSchema);