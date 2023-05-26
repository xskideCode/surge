import { Schema, model, models } from "mongoose";

const ContactUsSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Username is required!'],
  },
  email: {
    type: String,
    required: [true, 'Email is required!'],
  },
  message: {
    type: String,
    required: [true, 'Message is required!'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },

});

const ContactUs = models.ContactUs || model("ContactUs", ContactUsSchema);

export default ContactUs;