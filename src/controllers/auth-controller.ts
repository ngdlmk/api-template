import { Request, Response } from 'express';
import authService from 'services/auth-service';
import { generateAccessToken } from 'utils/accessToken';

async function createUser(req: Request, res: Response) {
  const { email, password } = req.body;
  try {
    const user = await authService.createUser(email, password);
    if (user.success) {
      res.status(200).json({
        user: user.user,
        accessToken: generateAccessToken(user.user._id),
        success: true,
      });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}

async function login(req: Request, res: Response) {
  const { email, password, platform } = req.body;
  try {
    const user = await authService.login(email, password, platform);
    if (user) {
      res.status(200).json({ user, success: true });
    } else {
      res.status(500).json({ success: false, message: 'User not found' });
    }
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
}
export default { createUser, login };
