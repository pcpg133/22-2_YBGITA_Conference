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
  Button
} from 'react-native';


const Category = ({navigation}) => {
  const [select, setselect] = useState(0);
  const [ok, setOk] = useState(false);
  const isMounted = useRef(false);

  const secondRef = useRef();

  const setclick1 = () => setselect(1);
  const setclick2 = () => setselect(2);
  const setclick3 = () => setselect(3);
  const setclick4 = () => setselect(4);
  const setclick5 = () => setselect(5);
  const setclick6 = () => setselect(6);

  const sendResult = async () => {
    console.log(select)
    try {
      const response = await fetch("http://127.0.0.1:8080/category/label", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          label: select,
        }), 
      }).then(response => console.log(response.status));
      setResult(response.status);
    } catch (e) {}
  };

  useEffect(() => {
    if(isMounted.current){
      sendResult();
      navigation.navigate("Restaurant")
    } else {
     isMounted.current = true;
    }
  }, [ok]);

    return (
    
        <SafeAreaView style={styles.container}>
          <StatusBar style="auto"/>
             <Text style={styles.title}>원하는 음식점 찾기</Text>           
            <View style={styles.login_container}>
            
                <Text style={styles.second_text}>원하는 유형의 음식점을 선택해주세요</Text>
                <View style={{height: 200, flexDirection: 'row'}}>
                <View style={[styles.category_container,{backgroundColor: select===1 ? 'skyblue' : "#FFFFFF"},]}>
                <TouchableOpacity onPress={setclick1}> 
                       <Image source={require('../images/carrot.png')} style={{width: 80, height: 100,marginTop:"6%"}}/>
                       <Text style={styles.text}>다이어트</Text>
                       </TouchableOpacity> 
                       </View>       

                       <View style={[styles.category_container,{backgroundColor: select===2 ? 'skyblue' : "#FFFFFF"},]}>
                       <TouchableOpacity onPress={setclick2}>
                       <Image source={require('../images/heart.png')} style={{width: 70, height: 70}}/>
                       <Text style={styles.text1}>데이트</Text>
                       </TouchableOpacity>
                </View>
                <View style={[styles.category_container,{backgroundColor: select===3 ? 'skyblue' : "#FFFFFF"},]}>
                       <TouchableOpacity onPress={setclick3}>
                       <Image source={require('../images/book.png')} style={{width: 70, height: 70}}/>
                       <Text style={styles.text3_hon}>혼밥</Text>
                        </TouchableOpacity>
                </View>
                </View>
                <View style={{height: 200, flexDirection: 'row'}}>
                <View style={[styles.category_container,{backgroundColor: select===4 ? 'skyblue' : "#FFFFFF"},]}>
                       <TouchableOpacity onPress={setclick4}>
                       <Image source={require('../images/thumb.png')} style={{width: 70, height: 70}}/>
                       <Text style={styles.text}>찐맛집</Text>
                        </TouchableOpacity>
                </View>
                <View style={[styles.category_container,{backgroundColor: select===5 ? 'skyblue' : "#FFFFFF"},]}>
                       <TouchableOpacity onPress={setclick5}>
                       <Image source={require('../images/crown.png')} style={{width: 70, height: 70}}/>
                       <Text style={styles.text2_mo}>모임</Text>
                       </TouchableOpacity>
                </View>
                <View style={[styles.category_container,{backgroundColor: select===6 ? 'skyblue' : "#FFFFFF"},]}>
                       <TouchableOpacity onPress={setclick6}>
                       <Image source={require('../images/thunder.png')} style={{width: 70, height: 70}}/>
                       <Text style={styles.text}>번개추천</Text>
                        </TouchableOpacity>
                </View>
                </View>
                <Text>잘 모르시겠다면 번개추천을 눌러주세요</Text>

                <TouchableOpacity
                        onPress={() => setOk(!ok)}
                        style={styles.login_btn}
                    >
                    <Text style={styles.text2}>다음</Text>
                
            </TouchableOpacity>
            <TouchableOpacity
                        onPress={() => navigation.navigate("Cafeteria")}
                        style={styles.register_btn}
                    >
                    <Text style={styles.text3}>이전</Text>
            </TouchableOpacity>
            </View>

        </SafeAreaView>
    );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
  },
  image:{
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#2B82D4",
    textAlignVertical: 'center',
    textAlign: 'center',
    marginTop: "10%"
  },
  login_container: {
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    width: "90%",
    height: "95%",
    marginTop: "8%",
    marginHorizontal: "20%",
    borderRadius: 10,
    shadowColor: "gray",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  text3_hon: {
    fontSize:22,
    marginTop: "1%",
    fontWeight: "bold",
    paddingLeft: "20%"
  },
  category_container: {
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    width: "30%",
    height: "60%",
    flexDirection: 'row',
    marginTop: "9%",
    marginHorizontal: "1.5%",
    borderRadius: 30,
    shadowColor: "gray",
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  container_title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#878787",
    marginBottom: "4%"
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
    title_btn: {
      backgroundColor: "#2B82D4",
      alignItems: "center",
      justifyContent: "center",
      width: "95%",
      height: "5%",
      marginHorizontal: "40%",
      borderRadius: 5,
      marginTop: "-16%"
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
    login_text: {
      color: "#FFFFFF",
    },
    register_text: {
      color: "#2B82D4",
    }, 
    input: {
      marginTop: "1%",
      paddingHorizontal: 10,
      width: 260,
      height: 40,
      borderBottomColor: '#2B82D4',
      borderBottomWidth: 1,
  },
  text: {
      fontSize:22,
      marginTop: "1%",
      fontWeight: "bold",
      marginLeft:"8%",
      marginBottom: "25%"

  },
  text1: {
    fontSize:22,
    marginLeft:"10%",
    marginTop: "15%",
    fontWeight: "bold"
},
text3: {
  fontSize:22,
  marginLeft:"0%",
  
  fontWeight: "bold"
},
text2: {
  fontSize:22,
  marginTop: "1%",
  fontWeight: "bold"
},
text2_mo: {
  fontSize:22,
  marginTop: "1%",
  fontWeight: "bold",
  paddingLeft: "20%"
},
  second_text: {
      fontSize:18,
      marginTop: "-25%"
  },
  image_text: {
      fontSize:22,
      marginTop: "10%"
  },
  user:{
      backgroundColor:'white',
      marginHorizontal:20,
  }
})

/*const styles = StyleSheet.create({
  container:{
      flex:1,
      paddingTop:StatusBar.currentHeight,
      backgroundColor: '#FFFFFF',
  },
  scrollView:{
      backgroundColor:'white',
      marginHorizontal:20,
  },
  user:{
      backgroundColor:'white',
      marginHorizontal:20,
  },
  text: {
      fontSize:22, alignItems: "center"
  },
});*/

export default Category;

