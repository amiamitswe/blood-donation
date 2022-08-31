interface IError { status: number, message: string; }
interface IDonar {
  name: string,
  blood: string,
  mobile: string;
  email: string;
  createAt?: Date;
  lastDonation?: Date;
  status?: ["active", "inactive"],
  aboutMe: string;
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