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
  Pressable
} from 'react-native';


const Info = ({navigation}) => {
  const [select, setselect] = useState(0);
  const [timeselect, settimeselect] = useState(0);
  const [result, setResult] = useState();
  const isMounted = useRef(false);
  const secondRef = useRef();
  const [ok, setOk] = useState(false);
  const [myTime, setMyTime] = useState("");
  const [nickname, setNickname] = useState("");

  const setclick1 = () => setselect(1);
  const setclick2 = () => setselect(2);
  const setclick3 = () => setselect(3);
  const setclick4 = () => setselect(4);
  const setclick5 = () => setselect(5);
  const setclick6 = () => setselect(6);
  const setclick7 = () => setselect(7);
  const setclick8 = () => setselect(8);

  const settimeclick1 = () => settimeselect(1);
  const settimeclick2 = () => settimeselect(2);
  const settimeclick3 = () => settimeselect(3);
  const settimeclick4 = () => settimeselect(4);

  const mapping ={
    "0": "공학관",
    "1": "공학원",
    "2": "대우관",
    "3": "중앙도서관",
    "4": "삼성관",
    "5": "언더우드관",
    "6": "위당관",
    "7": "경영관"
  }

  const [star, setStar] = useState([])

  const sendResult = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8080/time", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          emptyTime: timeselect,
          startpoint: select
        }), 
      }).then(response => console.log(response.status));
      setResult(response.status);
    } catch (e) {}
  };

  useEffect(() => {
    if(isMounted.current){
      sendResult();
      navigation.navigate("Start");
    } else {
     isMounted.current = true;
    }
  }, [ok]);

  const getResult = async () => {
    try {
      const response = await fetch(
        "http://127.0.0.1:8080/time"
      );
         const json = await response.json();
         setMyTime(Object.values(json["time"]))
     } catch (e) {}
   };

   const getResult2 = async () => {
    try {
       const response = await fetch(
         "http://127.0.0.1:8080/login/nickname"
       );

         const json = await response.json();
         
         setNickname(Object.values(json["nickname"]))
         console.log(nickname)
     } catch (e) {}
   };

   const getResult3 = async () => {
     try {
       const response = await fetch(
         "http://127.0.0.1:8080/login/find"
       );
         const json = await response.json();
         setStar(Object.values(json))
     } catch (e) {}
   };
 
    useEffect(() => {
        getResult();
        getResult2();
        getResult3()
    }, []);

    return (
    
        <SafeAreaView style={styles.container}>
          <StatusBar style="auto"/>
             <Text style={styles.title}>정보 입력</Text>           
            <View style={styles.login_container}>
                <View style={styles.subtitle}>
                <Text style={styles.text}>🏫&nbsp;&nbsp;&nbsp;&nbsp;현재 계신 건물은 어디인가요?</Text>
                </View>
                <View style={styles.view_style}>

                <TouchableOpacity onPress={setclick1}
                    style={[styles.info_btn,{opacity: (select===1 || select===0)? 1 : 0.2}]}>                    
                                      <View style = {{flexDirection:"row"}}>
                    <Text style={styles.btn_text2}>공학관</Text><Text style={{height: !star[0] ? 0 : 20, width: !star[0] ? 0 : 20}}>💛</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={setclick2}
                    style={[styles.info_btn,{opacity: (select===2 || select===0)? 1 : 0.2}]}>
                                      <View style = {{flexDirection:"row"}}>
                    <Text style={styles.btn_text2}>공학원</Text><Text style={{height: !star[1] ? 0 : 20, width: !star[1] ? 0 : 20}}>💛</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={setclick3}
                    style={[styles.info_btn,{opacity: (select===3 || select===0)? 1 : 0.2}]}>
                                      <View style = {{flexDirection:"row"}}>

                    <Text style={styles.btn_text2}>대우관</Text><Text style={{height: !star[2]? 0 : 20, width: !star[2] ? 0 : 20}}>💛</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={setclick4}
                    style={[styles.info_btn,{opacity: (select===4 || select===0)? 1 : 0.2}]}>
                    
                    <View style = {{flexDirection:"row"}}>
                    <Text style={styles.btn_text2}>중앙도서관</Text><Text style={{height: !star[3] ? 0 : 20, width: !star[3] ? 0 : 20}}>💛</Text>

                    </View>
                </TouchableOpacity>

                </View>
                <View style={styles.view_style}>

                <TouchableOpacity onPress={setclick5}
                    style={[styles.info_btn,{opacity: (select===5 || select===0)? 1 : 0.2}]}>
                    
                    <View style = {{flexDirection:"row"}}>
                    <Text style={styles.btn_text2}>삼성관</Text><Text style={{height: !star[4] ? 0 : 20, width: !star[4] ? 0 : 20}}>💛</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={setclick6}
                    style={[styles.info_btn,{opacity: (select===6 || select===0)? 1 : 0.2}]}>
                    
                    <View style = {{flexDirection:"row"}}>
                    <Text style={styles.btn_text2}>언더우드관</Text><Text style={{height: !star[5] ? 0 : 15, width: !star[5] ? 0 : 15}}>💛</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={setclick7}
                    style={[styles.info_btn,{opacity: (select===7 || select===0)? 1 : 0.2}]}>
                    
                    <View style = {{flexDirection:"row"}}>
                    <Text style={styles.btn_text2}>위당관</Text><Text style={{height: !star[6] ? 0 : 20, width: !star[6] ? 0 : 20}}>💛</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={setclick8}
                    style={[styles.info_btn,{opacity: (select===8 || select===0)? 1 : 0.2}]}>
                    <View style = {{flexDirection:"row"}}>
                    <Text style={styles.btn_text2}>경영관</Text><Text style={{height: !star[7] ? 0 : 20, width: !star[7] ? 0 : 20}}>💛</Text>
                    </View>
                </TouchableOpacity>
                </View>
                <View style={styles.subtitle}>
                <Text style={styles.subtext}>
                ⏰&nbsp;&nbsp;&nbsp;&nbsp;{nickname}님의 현재 공강 시간은 {myTime}이네요!{"\n"}식사에 쓸 수 있는 시간을 알려주세요
                </Text>
                </View>  
                <View style={styles.view_style2}>

                <TouchableOpacity onPress={settimeclick1}
                    style={[styles.time_btn,{opacity: (timeselect===1 || timeselect===0)? 1 : 0.2}]}>
                    
                    <Text style={styles.btn_text}>1시간</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={settimeclick2}
                    style={[styles.time_btn,{opacity: (timeselect===2 || timeselect===0)? 1 : 0.2}]}>
                    
                    <Text style={styles.btn_text}>2시간</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={settimeclick3}
                    style={[styles.time_btn,{opacity: (timeselect===3 || timeselect===0)? 1 : 0.2}]}>
                    
                    <Text style={styles.btn_text}>3시간</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={settimeclick4}
                    style={[styles.time_btn,{opacity: (timeselect===4 || timeselect===0)? 1 : 0.2}]}>
                    
                    <Text style={styles.btn_text}>4시간</Text>
                </TouchableOpacity>

                </View>             


            

                <TouchableOpacity
                        onPress={() => setOk(!ok)}
                        style={styles.login_btn}
                    >
                    <Text style={styles.nexttext}>다음</Text>
                
            </TouchableOpacity>
            <TouchableOpacity
                        onPress={() => navigation.navigate("Mypage")}
                        style={styles.register_btn}
                    >
                    <Text style={styles.text_before}>이전</Text>
            </TouchableOpacity>
            </View>
            
        </SafeAreaView>
    );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image:{
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  subtitle: {
    fontSize: 25,
    fontWeight: "bold",
    textAlignVertical: 'center',
    textAlign: 'center',
    marginTop: "7%",
    marginBottom: "2%",
    marginLeft: "5%"
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    textAlignVertical: 'center',
    textAlign: 'center',
    marginTop: "10%"
  },
  login_container: {
    backgroundColor: "#FFFFFF",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    width: "90%",
    height: "95%",
    marginTop: "7%",
    marginHorizontal: "10%",
    borderRadius: 10,
    shadowColor: "gray",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
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
  subtext: {
    fontSize: 18,
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
      marginTop: "30%"
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
      marginTop: "4%",
      marginHorizontal: "10%",
      borderColor: "#92BEE7",
      borderWidth: 1,
      borderRadius: 5,
    },
    time_btn: {
        alignItems: "center",
        justifyContent: "center",
        width: 80,
        height: 40,
        marginTop: "10%",
        marginHorizontal: "3%",
        borderColor: "#92BEE7",
        borderWidth: 4,
        borderRadius: 50,
        hitSlop:{ top: 60, bottom: 400000, left: 60, right: 60 },
      },
    info_btn: {
        alignItems: "center",
        justifyContent: "center",
        width: 80,
        height: 40,
        marginTop: "10%",
        marginHorizontal: "3%",
        borderColor: "#92BEE7",
        borderWidth: 4,
        borderRadius: 30,
        
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
      fontSize:20,
      marginTop: "15%",
      
  },
  
  nexttext: {
    fontSize:20,
    color:"white",
    marginTop: "-1%",
    
},
text_before: {
  fontSize:20,
  color:"black",
  marginTop: "1%",
  
},
  btn_text: {
    fontSize:14,
   
},
btn_text2: {
  fontSize:11,
 
},
  second_text: {
      fontSize:18,
      marginTop: "-25%"
  },
  image_text: {
      fontSize:22,
      marginTop: "10%"
  },
  view_style: {height: 100, width:100,
     flexDirection: 'row',
      marginTop: "-6%",
      marginHorizontal: "35%",
      alignItems: "center",
      justifyContent: "center",
      width: "30%"

    },
    view_style2: {height: 100, width:300,
      flexDirection: 'row',
      marginTop: "-6%",
      marginHorizontal: "35%",
      alignItems: "center",
      justifyContent: "center",
      width: "30%"
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

export default Info;