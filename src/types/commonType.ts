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


export { IError, IDonar };