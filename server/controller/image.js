import 'express-async-errors';
import * as userRepository from '../data/auth.js';
import * as storeRepository from '../data/store.js';

export async function getImageList(req, res) {
    const num = selectIndex(30, 5);
    console.log(num);
    let list = {};
    for (var i = 0; i < num.length; i++) {
        var images = storeRepository.image[num[i]];
        list[num[i]] = images;
    }
    res.status(200).json(list);
} 

// export async function getImageList(req, res) {
//     const num = selectIndex(30, 5);
//     console.log(num);
//     let list = {};
//     for (var i = 0; i < num.length; i++) {
//         var images = storeRepository.image[num[i]];
//         list[num[i]] = images;
//     }
//     res.status(200).json(list);
// } 

export async function getStoreList(req, res) {
    var Mcategory_list = '';
    var Scategory_list = '';
    for (var i = 0; i < req.body['num'].length; i++) {
        if (req.body['tf'][i] == "true") {
            Mcategory_list = Mcategory_list + storeRepository.image[req.body['num'][i]]['tag'][0] + ' ';
            Scategory_list = Scategory_list + storeRepository.image[req.body['num'][i]]['tag'][1] + ' ';
        }
    }
    userRepository.userdata["label"] = "번개";
    userRepository.userdata["Mcategory"] = Mcategory_list;
    userRepository.userdata["Scategory"] = Scategory_list;
    console.log(Mcategory_list);
    console.log(Scategory_list);

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

export async function getStoreDetail(req, res) {
    storeRepository.image
    const result = await storeRepository.getCategoryStore(userRepository.userdata);
    var result_edit = {};
    for (var i = 0; i < Object.keys(storeRepository.storelist).length; i++) {
        result_edit[i] = {
            '상호명': storeRepository.storelist[i]['상호명'], 
            '도로명주소': storeRepository.storelist[i]['도로명주소'],
            '별점': storeRepository.storelist[i]['별점'],
            '카테고리': storeRepository.storelist[i]['카테고리'],
            '리뷰개수': storeRepository.storelist[i]['리뷰개수']
        };
    }
    console.log(result_edit);
    res.status(200).json(result_edit);
}

export async function getRandomStore(req, res) {
    const num = Math.floor(Math.random() * Object.keys(storeRepository.storelist).length);
    const store = await storeRepository.findByName(storeRepository.storelist[Object.keys(storeRepository.storelist)[num]]);
    res.status(200).json(store);
} 
  
const selectIndex = (totalIndex, selectingNumber) => {
    let randomIndexArray = []
    for (var i=0; i<selectingNumber; i++) {   //check if there is any duplicate index
        var randomNum = Math.floor(Math.random() * totalIndex)
        if (randomIndexArray.indexOf(randomNum) === -1) {
            randomIndexArray.push(randomNum)
        } else { //if the randomNum is already in the array retry
            i--
        }
    }
    return randomIndexArray
}