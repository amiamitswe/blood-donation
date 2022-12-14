import e, { RequestHandler } from 'express';
import mongoose, { Date, Schema } from 'mongoose';
import crypto from 'crypto';
import { compare, hash } from 'bcrypt';
import { expireTokenSchemas, forgotPassTokenSchema, userSchemas } from '../schemas/userSchemas';
import { IDonar, IFotGotPassToken, ILogOutToken, ISIgnUp } from '../types/commonType';
import jwt from 'jsonwebtoken';
import { checkIsEligible } from '../helper/helper';
import { donarSchemas } from '../schemas/donarSchemas';
import { signUpEmailTemplate } from '../utils/signUpEmailTemplate';
import { sendEmail } from '../utils/emailSend';

// create user model
const UserModel = mongoose.model<ISIgnUp>('User', userSchemas);
const DonarModel = mongoose.model<IDonar>('Donar', donarSchemas);
const ExpireTokenModel = mongoose.model<ILogOutToken>('Token', expireTokenSchemas);
const ForgotPassTokenModel = mongoose.model<IFotGotPassToken>(
  'ForgotPassToken',
  forgotPassTokenSchema
);

// signup functionality
export const signupHandler: RequestHandler = async (req, res, next) => {
  try {
    const checkIsUserExist = await UserModel.find({
      $or: [{ email: req.body.email.toLowerCase() }, { username: req.body.username.toLowerCase() }],
    });
    if (checkIsUserExist && checkIsUserExist.length > 0) {
      res.status(400).json({
        error: 'User Already exist',
      });
    } else {
      const hashedPassword = await hash(req.body.password, 10);

      const updateSignUpData: ISIgnUp = {
        username: req.body.username.toLowerCase(),
        email: req.body.email.toLowerCase(),
        password: hashedPassword,
      };

      const newUser = new UserModel(updateSignUpData);
      const result = await newUser.save();

      if (result) {
        signUpEmailTemplate(result?.email, result?.username, result?.createAt as Date);
        res.status(200).json({
          message: 'User inserted successfully !!!',
          data: {
            username: result.username,
            email: result.email,
            create: result.createAt,
          },
        });
      } else {
        res.status(500).json({
          error: 'There was a server side error !!!',
        });
      }
    }
  } catch (err) {
    res.status(500).json({
      error: 'There was a server side error !!!',
      err,
    });
  }
};

// login handler
export const loginHandler: RequestHandler = async (req, res, next) => {
  try {
    const loginUserInfo = await UserModel.find({
      $or: [
        { username: req.body.username.toLowerCase() },
        { email: req.body.username.toLowerCase() },
      ],
    });

    if (loginUserInfo && loginUserInfo.length === 1) {
      const loginUserData = loginUserInfo[0];
      const isValidPassword = await compare(req.body.password, loginUserData.password);

      if (isValidPassword) {
        // generate token for jwt
        const token = jwt.sign(
          {
            username: loginUserData.username,
            userId: loginUserData._id,
            userType: loginUserData.role,
          },
          process.env.JWT_SECRET as string,
          { expiresIn: '7d' }
        );
        res.status(200).json({ message: 'Login Success!!!', statusCode: 200, token });
      } else {
        res.status(401).json({ error: 'Authentication Failed', statusCode: 401 });
      }
    } else {
      res.status(401).json({ error: 'Authentication Failed', statusCode: 401 });
    }
  } catch {
    res.status(401).json({ error: 'Authentication Failed' });
  }
};

// logout handler
export const logoutHandler: RequestHandler = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    const token = authorization?.split(' ')[1];

    const newExpireToken = new ExpireTokenModel({ expireToken: token });
    const result = await newExpireToken.save();
    if (result) {
      res.status(200).json('Logout success');
    } else {
      res.status(401).json({ error: 'Authentication Failed' });
    }
  } catch {
    res.status(401).json({ error: 'Authentication Failed' });
  }
};

// change password handler
export const changePasswordHandler: RequestHandler = async (req, res, next) => {
  try {
    const userInfo: any = await UserModel.findById({
      _id: req.body.userId,
    }).select({
      password: 1,
      updateAt: 1,
    });

    if (userInfo !== null) {
      const isEligible = checkIsEligible(
        userInfo?.updateAt,
        Number(process.env.PASSWORD_CHANGE_DAY_LIMIT)
      );

      if (isEligible) {
        const isValidPassword = await compare(req.body.oldPassword, userInfo?.password);

        if (isValidPassword) {
          const hashedPassword = await hash(req.body.newPassword, 10);

          const updatePassword = await UserModel.findOneAndUpdate(
            { _id: req.body.userId },
            {
              $set: {
                password: hashedPassword,
                updateAt: new Date(),
              },
            }
          );

          if (updatePassword) res.status(200).json({ message: 'Password change successfully' });
          else res.status(401).json({ error: 'Something wrong' });
        } else res.status(401).json({ error: 'Current password is not match' });
      } else
        res.status(401).json({
          error: `To change password need more then ${Number(
            process.env.PASSWORD_CHANGE_DAY_LIMIT
          )} days`,
        });
    } else next('something wrong');
  } catch {
    res.status(401).json({ error: 'Authentication Failed' });
  }
};

// favorite Donar Handler
export const favoriteDonarHandler: RequestHandler = async (req, res, next) => {
  try {
    const donarId = req.body.donarId;
    const userId = req.body.userId;
    // get current favorite list
    const userFavoriteDonars = await UserModel.findById(userId).select('favoriteDonar');

    if (userFavoriteDonars !== null) {
      // check donar id valid
      const getDonar = await DonarModel.findById(donarId);

      if (getDonar !== null) {
        // get all donars
        const preFavoriteDonars = [
          ...(userFavoriteDonars?.favoriteDonar as [Schema.Types.ObjectId]),
        ];

        // check is current donar is exist or not
        const isDonarExist = userFavoriteDonars?.favoriteDonar?.includes(donarId);
        if (!isDonarExist) {
          preFavoriteDonars.push(donarId);
        } else {
          const findIndexOfDonar = preFavoriteDonars.indexOf(donarId);
          preFavoriteDonars.splice(findIndexOfDonar, 1);
        }

        const updateFavoriteDonarList = await UserModel.findOneAndUpdate(
          { _id: userId },
          { $set: { favoriteDonar: preFavoriteDonars } },
          { new: true }
        ).select({ favoriteDonar: 1 });

        if (updateFavoriteDonarList) {
          res.status(200).json({
            message: 'Update favorite donar list',
            data: updateFavoriteDonarList?.favoriteDonar,
          });
        }
      } else {
        res.status(401).json({ error: 'Donar is not exist !!!' });
      }
    } else {
      res.status(401).json({ error: 'Authentication Failed !!!' });
    }
  } catch {
    res.status(401).json({ error: 'Authentication Failed !!!!' });
  }
};

// forgot password handler
export const forgotPasswordHandler: RequestHandler = async (req, res, next) => {
  try {
    const findUser = await UserModel.findOne({ email: req.body.email }).select({
      username: 1,
      email: 1,
    });
    if (findUser !== null) {
      const token = await ForgotPassTokenModel.findOne({ userId: findUser._id });

      if (!token) {
        const addNewToken = await new ForgotPassTokenModel({
          userId: findUser._id,
          token: crypto.randomBytes(32).toString('hex'),
        }).save();

        if (addNewToken) {
          const link = `${process.env.BASE_URL}:${process.env.PORT}/user/password-reset/${findUser._id}/${addNewToken.token}`;
          sendEmail(
            findUser.email,
            'Password reset',
            '',
            `<p>Please <a href="${link}">Click Here</a> to change password</p>`
          );
          res.status(200).json({
            message: `Email send to ${findUser.email}, Please click the link`,
            email: findUser.email,
          });
        } else res.status(500).json({ error: 'Something wrong' });
      }
    } else res.status(401).json({ error: 'User not found' });
  } catch (err) {
    res.status(500).json({
      error: 'There was a server side error !!!',
      err,
    });
  }
};
