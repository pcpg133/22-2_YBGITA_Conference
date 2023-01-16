import 'express-async-errors';
import * as userRepository from '../data/auth.js';
import * as storeRepository from '../data/store.js';

export async function setEmptyTime(req, res) {
  const { emptyTime, startpoint } = req.body;
  const update = await userRepository.updateEmpty(emptyTime, startpoint);
  console.log(userRepository.userdata);
  console.log(update);
  res.status(200).json({ username:update.username, password: update.password, nickname: update.nickname, emptyTime, startpoint });
}

export async function EmptyTimeCheck(req, res) {
  const result = await storeRepository.getEmptyTime();
  // const result = {'금': ['05-06', '17-18', '15-17', '13-15', '11-12'], '목': ['18-19', '15-16', '13-15'], '수': ['16-18', '15-16', '14-15'], '화': ['10-12']};
  const date = new Date();
  const days = { 0: "일", 1: "월", 2: "화", 3: "수", 4: "목", 5: "금", 6: "토" };
  const day = days[date.getDay()];
  if (!day) {
    return res.status(200).json({"time": 3 + '시간 이상'});
  }
  var hour = date.getHours();

  const timezone = result[day];
  var timezone_new = []
  for (var i = 0; i < timezone.length; i++) {
    var t = timezone[i].split('-');
    for (var j = 0; j < t.length; j++) {
      timezone_new.push(parseInt(t[j]));
    }
  }

  timezone_new = timezone_new.sort(function(a, b)  {
    return a - b;
  });
  console.log(timezone_new);

  for (var k = 0; k < timezone_new.length; k = k+2) {
    if (hour >= timezone_new[k] && hour < timezone_new[k+1]) {
      hour = 0;
      return res.status(200).json({"time": hour + '시간'});
    }
    if (hour < timezone_new[k] && timezone_new[k] - hour <= 3) {
      if (date.getMinutes() == 0) {
        hour = timezone_new[k] - hour;
        return res.status(200).json({"time": hour + '시간 ' + (60 - date.getMinutes()) + '분'});
      } else {
        hour = timezone_new[k] - hour - Math.trunc(2 - date.getMinutes()/60);
        return res.status(200).json({"time": hour + '시간 ' + (60 - date.getMinutes()) + '분'});
      }
    }
  }
  return res.status(200).json({"time": 3 + '시간 이상'});
}
  