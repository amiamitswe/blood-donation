import { Request, RequestHandler, Response } from 'express';
import mongoose from 'mongoose';
import { checkIsEligible } from '../helper/helper';
const ObjectId = require('mongoose').Types.ObjectId;

const bloodGroup = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];
const statusList = ['active', 'inactive'];

// add new donar from validation middleware
export const addDonarMiddleware = (req: Request, res: Response, next: any) => {
  const reqData = req.body;
  const name = typeof reqData.name === 'string' && reqData.name.trim().length > 2 ? reqData.name : false;
  const blood = typeof reqData.blood === 'string' && bloodGroup.indexOf(reqData.blood) > -1 ? reqData.blood : false;
  const mobile = typeof reqData.mobile === 'string' && reqData.mobile.trim().length === 11 ? reqData.mobile : false;
  const email = typeof reqData.email === 'string' && reqData.email.trim().length > 2 ? reqData.email : false;
  const dob = typeof reqData.dob === 'string' && checkIsEligible(reqData.dob, 6575) ? reqData.dob : false;
  const aboutMe = typeof reqData.aboutMe === 'string' && reqData.aboutMe.trim().length > 2 ? reqData.aboutMe : false;
  const address = typeof reqData.address === 'string' && reqData.address.trim().length > 2 ? reqData.address : false;
  const status = typeof reqData.status === 'string' && statusList.indexOf(reqData.status) > -1 ? reqData.status : false;

  if (name && blood && mobile && email && aboutMe && status && address && dob) {
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
    if (!dob) errorMessage.dob = 'Birth date is required and must be more or equal 18 years';
    if (!status) errorMessage.status = "Status should be 'active' or 'inactive'";

    res.status(400).json({ message: errorMessage });
  }
};

// get donar details check donar id middleware
export const donarDetailsMiddleware: RequestHandler = (req, res, next) => {
  const donarId = typeof req.params.donar === 'string' && req.params.donar.length === 24 && ObjectId.isValid(req.params.donar) ? req.params.donar : false;

  if (donarId && donarId?.match(/^[0-9a-fA-F]{24}$/)) next();
  else res.status(400).json({ message: 'invalid donar id' });
};

// update donar status check donar id and status middleware
export const updateDonarStatusMiddleware: RequestHandler = (req, res, next) => {
  const donarId = typeof req.body.donar === 'string' && req.body.donar.length === 24 && ObjectId.isValid(req.body.donar) ? req.body.donar : false;
  const status = typeof req.body.status === 'string' && statusList.indexOf(req.body.status) > -1 ? req.body.status : false;

  if (donarId && status) next();
  else res.status(400).json({ message: 'Field required' });
};

// update donar status check donar id and status middleware
export const updateDonarImageMiddleware: RequestHandler = (req, res, next) => {
  const donarId = typeof req.body.donar === 'string' && req.body.donar.length === 24 && ObjectId.isValid(req.body.donar) ? req.body.donar : false;
  const image = typeof req.body.image === 'string' ? req.body.image : false;

  if (donarId && image) next();
  else res.status(400).json({ message: 'Field required' });
};