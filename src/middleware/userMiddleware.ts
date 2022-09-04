import { RequestHandler } from 'express';

export const signupMiddleware: RequestHandler = (req, res, next) => {
  const reqData = req.body;
  const email =
    typeof reqData.email === 'string' && reqData.email.trim().length > 2 ? reqData.email : false;
  const username =
    typeof reqData.username === 'string' && reqData.username.trim().length > 4
      ? reqData.username
      : false;
  const password =
    typeof reqData.password === 'string' && reqData.password.trim().length > 4
      ? reqData.password
      : false;

  if (email && username && password) next();
  else res.status(400).json({ message: 'All field required' });
};
