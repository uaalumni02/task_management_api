import mongoose from "mongoose";
const { Schema } = mongoose;

// import isValidTask from "../helpers/model/task";

const TaskInformationSchema = mongoose.Schema({
  userName: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  dueDate: {
    type: Number,
    required: true,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
  },
  //---priority will be yes or no
  priority: {
    type: String,
    required: [true, "priority is required"]
  },
  __v: {
    type: Number,
    select: false,
  },
});

export default mongoose.model("Task", TaskInformationSchema);