import 'express-async-errors';
import * as userRepository from '../data/auth.js';
import * as storeRepository from '../data/store.js';

export async function loginPost(req, res) {
  const username = req.body["username"];
  const password = req.body["password"];
  const user = await userRepository.findByUsername(username);
  if (!user) {
    return res.status(400).json({ "success": "no" });
  }
  
  if (password != user.password) {
    return res.status(400).json({ "success": "no" });
  }
  userRepository.userdata["username"] = user.username;
  console.log(userRepository.userdata)
  res.status(200).json({ "success": "yes" });
}

export async function login(req, res) {
  const user = await userRepository.findByUsername(req.query.username);
  if (!user) {
    return res.status(400).json({ message: 'Invalid user or password' });
  }    
  if (req.query.password != user.password) {
    return res.status(400).json({ message: 'Invalid user or password' });
  }
  res.status(200).json({ username: user.username, password: user.password, nickname: user.nickname });
}

export async function getNickname(req, res) {
  const user = await userRepository.findByUsername(userRepository.userdata["username"]);
  res.status(200).json({ "nickname": user.nickname })
}

export async function getBuilding(req, res) {
  for (var i = 0; i < req.body["building"].length; i++) {
    if (req.body["building"][i]) {
      storeRepository.buildings[`${i}`] = true;
    } else {
      storeRepository.buildings[`${i}`] = false;
    }
  }
  console.log(storeRepository.buildings);
  res.status(200).json(storeRepository.buildings);
}

export async function findBuilding(req, res) {
  if (Object.keys(storeRepository.buildings).length == 0) {
    return res.sendStatus(400);
  }

  res.status(200).json(storeRepository.buildings);
}