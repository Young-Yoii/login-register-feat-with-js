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
    //   console.log(EMAIL, PASSWORD);

    // 로그인 진행 (로그인 성공 시 jwt 토큰을 프론트에 보내 줌)
    const userToken = await userService.getUserToken({ email, password });

    // jwt 토큰을 프론트에 보냄 (jwt 토큰은, 문자열임)
    res.status(200).json(userToken);
  } catch (error) {
    next(error);
  }
});

export { userRouter };
