import { Router } from 'express';
import { userService } from '../controllers/userController';

const userRouter = Router();

// 회원가입
userRouter.post('/register', async (req, res, next) => {
  try {
    const { nickName, email, password } = req.body;
    const newUser = await userService.addUser({
      nickName,
      email,
      password,
    });
    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
});

export { userRouter };
