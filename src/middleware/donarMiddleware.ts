import { Request, RequestHandler, Response } from 'express';

const bloodGroup = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];

// add new donar from validation middleware
export const addDonarMiddleware = (req: Request, res: Response, next: any) => {
  const reqData = req.body;
  const name = typeof reqData.name === 'string' && reqData.name.trim().length > 2 ? reqData.name : false;
  const blood = typeof reqData.blood === 'string' && bloodGroup.indexOf(reqData.blood) > -1 ? reqData.blood : false;
  const mobile = typeof reqData.mobile === 'string' && reqData.mobile.trim().length === 11 ? reqData.mobile : false;
  const email = typeof reqData.email === 'string' && reqData.email.trim().length > 2 ? reqData.email : false;
  const aboutMe = typeof reqData.aboutMe === 'string' && reqData.aboutMe.trim().length > 2 ? reqData.aboutMe : false;
  const address = typeof reqData.address === 'string' && reqData.address.trim().length > 2 ? reqData.address : false;
  const status = typeof reqData.status === 'string' && ['active', 'inactive'].indexOf(reqData.status) > -1 ? reqData.status : false;

  if (name && blood && mobile && email && aboutMe && status && address) {
    next();
  }
  else {
    const errorMessage: any = {};
    if (!name) errorMessage.name = 'Name is required';
    if (!blood) errorMessage.blood = 'Blood is required';
    if (!mobile) errorMessage.mobile = 'Mobile is required and must be 11 digit';
    if (!email) errorMessage.email = 'Email is required';
    if (!aboutMe) errorMessage.aboutMe = 'AboutMe is required';
    if (!address) errorMessage.aboutMe = 'Address is required';
    if (!status) errorMessage.status = "Status should be 'active' or 'inactive'";

    res.status(400).json({ message: errorMessage });
  }
};

export const donarDetailsMiddleware: RequestHandler = (req, res, next) => {
  const donarId = typeof req.params.donar === 'string' && req.params.donar.length === 24 ? req.params.donar : false;

  if (donarId) next();
  else res.status(400).json({ message: 'invalid donar id' });
};