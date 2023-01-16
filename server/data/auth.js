import { db } from '../db/database.js';

const build = { 
  "0": "공학관", "1": "공학원", "2": "대우관", "3": "중앙도서관", 
  "4": "삼성관", "5": "언더우드관", "6": "위당관", "7": "경영관"
};

export const userdata = {
    "username": "",
    "emptyTime": "",
    "building": "",
    "label": "",
    "Mcategory": "",
    "Scategory": "",
}

export async function findByUsername(username) {
  return db
    .execute('SELECT * FROM users WHERE username=?', [username]) //
    .then((result) => result[0][0]);
}

export async function findById(id) {
  return db
    .execute('SELECT * FROM users WHERE id=?', [id]) //
    .then((result) => result[0][0]);
}

export async function createUser(user) {
  const { username, password, nickname } = user;
  return db
    .execute(
      'INSERT INTO users (username, password, nickname) VALUES (?,?,?)',
      [username, password, nickname]
    )
    .then((result) => result[0].insertId);
}

export async function updateEmpty(emptyTime, startpoint) {
    userdata["emptyTime"] = emptyTime + '시간';
    userdata["building"] = build[startpoint];
    return db
        .execute('UPDATE users SET emptyTime=?, startpoint=? WHERE username=?', [emptyTime, startpoint, userdata.username])
        .then(() => findByUsername(userdata.username));
}


// const place = {
//     "공학관" : [37.5619164, 126.9361307],
//     "공학원" : [37.5608799, 126.9355006],
//     "과학관" : [37.5640984, 126.9348583],
//     "과학원" : [37.5634248, 126.9346863],
//     "대우관" : [37.5683580, 126.9393908],
//     "언더우드관" : [37.5664070, 126.9387642],
//     "연희관" : [37.5673081, 126.9390379],
//     "위당관" : [37.5672197, 126.9378580],
//     "백주년기념관" : [37.5621156, 126.9380433],
//     "대운동장" : [37.5622595, 126.9334310],
//     "정문" : [37.5605000, 126.9368280],
//     "교육과학관" : [37.5666992, 126.9374736],
//     "경영관" : [37.5648597, 126.9390767],
//     "대강당" : [37.5643551, 126.9389045],
//     "학생회관" : [37.5634583, 126.9383846],
//     "백양관" : [37.5646855, 126.9375856],
//     "중앙도서관" : [37.5637278, 126.9369101],
//     "외솔관" : [37.566397, 126.937193],
//     "삼성관" : [37.565059, 126.934399],
//     "백양로" : [37.562601, 126.937708]
// }