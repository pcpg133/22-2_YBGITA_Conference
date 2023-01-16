import 'express-async-errors';
import * as userRepository from '../data/auth.js';
import * as storeRepository from '../data/store.js';

const labelM = { '1': '다이어트', '2': '데이트', '3': '혼밥', '4': '찐맛집', '5': '모임', '6': '번개추천' };
const McategoryM = { '1': '한식', '2': '양식', '3': '중식', '4': '일식', '5': '분식', '6': '패스트푸드', '7': '닭요리', '8': '별식/퓨전요리' };
const ScategoryM = { 
    '한식': { '1': "고기구이", '2': "국밥/해장국", '3': "국수/만두/칼국수", '4': "냉면집", '5': "족발/보쌈", '6': "찌개/국물", '7': "찜닭/닭갈비", '8': "한식/백반/한정식" },
    '양식': { '1': "스테이크/폭립", '2': "양식종합", '3': "정통양식/경양식", '4': "파스타/스파게티" },
    '중식': { '1': "마라탕", '2': "양꼬치", '3': "중국집" },
    '일식': { '1': "돈가스", '2': "돈부리/덮밥", '3': "라멘", '4': "샤브샤브", '5': "우동/소바/오뎅", '6': "일식종합", '7': "초밥", '8': "횟집" },
    '분식': { '1': "라면/김밥/어묵", '2': "떡볶이" },
    '패스트푸드': { '1': "기타", '2': "도시락", '3': "토스트/샌드위치", '4': "피자", '5': "햄버거" },
    '닭요리': { '1': "삼계탕", '2': "찜닭/닭갈비", '3': "후라이드/양념치킨"},
    '별식/퓨전요리': { '1': "동남아음식", '2': "죽전문점", '3': "타코", '4': "퓨전음식"}
};

var select = 0;

export async function getLabel(req, res) {
    const selectedLabel = req.body.label;
    userRepository.userdata['label'] = labelM[selectedLabel];
    console.log(userRepository.userdata);
    res.sendStatus(200);
}

export async function getMcategory(req, res) {
    const selectedLabel = req.body.Mcategory;
    select = req.body.Mcategory;
    userRepository.userdata['Mcategory'] = McategoryM[selectedLabel];
    console.log(userRepository.userdata);
    res.sendStatus(200);
}

export async function getMcategoryGet(req, res) {
    res.status(200).json({ 'number': [select] });
}

export async function getScategory(req, res) {
    const selectedLabel = req.body.Scategory;
    userRepository.userdata['Scategory'] = ScategoryM[userRepository.userdata['Mcategory']][selectedLabel];
    console.log(userRepository.userdata);
    res.sendStatus(200);
}

export async function getStoreList(req, res) {
    // const { label, Mcategory, Scategory } = req.body
    // userRepository.userdata['label'] = label;
    // userRepository.userdata['Mcategory'] = Mcategory;
    // userRepository.userdata['Scategory'] = Scategory;
    const result = await storeRepository.getCategoryStore(userRepository.userdata);
    var result_edit = {};
    for (var i = 0; i < Object.keys(storeRepository.storelist).length; i++) {
        result_edit[i] = {
            '상호명': storeRepository.storelist[i]['상호명'], 
            '도로명주소': storeRepository.storelist[i]['도로명주소'],
            '별점': storeRepository.storelist[i]['별점'],
            '카테고리': storeRepository.storelist[i]['카테고리'],
            '리뷰개수': storeRepository.storelist[i]['리뷰개수'],
            '이미지': storeRepository.storelist[i]['이미지'][storeRepository.storelist[i]['이미지'].length - 1]
        };
    }
    console.log(result_edit);
    res.status(200).json(result_edit);
}

export async function getStoreListGet(req, res) {
    const result = storeRepository.storelist;
    res.status(200).json(result);
}

export async function setName(req, res) {
    const names = req.body.storename;
    storeRepository.storename['1'] = names;
    console.log(storeRepository.storename['1']);
    res.sendStatus(200);
}

export async function getStoreDetail(req, res) {
    console.log(Object.keys(storeRepository.storelist));
    var isResponse = false;
    for (var i = 0; i < Object.keys(storeRepository.storelist).length; i++) {
        if (storeRepository.storelist[i]["상호명"] == storeRepository.storename['1']) { //storeRepository.storelist[i]["상호명"] == req.query.storename
            storeRepository.storelist[i]["label"] = storeRepository.storelist[i]["label"][0];
            storeRepository.storelist[i]["이미지"] = storeRepository.storelist[i]["이미지"][0];
            res.status(200).json(storeRepository.storelist[i]);
            isResponse = true;
        }
    }
    if (!isResponse) {
        res.status(400);
    }
}

export async function getRandomStore(req, res) {
    const num = Math.floor(Math.random() * Object.keys(storeRepository.storelist).length);
    const store = storeRepository.storelist[num];
    res.status(200).json(store);
} 

// export async function getRandomStore(req, res) {
//     const num = Math.floor(Math.random() * Object.keys(storeRepository.storelist).length);
//     const store = await storeRepository.findByName(storeRepository.storelist[Object.keys(storeRepository.storelist)[num]]);
//     res.status(200).json(store);
// } 
// export async function getStoreList(req, res) {
//     let result = {};
//     var i = 0;
//     for (var key in map) {
//       console.log(key);
//       if (await storeRepository.getDistance(126.935968575, 37.5614339099, map[key][0].longitude, map[key][0].latitude) <= 1*60) {
//           result[`${i}`] = await (storeRepository.findByName(key));
//           i++;
//       }
//     }
//     console.log(result);
//     res.status(200).json(result);
// }

// export async function getRandomStore(req, res) {
//   const num = selectIndex(556, 8);
//   let list = {};
//   for (var i = 0; i < num.length; i++) {
//     var store = await storeRepository.findByName(storeRepository.total[num[i]]);
//     list[`${i}`] = store;
//   }
//   res.status(200).json(list);
// } 

// export async function getStoreDetail(req, res) {
//     const store = await storeRepository.findByName(req.query.storename);
//     if (!store) {
//       return res.status(401).json({ message: 'No store' });
//     }
//     res.status(200).json(store);
//   }

// const selectIndex = (totalIndex, selectingNumber) => {
//     let randomIndexArray = []
//     for (var i=0; i<selectingNumber; i++) {   //check if there is any duplicate index
//       var randomNum = Math.floor(Math.random() * totalIndex)
//       if (randomIndexArray.indexOf(randomNum) === -1) {
//         randomIndexArray.push(randomNum)
//       } else { //if the randomNum is already in the array retry
//         i--
//       }
//     }
//     return randomIndexArray
// }