export interface InputsTypes {
  id?: string;
  reciever?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  city?: string;
  phoneNumber?: string;
  streetAddress?: string;
  state?: string;
  postal_code?: string;
  desired_jobs?: any;
  status?: string;
}

export interface InputsTypes2 {
  onsite?: string | number | readonly string[] | undefined;
  Remote?: string | number | readonly string[] | undefined;
  Hybrid?: string | number | readonly string[] | undefined;
  JobTitle?: string;
  Company?: string;
  WorkPlaceType?: string;
  JobLocation?: string;
  JobType?: string;
  Skills?: string;
  Benefits: string;
  Currency?: string;
  Minimum?: string;
  Maximum?: string;
  Duration?: string;
  RecieveApplicant: string;
  ApplicantCollection?: string;
  Description?: string;
}

// export interface jobs_info {
//   _id: string;
//   Job_Title: String;
//   Company_Name: String;
//   State: String;
//   Salary: String;
//   Job_Type: String;
//   Description: String;
//   Required_Expericence: String;
//   Job_Category: String;
//   Job_Location: String;
//   Date_Posted: String;
// }
export interface jobs_info {
  _id: string;
  onsite?: string | number | readonly string[] | undefined;
  Remote?: string | number | readonly string[] | undefined;
  Hybrid?: string | number | readonly string[] | undefined;
  JobTitle?: string;
  Company?: string;
  WorkPlaceType?: string;
  JobLocation?: string;
  JobType?: string;
  Skills?: string;
  Benefits: string;
  Currency?: string;
  Minimum?: string;
  Maximum?: string;
  Duration?: string;
  RecieveApplicant: string;
  ApplicantCollection?: string;
  Description?: string;
  Status?: string;
}
