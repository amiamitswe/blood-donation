import { Date } from "mongoose";

interface IError { status: number, message: string; }
interface IDonar {
  [x: string]: any;
  name: string,
  blood: string,
  mobile: string;
  email: string;
  dob?: Date;
  createAt?: Date;
  lastDonation?: Date;
  status?: ["active", "inactive"],
  aboutMe: string;
  address: string;
  disease: [
    string
  ],
  medicines: [
    string
  ],
  location: {
    lon: number;
    lat: number;
  };
}

interface ISIgnUp {
  createAt?: Date;
  updateAt?: Date;
  email: string;
  password: string;
  username: string;
  role?: ['admin', 'superAdmin', 'user'];
}

interface ILogOutToken { expireToken: string; expireAt: Date; }


export { IError, IDonar, ISIgnUp, ILogOutToken };