import 'express-async-errors';
import * as userRepository from '../data/auth.js';
import * as storeRepository from '../data/store.js';

export async function getCafeteria(req, res) {
    const result = await storeRepository.getCafeteria();
    const result2 = {};
    result2["맛나샘"] = result["맛나샘"];
    result2["한경관"] = { "1층 중식": result["한경관"]["1층 중식"], "2층 중식": result["한경관"]["2층 중식"], "2층 석식": result["한경관"]["2층 석식"] };
    result2["청경관"] = { "snack": ['김밥'] };
    result2["부를샘"] = { "chinese": ['간장탕수육', '자장면', '중국식볶음밥', '자장면곱빼기', '볼고기짬뽕', '몽골리안치킨덮밥'], "western": ['등심돈가스정식', '소시지오므라이스'] };
    result2["고를샘"] = { "그라탕": ['제육고추장크림 그라탕'],
                       "라이스": ['오븐라이스 치킨바베큐', '오븐라이스 목살', '오븐라이스 치킨커틀렛'],
                       "스파게티": ['오븐스파게티 까르보나라', '오븐스파게티 치킨바베큐', '오븐스파게티 목살', '오븐스파게티 치킨커틀렛', '오븐스파게티 뽈로', '오븐스파게티 팀발', '오븐스파게티 미소스'],
                       "피자": ['페퍼로니', '포테이토', '디럭스 치즈', '고르곤졸라', '콤비네이션', '치킨바베큐']
                    }
    res.status(200).json(result2);
}


// export async function getCafeteria(req, res) {
//     res.status(200).json(
    //   { "맛나샘": 
    //     { 
    //       "hotbowl": ['설렁탕', '차돌된장찌개'], 
    //       "soban": ['불닭오므라이스', '탄탄멘&모듬튀김'], 
    //       "nodle": ['등심돈까스정식'],
    //     },
    //     "어울샘(한경관)":
    //     {
    //       "1층_중식": ['양지시래기탕, 생선조림, 온메밀소바, 쑥갓두부나물, 김치, 숭늉'],
    //       "2층_중식": ['순두부국, 간장제육볶음, 짜장라면, 숙주나물무침, 봄동무침, 김치, 계란프라이'],
    //       "2층_석식": ['얼갈이국, 제육볶음, 우동, 볼어묵조림, 미역초무침, 김치, 계란프라이'],
    //     }, 
    //   });
//     }