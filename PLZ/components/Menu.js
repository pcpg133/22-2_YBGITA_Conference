import React, {useState, useEffect, useRef} from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  Image,
  Button,
  ScrollView
} from 'react-native';
import { set } from 'react-native-reanimated';


const Menu = ({navigation, route}) => {
  const num = route.params.num - 1;
  const list = [
    ["고기구이", "국밥/해장국", "국수/만두/칼국수", "냉면집", "족발/보쌈", "찌개/국물", "찜닭/닭갈비", "한식/백반/한정식"],
    ["스테이크/폭립", "양식종합", "정통양식/경양식", "파스타/스파게티"],
    ["마라탕", "양꼬치", "중국집"],
    ["돈가스", "돈부리/덮밥", "라멘", "샤브샤브", "우동/소바/오뎅", "일식종합", "초밥", "횟집"],
    ["라면/김밥/어묵", "떡볶이"],
    ["기타", "도시락", "토스트/샌드위치", "피자", "햄버거"],
    ["삼계탕", "찜닭/닭갈비", "후라이드/양념치킨"],
    ["동남아음식", "죽전문점", "타코", "퓨전음식"]]

  const array = list[num]

  const [select, setselect] = useState(0);
  const [result, setResult] = useState();
  const [ok, setOk] = useState(false);
  const isMounted = useRef(false);
  const secondRef = useRef();
  const [numArr, setNumArr] = useState([]);

  var f_obj = {}
  f_obj.setclick1 = () => setselect(1);
  f_obj.setclick2 = () => setselect(2);
  f_obj.setclick3 = () => setselect(3);
  f_obj.setclick4 = () => setselect(4);
  f_obj.setclick5 = () => setselect(5);
  f_obj.setclick6 = () => setselect(6);
  f_obj.setclick7 = () => setselect(7);
  f_obj.setclick8 = () => setselect(8);

  const sendResult = async () => {
    console.log(select)
    try {
      const response = await fetch("http://127.0.0.1:8080/category/Scategory", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          Scategory: select,
        }), 
      }).then(response => console.log(response.status));
      setResult(response.status);
    } catch (e) {}
  };

  useEffect(() => {
    if(isMounted.current){
      sendResult();
      navigation.navigate("Result");
    } else {
     isMounted.current = true;
    }
  }, [ok]);

  // const getResult = async () => {
  //   try {
  //     const response = await fetch(
  //       "http://127.0.0.1:8080/category/Mcategory/get"
  //     );
  //        const json = await response.json();
  //        setNum(Object.values(json["number"]))
  //    } catch (e) {}
  //  };

  // useEffect(() => {
  //     getResult();
  // }, [])

    return (
    
        <SafeAreaView style={styles.container}>
          <StatusBar style="auto"/>
            <Text style={styles.title}>원하는 음식점 찾기</Text>           
            <ScrollView 
                    style={styles.scroll_container}
                    contentContainerStyle={{ flexGrow: 1 }}
                    contentInsetAdjustmentBehavior="automatic">
                    <View style={styles.cf_container}>
                        {array.map((item, index) => {
                            return(
                                <View
                                        key={index}
                                        style={styles.cf_each}
                                >   
                                <View style={{flex: 1, alignItems: "center"}}>
                                  <View style={{alignItems: 'center', }}>
                                  <TouchableOpacity onPress={f_obj['setclick'+(index+1)]}>
                                    <Image style={[styles.image,{opacity: (select=== index+1 || select===0)? 1 : 0.2}]} source={require('../images/ex_images.png')}/>
                                  </TouchableOpacity>
                                  </View>
                                  <View>
                                  <Text style={styles.image_text}>{item}</Text>
                                  </View>
                              </View>
                                    
                                </View>
                            );
                        })
                        } 
                    </View>
                </ScrollView>
                <TouchableOpacity
                        onPress={() => setOk(!ok)}
                        style={styles.login_btn}
                    >
                    <Text style={styles.text}>다음</Text>
              </TouchableOpacity>
              <TouchableOpacity
                        onPress={() => navigation.navigate("Restaurant")}
                        style={styles.register_btn}
                    >
                    <Text style={styles.text}>이전</Text>
              </TouchableOpacity>
            

        </SafeAreaView>
    );
};



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
      width: 80,
      height: 80,
      marginLeft: "20%",
      marginRight: "-10%"
  },
  title_container: {
      flexDirection: "row",
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#2B82D4",
    textAlignVertical: 'center',
    textAlign: 'center',
    marginTop: "10%"
  },
  subtitle: {
      fontSize: 20,
      color: "#E6E6E6",
      marginTop: "160%",
      marginLeft: "4%"
  },
  scroll_container: {
      marginTop: "10%",
      width: "100%",
  },
  cf_container:{
      height: 1000
  },
  cf_each:{
      //backgroundColor: "blue",
      width: "100%",
      height: "20%",
      flexDirection: "row",
      borderBottomColor: '#EFEFEF',
      borderBottomWidth: 2,
      paddingTop: "3%"
  },
  cf_text:{
      textAlign: "left",
      fontSize: 26,
      paddingTop: "8%",
      marginTop: "18%",
      marginLeft: "5%"
  },
  menu_container: {
      marginTop: "22%",
      marginLeft: "-20%"
  },
  bf_container: {
      flexDirection: "row",
      marginTop: "12%"
  },
  lc_container: {
      flexDirection: "row",
      marginTop: "12%"
  },
  dn_container: {
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
  login_btn: {
    backgroundColor: "#2B82D4",
    alignItems: "center",
    justifyContent: "center",
    width: "80%",
    height: "5%",
    marginHorizontal: "10%",
    borderRadius: 5,
    marginTop: "5%"
  },
  register_btn: {
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    width: "80%",
    height: "5%",
    marginTop: "5%",
    marginHorizontal: "10%",
    borderColor: "#92BEE7",
    borderWidth: 1,
    borderRadius: 5,
  },
  text: {
    fontSize:22,
    marginTop: "1%"
},
image_text: {
  fontWeight: "bold",
  fontSize: 25

},
image: {
  marginBottom: "7%",
  width: 120,
  height: 120
}
})

export default Menu;