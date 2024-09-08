import mongoose from "mongoose";
const { Schema } = mongoose;

const projectInformationSchema = Schema({
  projectName: {
    type: String,
    required: [true, "project is required"]
  },
  __v: {
    type: Number,
    select: false,
  },
});

export default mongoose.model("Project", projectInformationSchema);