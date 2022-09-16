import { Date, Schema } from "mongoose";

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
  district: string;
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
  role?: ['admin', 'user'];
  donarId?: Schema.Types.ObjectId;
  favoriteDonar?: [Schema.Types.ObjectId]
}

interface ILogOutToken { expireToken: string; expireAt: Date; }
interface IFotGotPassToken {userId: Schema.Types.ObjectId, token: string; createdAt: Date; }


export { IError, IDonar, ISIgnUp, ILogOutToken, IFotGotPassToken };