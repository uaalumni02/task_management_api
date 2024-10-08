import mongoose from "mongoose";
const { Schema } = mongoose;

// import isValidTask from "../helpers/model/task";

const TaskInformationSchema = mongoose.Schema({
  task: {
    type: String,
    required: [true, "task is required"],
  },
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
  priority: {
    type: Schema.Types.ObjectId,
    ref: "Priority",
  },
  status: {
    type: Schema.Types.ObjectId,
    ref: "Status",
  },
  __v: {
    type: Number,
    select: false,
  },
});

export default mongoose.model("Task", TaskInformationSchema);
