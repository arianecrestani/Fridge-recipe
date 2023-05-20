
//The models contain all the schema files and their related validation functions.
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  username: String,
  password: { type: String, required: true },
  recipes: [{ type: mongoose.Types.ObjectId, ref: "Recipe"}],
  avatar: { type: String, default:"https://res.cloudinary.com/dnerptkls/image/upload/v1683976399/user_avatars/placeholder_cuflo5.png"}
}, { timestamps: true });

const UserModel = mongoose.model("User", userSchema);

export default UserModel
