import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import { donarSchemas } from '../schemas/donarSchemas';
import { IDonar } from '../types/commonType';

const DonarModel: any = mongoose.model<IDonar>("Donar", donarSchemas);

export const saveDonarHandler = async (req: Request, res: Response, next: any) => {

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