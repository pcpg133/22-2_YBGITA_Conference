import React, {useState, useEffect} from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  ImageBackground,
  Image,
  ScrollView,
} from 'react-native';
import { get } from 'react-native/Libraries/Utilities/PixelRatio';
import cafeteria from "../images/cafeteria.png";
import yonsei from "../images/yonsei.png";
import manna from "../images/manna.png";
import hankyung from "../images/hankyung.png";
import chunggyeong from "../images/chunggyeong.png";
import buruel from "../images/buruel.png";
import goreul from "../images/goreul.png";


function Cafeteria({ navigation }) {

    const [resultJson, setResultJson] = useState({});
    const [mat1Arr, setMat1Arr] = useState([]);
    const [mat2Arr, setMat2Arr] = useState([]);
    const [mat3Arr, setMat3Arr] = useState([]);
    const [han1Arr, setHan1Arr] = useState([]);
    const [han2Arr, setHan2Arr] = useState([]);
    const [han3Arr, setHan3Arr] = useState([]);
    const [chung1Arr, setChung1Arr] = useState([]);
    const [bu1Arr, setBu1Arr] = useState([]);
    const [bu2Arr, setBu2Arr] = useState([]);
    const [go1Arr, setGo1Arr] = useState([]);
    const [go2Arr, setGo2Arr] = useState([]);
    const [go3Arr, setGo3Arr] = useState([]);
    const [go4Arr, setGo4Arr] = useState([]);
    
    
    
    // const test_json = 
    //         {
    //             "맛나샘": {
    //                 "hotbowl": [
    //                     "돈육김치찌개",
    //                     "나주곰탕"
    //                 ],
    //                 "nodel": [
    //                     "해당 요일은 운영하지 않습니다."
    //                 ],
    //                 "soban": [
    //                     "소시지오므라이스",
    //                     "헤물짬뽕&탕수육&중국식볶음밥"
    //                 ]
    //             },
    //             "한경관": {
    //                 "1층_중식": [
    //                     "유부된장국",
    //                     "소고기무김치밥",
    //                     "오징어볶음",
    //                     "두부조림",
    //                     "쌈다시마",
    //                     "김치",
    //                     "숭늉"
    //                 ],
    //                 "2층_석식": [
    //                     "유부된장국",
    //                     "닭볶음탕",
    //                     "카레라면",
    //                     "열무무침",
    //                     "무생채",
    //                     "김치",
    //                     "계란프라이"
    //                 ],
    //                 "2층_중식": [
    //                     "어묵국",
    //                     "숙주불고기",
    //                     "비빔국수",
    //                     "미역줄기볶음",
    //                     "마늘쫑무침",
    //                     "김치",
    //                     "계란프라이"
    //                 ]
    //             },
    //             "청경관": {
    //                 "snack": [
    //                     "김밥"
    //                 ]
    //             },
    //             "부를샘": {
    //                 "chinese": [
    //                     "간장탕수육",
    //                     "자장면",
    //                     "중국식볶음밥",
    //                     "자장면곱빼기",
    //                     "볼고기짬뽕",
    //                     "몽골리안치킨덮밥"
    //                 ],
    //                 "western": [
    //                     "등심돈가스정식",
    //                     "소시지오므라이스"
    //                 ]
    //             },
    //             "고를샘": {
    //                 "그라탕": [
    //                     "제육고추장크림 그라탕"
    //                 ],
    //                 "라이스": [
    //                     "오븐라이스 치킨바베큐",
    //                     "오븐라이스 목살",
    //                     "오븐라이스 치킨커틀렛"
    //                 ],
    //                 "스파게티": [
    //                     "오븐스파게티 까르보나라",
    //                     "오븐스파게티 치킨바베큐",
    //                     "오븐스파게티 목살",
    //                     "오븐스파게티 치킨커틀렛",
    //                     "오븐스파게티 뽈로",
    //                     "오븐스파게티 팀발",
    //                     "오븐스파게티 미소스"
    //                 ],
    //                 "피자": [
    //                     "페퍼로니",
    //                     "포테이토",
    //                     "디럭스 치즈",
    //                     "고르곤졸라",
    //                     "콤비네이션",
    //                     "치킨바베큐"
    //                 ]
    //             }
    //         }

    // const getResult = () => {   
    //      setMat1Arr(Object.values(test_json["맛나샘"]["hotbowl"]))
    //      setMat2Arr(Object.values(test_json["맛나샘"]["nodel"]))
    //      setMat3Arr(Object.values(test_json["맛나샘"]["soban"]))
    //      setHan1Arr(Object.values(test_json["한경관"]["1층_중식"]))
    //      setHan2Arr(Object.values(test_json["한경관"]["2층_중식"]))
    //      setHan3Arr(Object.values(test_json["한경관"]["2층_석식"]))
    //      setChung1Arr(Object.values(test_json["청경관"]["snack"]))
    //      setBu1Arr(Object.values(test_json["부를샘"]["chinese"]))
    //      setBu2Arr(Object.values(test_json["부를샘"]["western"]))
    //      setGo1Arr(Object.values(test_json["고를샘"]["그라탕"]))
    //      setGo2Arr(Object.values(test_json["고를샘"]["라이스"]))
    //      setGo3Arr(Object.values(test_json["고를샘"]["스파게티"]))
    //      setGo4Arr(Object.values(test_json["고를샘"]["피자"]))
    // }

    const getResult = async () => {
       try {
         const response = await fetch(
           "http://127.0.0.1:8080/cafeteria"
         );
            const json = await response.json();
            setMat1Arr(Object.values(json["맛나샘"]["hotbowl"]))
            setMat2Arr(Object.values(json["맛나샘"]["nodel"]))
            setMat3Arr(Object.values(json["맛나샘"]["soban"]))
            setHan1Arr(Object.values(json["한경관"]["1층 중식"]))
            setHan2Arr(Object.values(json["한경관"]["2층 중식"]))
            setHan3Arr(Object.values(json["한경관"]["2층 석식"]))
            setChung1Arr(Object.values(json["청경관"]["snack"]))
            setBu1Arr(Object.values(json["부를샘"]["chinese"]))
            setBu2Arr(Object.values(json["부를샘"]["western"]))
            setGo1Arr(Object.values(json["고를샘"]["그라탕"]))
            setGo2Arr(Object.values(json["고를샘"]["라이스"]))
            setGo3Arr(Object.values(json["고를샘"]["스파게티"]))
            setGo4Arr(Object.values(json["고를샘"]["피자"]))
        } catch (e) {}
      };
    
    useEffect(() => {
        getResult();
    }, []);

    return (
        <View style={styles.container}>
            <StatusBar style="auto"/>
            <ImageBackground source={yonsei} style={styles.bg_image}>
                <View style={styles.title_container}>
                    <View>
                        <Text style={styles.title}>오늘의 연세대 학식</Text>
                    </View>
                    <View>
                        <Text style={styles.subtitle}>신촌캠퍼스</Text>
                    </View>
                </View>
                <ScrollView 
                    style={styles.scroll_container}
                    contentContainerStyle={{ flexGrow: 1 }}
                    contentInsetAdjustmentBehavior="automatic">
                    <View style={styles.cf_container}>
                                <View 
                                        style={styles.cf_mat}
                                >   
                                    <View style={styles.image_container}>
                                        <Image style={styles.image} source={manna}></Image>
                                    </View>
                                    <View>
                                        <Text style={styles.cf_text}>맛나샘</Text>
                                    </View>
                                    <View style={styles.menu_container}>
                                    <View style={styles.container4}>
                                        <View style={styles.bf_container}>
                                            <View>
                                                <Text style={styles.cf_menu}>hotbowl</Text>
                                            </View>
                                            
                                            <View style={styles.inputcontainer}>
                                                <Text style={styles.cf_menu_detail}>&nbsp;&nbsp;{mat1Arr[0]}</Text>
                                                <Text style={styles.cf_menu_detail}>&nbsp;&nbsp;{mat1Arr[1]}</Text>
                                            </View>
                                        </View>
                                    </View>
                                        <View style={styles.lc_container}>
                                            <View>
                                                <Text style={styles.cf_menu}>nodel</Text>
                                            </View>
                                            <View>
                                                <Text style={styles.cf_menu_detail}>&nbsp;&nbsp;{mat2Arr[0]}</Text>
                                            </View>
                                        </View>
                                        <View style={styles.dn_container}>
                                            <View>
                                                <Text style={styles.cf_menu}>soban</Text>
                                            </View>
                                            <View>
                                                <Text style={styles.cf_menu_detail}>&nbsp;&nbsp;{mat3Arr[0]}</Text>
                                                <Text style={styles.cf_menu_detail}>&nbsp;&nbsp;{mat3Arr[1]}</Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                                <View 
                                        style={styles.cf_han}
                                >   
                                    <View style={styles.image_container}>
                                        <Image style={styles.image} source={hankyung}></Image>
                                    </View>
                                    <View>
                                        <Text style={styles.cf_text}>한경관</Text>
                                    </View>
                                    <View style={styles.menu_container}>
                                        <View style={styles.bf_container}>
                                            <View>
                                                <Text style={styles.cf_menu}>1층 중식</Text>
                                            </View>
                                            <View>
                                                {han1Arr.map((item, index) => {
                                                    return(
                                                        <View
                                                           key={index}
                                                        >   
                                                            <Text style={styles.cf_menu_detail}>
                                                            &nbsp;&nbsp;{item}
                                                            </Text>
                                                        </View>
                                                    );
                                                })
                                                }   
                                            </View>
                                        </View>
                                        <View style={styles.lc_container}>
                                            <View>
                                                <Text style={styles.cf_menu}>2층 중식</Text>
                                            </View>
                                            <View>
                                            {han2Arr.map((item, index) => {
                                                    return(
                                                        <View
                                                           key={index}
                                                        >   
                                                            <Text style={styles.cf_menu_detail}>
                                                            &nbsp;&nbsp;{item}
                                                            </Text>
                                                        </View>
                                                    );
                                                })
                                                } 
                                            </View>
                                        </View>
                                        <View style={styles.dn_container}>
                                            <View>
                                                <Text style={styles.cf_menu}>2층 석식</Text>
                                            </View>
                                            <View>
                                            {han3Arr.map((item, index) => {
                                                    return(
                                                        <View
                                                           key={index}
                                                        >   
                                                            <Text style={styles.cf_menu_detail}>
                                                            &nbsp;&nbsp;{item}
                                                            </Text>
                                                        </View>
                                                    );
                                                })
                                                } 
                                            </View>
                                        </View>
                                    </View>
                                </View>
                                <View 
                                        style={styles.cf_chung}
                                >   
                                    <View style={styles.image_container}>
                                        <Image style={styles.image} source={chunggyeong}></Image>
                                    </View>
                                    <View>
                                        <Text style={styles.cf_text}>청경관</Text>
                                    </View>
                                    <View style={styles.menu_container}>
                                        <View style={styles.bf_container}>
                                            <View>
                                                <Text style={styles.cf_menu}>snack</Text>
                                            </View>
                                            <View>
                                                <Text style={styles.cf_menu_detail}>&nbsp;&nbsp;{chung1Arr[0]}</Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                                <View 
                                        style={styles.cf_bu}
                                >   
                                    <View style={styles.image_container}>
                                        <Image style={styles.image} source={buruel}></Image>
                                    </View>
                                    <View>
                                        <Text style={styles.cf_text}>부를샘</Text>
                                    </View>
                                    <View style={styles.menu_container}>
                                        <View style={styles.bf_container}>
                                            <View>
                                                <Text style={styles.cf_menu}>중식</Text>
                                            </View>
                                            <View>
                                            {bu1Arr.map((item, index) => {
                                                    return(
                                                        <View
                                                           key={index}
                                                        >   
                                                            <Text style={styles.cf_menu_detail}>
                                                            &nbsp;&nbsp;{item}
                                                            </Text>
                                                        </View>
                                                    );
                                                })
                                                } 
                                            </View>
                                        </View>
                                        <View style={styles.lc_container}>
                                            <View>
                                                <Text style={styles.cf_menu}>양식</Text>
                                            </View>
                                            <View>
                                            {bu2Arr.map((item, index) => {
                                                    return(
                                                        <View
                                                           key={index}
                                                        >   
                                                            <Text style={styles.cf_menu_detail}>
                                                            &nbsp;&nbsp;{item}
                                                            </Text>
                                                        </View>
                                                    );
                                                })
                                                } 
                                            </View>
                                        </View>
                                        </View>
                                    </View>
                                <View 
                                        style={styles.cf_go}
                                >   
                                    <View style={styles.image_container}>
                                        <Image style={styles.image} source={goreul}></Image>
                                    </View>
                                    <View>
                                        <Text style={styles.cf_text}>고를샘</Text>
                                    </View>
                                    <View style={styles.menu_container}>
                                        <View style={styles.bf_container}>
                                            <View>
                                                <Text style={styles.cf_menu}>그라탕</Text>
                                            </View>
                                            <View>
                                            {go1Arr.map((item, index) => {
                                                    return(
                                                        <View
                                                           key={index}
                                                        >   
                                                            <Text style={styles.cf_menu_detail}>
                                                            &nbsp;&nbsp;{item}
                                                            </Text>
                                                        </View>
                                                    );
                                                })
                                                } 
                                            </View>
                                        </View>
                                        <View style={styles.lc_container}>
                                            <View>
                                                <Text style={styles.cf_menu}>라이스</Text>
                                            </View>
                                            <View>
                                            {go2Arr.map((item, index) => {
                                                    return(
                                                        <View
                                                           key={index}
                                                        >   
                                                            <Text style={styles.cf_menu_detail}>
                                                            &nbsp;&nbsp;{item}
                                                            </Text>
                                                        </View>
                                                    );
                                                })
                                                } 
                                            </View>
                                        </View>
                                        <View style={styles.dn_container}>
                                            <View>
                                                <Text style={styles.cf_menu}>스파게티</Text>
                                            </View>
                                            <View>
                                            {go3Arr.map((item, index) => {
                                                    return(
                                                        <View
                                                           key={index}
                                                        >   
                                                            <Text style={styles.cf_menu_detail}>
                                                            &nbsp;&nbsp;{item}
                                                            </Text>
                                                        </View>
                                                    );
                                                })
                                                } 
                                            </View>
                                            
                                        </View>
                                        <View style={styles.dn_container}>
                                            <View>
                                                <Text style={styles.cf_menu}>피자</Text>
                                            </View>
                                            <View>
                                            {go4Arr.map((item, index) => {
                                                    return(
                                                        <View
                                                           key={index}
                                                        >   
                                                            <Text style={styles.cf_menu_detail}>
                                                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{item}
                                                            </Text>
                                                        </View>
                                                    );
                                                })
                                                } 
                                            </View>
                                        </View>
                              
                                    </View>
                                </View>
                              
                    </View>
                </ScrollView>
                <TouchableOpacity
                        onPress={() => navigation.navigate("Category")}
                        style={styles.login_btn}
                    >
                    <Text style={styles.nexttext}>학식은 지겨워요(질문 추천)</Text>
                
            </TouchableOpacity>
            <TouchableOpacity
                        onPress={() => navigation.navigate("Random")}
                        style={styles.register_btn}
                    >
                    <Text style={styles.text}>학식은 지겨워요(이미지 추천)</Text>
            </TouchableOpacity>
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      //justifyContent: "center",
    },
    bg_image: {
      width: "100%",
      height: "100%",
      resizeMode: "cover",
    },
    image:{
        width: 120,
        height: 115,
        marginLeft: "10%",
        marginRight: "-5%"
    },
    title_container: {
        flexDirection: "row",
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        color: "#FFFFFF",
        marginTop: "65%",
        marginLeft: "8%"
    },
    subtitle: {
        fontSize: 20,
        color: "#E6E6E6",
        marginTop: "160%",
        marginLeft: "4%"
    },
    register_btn: {
        backgroundColor: "#FFFFFF",
        alignItems: "center",
        justifyContent: "center",
        width: "80%",
        height: "5%",
        marginTop: "4%",
        marginBottom:"7%",
        marginHorizontal: "10%",
        borderColor: "#92BEE7",
        borderWidth: 1,
        borderRadius: 5,
      },
    login_btn: {
        color:'white',
        backgroundColor: "#2B82D4",
        alignItems: "center",
        justifyContent: "center",
        width: "80%",
        height: "5%",
        marginHorizontal: "10%",
        borderRadius: 5,
        marginTop: "25%",
        marginBottom:"-1%"
      },
    scroll_container: {
        marginTop: "5%",
        marginBottom:"-20%",
        width: "100%",
        height:2000,
    
    },
    container4: {
        marginTop: "-3%",
        marginBottom:"-20%",
        width: "100%",
        height:60,
    
    },
    inputcontainer: {
        marginTop: "0%",
        marginBottom:"10%",
        width: "50%",
        height:20000,
        fontsize:32
    },
    cf_container:{
        height: 1680,
    },
    cf_mat:{
        //backgroundColor: "blue",
        width: "100%",
        height: "17%",
        flexDirection: "row",
        borderBottomColor: '#EFEFEF',
        borderBottomWidth: 2,
        paddingTop: "3%"
    },
    cf_han:{
        //backgroundColor: "blue",
        width: "100%",
        height: "31%",
        flexDirection: "row",
        borderBottomColor: '#EFEFEF',
        borderBottomWidth: 2,
        paddingTop: "3%"
    },
    cf_chung:{
        //backgroundColor: "blue",
        width: "100%",
        height: "8%",
        flexDirection: "row",
        borderBottomColor: '#EFEFEF',
        borderBottomWidth: 2,
        paddingTop: "3%"
    },
    cf_bu:{
        //backgroundColor: "blue",
        width: "100%",
        height: "16%",
        flexDirection: "row",
        borderBottomColor: '#EFEFEF',
        borderBottomWidth: 2,
        paddingTop: "3%"
    },
    cf_go:{
        //backgroundColor: "blue",
        width: "100%",
        height: "45%",
        flexDirection: "row",
        borderBottomColor: '#EFEFEF',
        borderBottomWidth: 2,
        paddingTop: "3%"
    },
    cf_text:{
        textAlign: "left",
        fontSize: 30,
        marginTop: "-2%",
        marginLeft: "2%",
        fontWeight: "bold",
    },
    menu_container: {
        marginTop: "14%",
        marginLeft: "-20%",
    },
    bf_container: {
        flexDirection: "row",
        marginLeft:"-1%",
        marginTop: "-2%",
        marginHorizontal: "20%",
        marginVertical:"3%"
    },
    lc_container: {
        flexDirection: "row",
        marginTop: "12%"
    },
    dn_container: {
        flexDirection: "row",
        marginTop: "12%"
    },
    plus_container: {
        backgroundColor: "red",
        marginTop: "-30%"
    },
    plus_container: {
        flexDirection: "row",
        marginTop: "12%"
    },
    cf_menu: {
        fontSize: 18,
        fontWeight: "bold"
    },
    cf_menu_detail: {
        color: "#939393"
    },
    nexttext: {
     fontWeight:"bold",
      fontSize: 18,
      color: "white"
    },
    text: {
        fontWeight:"bold",
        fontSize: 18
    }
})

export default Cafeteria;