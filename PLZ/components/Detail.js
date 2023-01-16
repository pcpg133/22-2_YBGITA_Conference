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
import cafeteria from "../images/cafeteria.png";
import yonsei from "../images/yonsei.png";

function Detail({ navigation }) {

    const [arr, setArr]= useState([]);

    // const getResult = async () => {
    //     try {
    //       const response = await fetch(
    //         "http://127.0.0.1:8080/cafeteria"
    //       );
    //          const json = await response.json();
    //          setMat1Arr(Object.values(json["맛나샘"]["hotbowl"]))
    //          setMat2Arr(Object.values(json["맛나샘"]["nodel"]))
    //          setMat3Arr(Object.values(json["맛나샘"]["soban"]))
    //      } catch (e) {}
    //    };

    const getResult = async () => {
        const response = await fetch(
            "http://127.0.0.1:8080/category/detail/name"
          );
        const json = await response.json();
        //     const json = {
        //         "label":
        //             "음식이 맛있어요",
        //         "경도": 126.934983987592,
        //         "도로명주소": "서울특별시 서대문구 연세로5다길 10, (창천동)",
        //         "리뷰개수": 112,
        //         "별점": 3.6,
        //         "상호명": "여우골초밥앤참치",
        //         "위도": 37.5565120655207,
        //         "이미지": 
        //             "https://img1.kakaocdn.net/cthumb/local/R0x420/?fname=http%3A%2F%2Ft1.daumcdn.net%2Fplace%2F19EEB5180D974A30AD700C380103B1CE",
        //         "정확도": 1,
        //         "카테고리": [
        //             "일식",
        //             "초밥"
        //         ]
        //  }
         console.log(Object.values(json))
         setArr(Object.values(json))
       };
     
      useEffect(() => {
          getResult();
      }, []);

    return (
        <View style={styles.container}>
            <StatusBar style="auto"/>
            <View style={styles.title_container}>
                <Text style={styles.title}>식당 정보</Text>
            </View>
            <View 
                style={styles.scroll_container}>
                <View style={styles.rt_container}>
                            
                                <View style={styles.info_container}>
                                    <View style={styles.line}>
                                        <View>
                                            <Text style={styles.rt_name}>{arr[5]}</Text>
                                        </View>
                                        <View>
                                            <Text style={styles.rt_score}>⭐️{arr[4]}</Text>
                                        </View>
                                        <View>
                                            <Text style={styles.rt_review}>📝{arr[3]}</Text>
                                        </View>
                                    </View>
                                    <View style={styles.line}>
                                        <View>
                                            <Text style={styles.rt_address}>{arr[2]}</Text>
                                        </View>
                                    </View>
                                    <View style={styles.line}>
                                        {/* <View>
                                            <Text style={styles.rt_category}>
                                            {arr[9]}
                                           </Text>
                                        </View> */}
                                        {/* <TouchableOpacity
                                            onPress={() => navigation.navigate("Map")}
                                            style={styles.detail_btn}
                                        >
                                        <Text style={styles.detail_text}>지도보기</Text>
                                        </TouchableOpacity> */}
                                        
                                    </View>


                                    <View style={styles.image_container}>
                                    <ScrollView style={styles.scrollView}>
                                        <Image source={{uri : arr[7]}} style={{width: 400, height: 300}}/>
                                    </ScrollView>
                                    </View>
                                    <View>
                                        <Text style={styles.rt_label}>{arr[0]}</Text>
                                    </View>
                                    <TouchableOpacity
                                            onPress={() => navigation.navigate("Mypage")}
                                            style={styles.detail_btn}
                                        >
                                        <Text style={styles.detail_text}>마이페이지</Text>
                                    </TouchableOpacity>
                                </View>                                                 
                            </View>
            </View>

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
        width: 75,
        height: 75,
        marginLeft: "20%",
        marginRight: "-10%"
    },
    title_container: { 
    marginTop: "5%",
    width: "100%",
    height: "13%",
    borderBottomColor: '#EFEFEF',
    borderBottomWidth: 8,
    },
    title: {
      fontSize: 25,
      fontWeight: "bold",
      textAlign: "center",
      marginTop: "14%",
      marginLeft: "3%"
    },
    scroll_container: {
        marginTop: "15%",
        width: "100%",
        height: "80%"
    },
    image_container: {
        alignItems: "center",
        marginTop: "7%",
        width: "94%",
        marginHorizontal: "3%",
        flexDirection: 'row'
    },
    info_container: {
        marginTop: "-10%",
        width: "100%",
        height: "120%"
    },
    rt_each:{
        //backgroundColor: "blue",
        width: "100%",
        height: "20%",
        flexDirection: "row",
        borderBottomColor: '#EFEFEF',
        borderBottomWidth: 2,
        paddingTop: "-20%",
    },
    rt_name:{
        textAlign: "left",
        fontSize: 25,
        fontWeight: "bold",
        marginTop: "1%",
        marginLeft: "14%"
    },
    rt_score:{
        textAlign: "left",
        color: "#939393",
        fontSize: 16,
        marginTop: "3%",
        marginLeft: "5%"
    },
    rt_review: {
        textAlign: "left",
        color: "#939393",
        fontSize: 16,
        marginTop: "3%",
        marginLeft: "5%"
    },
    rt_address: {
        textAlign: "left",
        fontSize: 15,
        marginTop: "5%",
        marginLeft: "9%"
    },
    rt_category: {
        color: "#939393",
        textAlign: "left",
        fontSize: 17,
        marginTop: "10%",
        marginLeft: "22%",
    },
    rt_hash: {
        color: "#2B82D4",
        textAlign: "left",
        fontSize: 17,
        marginTop: "12%",
        marginLeft: "5%"
    },
    line: {
        flexDirection: "row"
    },
    detail_btn: {
        backgroundColor: "#D3E5F5",
        alignItems: "center",
        justifyContent: "center",
        width: 90,
        height: 50,
        marginLeft: "70%",
        borderRadius: 5,
        marginTop: "40%"
    },
    detail_text: {
        color: "#2B82D4",
        fontWeight: "bold"
    },
    random_btn: {
        backgroundColor: "#D3E5F5",
        alignItems: "center",
        justifyContent: "center",
        width: "30%",
        height: "23%",
        borderRadius: 20,
        marginHorizontal: "35%",
        marginTop: "3%"
    },
    random_text: {
        color: "#2B82D4",
        fontWeight: "bold"
    },
    scrollView: {
    
        marginHorizontal: 20,
        horizontal:"true"
      },
    rt_label: {
        textAlign: "left",
        fontSize: 25,
        marginTop: "5%",
        marginLeft: "9%"
    }
})

export default Detail;