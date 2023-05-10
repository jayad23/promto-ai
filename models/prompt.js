import mongoose, { Schema, model, models } from "mongoose";

const PromptsSchema = new Schema({
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  prompt: {
    type: String,
    required: [true, "Prompt is required"],
  },
  tag: {
    type: String,
    required: [true, "Tag is required"],
  },
});

const Prompt = models.Prompts || model("Prompts", PromptsSchema);

export default Prompt;
