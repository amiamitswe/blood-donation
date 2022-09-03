import express, { Request, Response, RequestHandler } from 'express';
import mongoose from 'mongoose';
import { checkIsEligible } from '../helper/helper';
import { donarSchemas } from '../schemas/donarSchemas';
import { IDonar } from '../types/commonType';

// create donar modal
const DonarModel: any = mongoose.model<IDonar>("Donar", donarSchemas);

// save new donar
export const saveDonarHandler: RequestHandler = async (req, res, next) => {
  try {
    const checkIsAlreadyThere = await DonarModel.find({ mobile: req.body.mobile });

    if (checkIsAlreadyThere && checkIsAlreadyThere?.length > 0) {
      res.status(400).json({
        error: "Donar is already there !!!",
      });
    }
    else {
      const newDonar = new DonarModel(req.body);
      const result = await newDonar.save();
      res.status(200).json({
        message: "Donar inserted successfully !!!",
        result
      });
    }
  }
  catch (err) {
    res.status(500).json({
      error: "There was a server side error !!!",
      err
    });
  }
};

// get all donar
export const showAllDonarHandler: RequestHandler = async (req, res, next) => {
  try {
    const getAllDonar = await DonarModel.find({}, "name blood status address lastDonation");

    if (getAllDonar && getAllDonar.length > 0) {
      const finalAllDonar = getAllDonar?.map((donarData: IDonar) => {
        const donar = donarData.toJSON();
        return { ...donar, isEligible: checkIsEligible(donar.lastDonation) };
      });

      res.status(200).json({
        message: "Donares fetch successful",
        donarCount: finalAllDonar.length,
        donares: finalAllDonar
      });
    }
    else {
      res.status(200).json({
        message: "No donar available",
      });
    }
  }
  catch (err) {
    res.status(500).json({
      error: "There was a server side error !!!",
      err
    });
  }
};

// get donar details
export const showDonarDetailsHandler: RequestHandler = async (req, res, next) => {
  try {
    // // // comment --- start
    const allDonar = await DonarModel.find({});
    const isDonarIdExist = allDonar.findIndex((donar: IDonar) => donar._id.toString() === req.params.donar);
    if (isDonarIdExist > -1) {
      // // // comment --- end

      const getDonarDetails = await DonarModel.findById(req.params.donar).select({ __v: 0 });
      const donarDetails = getDonarDetails.toJSON();
      // @ts-ignore
      const finalDonarDetails = { ...donarDetails, isEligible: checkIsEligible(donarDetails.lastDonation) };

      if (getDonarDetails) {
        res.status(200).json({ message: 'donar fetch success', donar: finalDonarDetails });
      }
      else {
        res.status(200).json({
          error: "No donar found",
        });
      }
    }
    // // // comment --- start
    else {
      res.status(200).json({
        error: "No donar found",
      });
    }
  }
  // // // comment --- end

  // // error throw for "e,a,d,f,c,b" with last digit "631259a1e4f76b2d61c10ccb"
  catch (err) {
    res.status(500).json({
      error: "There are server error !!!!",
      err
    });
  }
};