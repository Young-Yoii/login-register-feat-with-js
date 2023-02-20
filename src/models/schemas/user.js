import { Schema } from 'mongoose';

const UserSchema = new Schema(
  {
    nickName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    avartarUrl: { type: String, required: false },
    naverId: { type: String, required: false },
    kakaoId: { type: String, required: false },
    // comments: [
    //   {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Comment',
    //   },
    // ],
    // images: [
    //   {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Image',
    //   },
    // ],
  },
  {
    collection: 'user',
    timestamps: true,
  }
);

export { UserSchema };
