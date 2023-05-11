
//The models contain all the schema files and their related validation functions.
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  username: String,
  password: { type: String, required: true },
  recipes: [{ type: mongoose.Types.ObjectId, ref: "recipes"}]
}, { timestamps: true });

  

const UserModel = mongoose.model("user", userSchema);

export default UserModel
