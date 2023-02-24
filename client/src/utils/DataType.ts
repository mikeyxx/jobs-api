export interface User {
  name: string;
  email: string;
  password: string;
}

export interface Job {
  _id: string;
  company: string;
  position: string;
  salary: string;
  jobType: string;
  status: string;
  createdBy: string;
  createAt: string;
}

export const jobTypeValues = ["Intern", "Full-Time", "Contract"];
export const jobStatusValues = ["Pending", "Interview", "Rejected", "Closed"];
