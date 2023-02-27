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

userRouter.post('/login', async function (req, res, next) {
  try {
    const { email, password } = req.body;
    const userToken = await userService.getUserToken({ email, password });
    res.status(200).json(userToken);
  } catch (error) {
    next(error);
  }
});

export { userRouter };
