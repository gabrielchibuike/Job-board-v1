import mongoose from "mongoose";

const JobsFeed = new mongoose.Schema({
  JobTitle: { type: String, required: true },
  Company: { type: String, required: true },
  JobLocation: { type: String, required: true },
  JobType: { type: String, required: true },
  Description: { type: String, required: true },
  Skills: { type: [], required: true },
  WorkPlaceType: { type: String, required: true },
  Currency: { type: String, required: true },
  Maximum: { type: String, required: true },
  Minimum: { type: String, required: true },
  Duration: { type: String, required: true },
  Benefits: { type: [], required: true },
  RecieveApplicant: { type: String, required: true },
  date_added: { type: Date, default: Date.now() },
  visible: { type: Boolean, default: true },
});

const JobFeedTable = mongoose.model("jobsfeeds", JobsFeed);

export default JobFeedTable;
