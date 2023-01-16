import 'express-async-errors';
import * as userRepository from '../data/auth.js';

export async function registerUser(req, res) {
  const { username, password, nickname } = req.body;
  console.log(req.body);
  const found = await userRepository.findByUsername(username);
  // if (found) {
  //   return res.status(400).json({ message: `${username} already exists` });
  // }

  const userId = await userRepository.createUser({
    username,
    password,
    nickname,
  });

  console.log(userId);
  
  res.sendStatus(200);
}
