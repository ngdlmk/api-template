import { Request, Response } from 'express';
import userServices from 'services/user-services';

async function getUser(req: Request, res: Response) {
  const { email, password } = req.body;
  try {
    const user = await userServices.getUser(email, password);
    res.status(200).json({ success: true, user });
  } catch (error: any) {
    res.status(500).json({ error: error.message, success: false });
  }
}

export default {
  getUser,
};
