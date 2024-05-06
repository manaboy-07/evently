import { Document, Schema, model, models } from "mongoose";
//we alwys want to know properties model have ts come in play
export interface IEvent extends Document {
  _id: string;
  title: string;
  desciption?: string;
  location?: string;
  createdAt: Date;
  imageUrl: string;
  startDateTime: Date;
  endDateTime: Date;
  isFree: boolean;
  price: string;
  url?: string;
  category: { _id: string; name: string };
  organizer: { _id: string; firstName: string; lastName: string };
}

const EventSchema = new Schema({
  title: { type: String, required: true },
  description: {
    type: String,
  },
  location: { type: String },
  createdAt: { type: Date, default: Date.now },
  imageUrl: {
    type: String,
    required: true,
  },
  startDatetime: {
    type: Date,
    required: true,
    default: Date.now,
  },
  endDateTime: {
    type: Date,
    required: true,
    default: Date.now,
  },
  price: { type: String },
  isFree: { type: Boolean, default: false },
  url: { type: String },
  category: { type: Schema.Types.ObjectId, ref: "Category" }, //ref another model
  organizer: { type: Schema.Types.ObjectId, ref: "User" }, //ref another model
});
const Event = models.Event || model("Event", EventSchema);
export default Event;
