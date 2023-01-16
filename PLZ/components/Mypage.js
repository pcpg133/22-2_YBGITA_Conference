import {useState, useEffect,useRef} from 'react';
import {Button} from 'react-native';
import React from 'react';
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
  Styled
} from 'react-native';
import main from "../images/main.png"
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import axios from 'axios'

import cafeteria from "../images/cafeteria.png";
import yonsei from "../images/yonsei.png";
import everytime from "../images/everytime.png";


function Mypage({ navigation }) {

  const [imageFile, setImageFile] = useState();
  const [imageName, setImageName] = useState();
  const isMounted = useRef(false);
  const isMounted2 = useRef(false);
  const [ok, setOk] = useState(false);

  const [select1, setselect1] = useState(false);
  const setclick1 = () => setselect1(!select1);

  const [select2, setselect2] = useState(false);
  const setclick2 = () => setselect2(!select2);

  const [select3, setselect3] = useState(false);
  const setclick3 = () => setselect3(!select3);

  const [select4, setselect4] = useState(false);
  const setclick4 = () => setselect4(!select4);

  const [select5, setselect5] = useState(false);
  const setclick5 = () => setselect5(!select5);

  const [select6, setselect6] = useState(false);
  const setclick6 = () => setselect6(!select6);

  const [select7, setselect7] = useState(false);
  const setclick7 = () => setselect7(!select7);

  const [select8, setselect8] = useState(false);
  const setclick8 = () => setselect8(!select8);

  const [image, setimage] = useState(true);
  const [nickname, setNickname] = useState("");

  const rtArr = [
      { id: "0", name: "박유찬님", image: everytime, prefer1:"공학관", prefer2:"언더우드관"},
  ];

  const [category, setCategory] = useState('diary');

  const secondRef = useRef();

  const registerImage = () => {
        uploadImage();
        setimage(false);
    };
    
   const uploadImage = () => {
        launchImageLibrary({                                               // 갤러리에서 가져오기
          mediaType: "photo",                                              // 사진만 가져온다
          quality: 1
        }, (res) => {
          if (res.didCancel) {
            Alert.alert("등록이 취소되었습니다");                           // 취소 시
          } else {
            console.log(res.assets[0])
            const { uri } = res.assets[0]
            setImageFile(uri);  
            console.log(imageFile)                                         // useState에 저장한다.
          }
        })
      }

const sendResult = async () => {
    const formData = new FormData();
    console.log("확인")
    console.log(imageFile)
    formData.append("file", {
      name: "name",
      type: "image/jpeg",
      uri: imageFile
    });
    try {
      const response = await axios.post("http://127.0.0.1:8080/time/upload", formData, {
        headers: {
          "content-type": "multipart/form-data"
        }
      }).then(response => console.log(response.status));
    } catch (e) {
      Alert.alert("Cant upload", "Try later");
    }
  };
    

    useEffect(() => {
            if(isMounted.current){
            sendResult();
            } else {
            isMounted.current = true;
            }
    }, [imageFile]);

    const sendResult2 = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8080/login/building", {
          method: "POST",
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            building: [select1,select2,select3,select4,select5,select6,select7,select8]
          }), 
        }).then(response => console.log(response.status));
        setResult(response.status);
      } catch (e) {}
    };

    useEffect(() => {
      if(isMounted2.current){
      sendResult2();
      navigation.navigate("Info")
      } else {
      isMounted2.current = true;
      }
     }, [ok]);

    const getResult = async () => {
      try {
        const response = await fetch(
          "http://127.0.0.1:8080/login/nickname"
        );
           const json = await response.json();
           setNickname(Object.values(json["nickname"]))
       } catch (e) {}
     };
   
   useEffect(() => {
       getResult();
   }, []);

      return (
        <SafeAreaView style={styles.container}>
        <StatusBar style="auto"/>
        <View style={styles.title_container}>
            <Text style={styles.title}>마이페이지</Text>
        </View>
        <View 
            style={styles.scroll_container}>
            <View style={styles.rt_container}>
                {rtArr.map((array, index) => {
                    return(
                        <View
                                key={index}
                                style={styles.rt_each}
                        >   

                            <View style={styles.info_container}>
                                <View style={styles.line}>
                                    <View>
                                        <Text style={styles.rt_name}>🧑🏻‍💻{nickname}</Text>
                                    </View>
                                </View>

                            </View>
                        

                            <View style={styles.info_container}>
                                <Text style={styles.star}> ▶️ </Text>
                            </View> 
                        </View>           
                     
                    );
                })
                } 
            </View>
            <View style={styles.container3}>
            <Text style={styles.image_text}>📆내 시간표</Text>
            </View>
            <View style={styles.image_container}>
            <TouchableOpacity
                    onPress={() => registerImage()}
                    style={styles.imageregister_btn}
                >
              {
                imageFile === " " ?
                  (<Icons name="meh" size={100} style={{ marginRight: 20 }} />)
                  :
                  (<Image
                    style={{ width : 366, height: 430, resizeMode:"stretch"}}
                    source={{
                        uri: imageFile
                      }}/>
                      )
                      
              }  

            </TouchableOpacity>
            <TouchableOpacity style={styles.resize} onPress={() => registerImage()}>


            <Text style={[styles.text,{opacity: (image)? 1 : 0}]}>   
              📌{"\n"}내 시간표{"\n"}등록하기</Text>
            </TouchableOpacity> 
            </View>



                        

        </View>



        <View style={styles.container2}>
        <Text style={styles.text}>즐겨찾는 강의실⭐️</Text>
            {/* <TouchableOpacity 
            onPress={() => navigation.navigate("Classroom")}>    
                <Text style={styles.star}> ⚙️ </Text>
            </TouchableOpacity> */}
        </View>
        <View style={styles.lecture_container}>
        
            
        <View style={styles.view_style}>
        <TouchableOpacity onPress={() => Alert.alert(
                        '즐겨찾는 강의실',
                        '즐겨찾는 강의실로 등록하시겠습니까?',
                        [
                          {text: '아니요(취소)', onPress:() =>
                          Alert.alert(
                            '취소 완료',
                            '성공적으로 취소되었습니다.',
                            [
                              {text: '확인', onPress:() => {setselect1(false)}},
                            ]
                          )
                          },
                          {text: '네(등록)', onPress:() =>
                          Alert.alert(
                            '등록 완료',
                            '성공적으로 등록되었습니다.',
                            [
                              {text: '확인', onPress:() => {setselect1(true)}},
                            ])
                            
                          },
                        ]
                      )}
            style={[styles.info_btn,{opacity: (select1)? 1 : 0.3},{backgroundColor:(select1)?"#92BEE7":"white"}]}>                    
            <Text style={styles.btn_text}>공학관</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Alert.alert(
                        '즐겨찾는 강의실',
                        '즐겨찾는 강의실로 등록하시겠습니까?',
                        [
                          {text: '아니요(취소)', onPress:() =>
                          Alert.alert(
                            '취소 완료',
                            '성공적으로 취소되었습니다.',
                            [
                              {text: '확인', onPress:() => {setselect2(false)}},
                            ]
                          )
                          },
                          {text: '네(등록)', onPress:() =>
                          Alert.alert(
                            '등록 완료',
                            '성공적으로 등록되었습니다.',
                            [
                              {text: '확인', onPress:() => {setselect2(true)}},
                            ])
                            
                          },
                        ]
                      )}
            style={[styles.info_btn,{opacity: (select2)? 1 : 0.3},{backgroundColor:(select2)?"#92BEE7":"white"}]}>                    
            <Text style={styles.btn_text}>공학원</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => Alert.alert(
                        '즐겨찾는 강의실',
                        '즐겨찾는 강의실로 등록하시겠습니까?',
                        [
                          {text: '아니요(취소)', onPress:() =>
                          Alert.alert(
                            '취소 완료',
                            '성공적으로 취소되었습니다.',
                            [
                              {text: '확인', onPress:() => {setselect3(false)}},
                            ]
                          )
                          },
                          {text: '네(등록)', onPress:() =>
                          Alert.alert(
                            '등록 완료',
                            '성공적으로 등록되었습니다.',
                            [
                              {text: '확인', onPress:() => {setselect3(true)}},
                            ])
                            
                          },
                        ]
                      )}
            style={[styles.info_btn,{opacity: (select3)? 1 : 0.3},{backgroundColor:(select3)?"#92BEE7":"white"}]}>                    
            <Text style={styles.btn_text}>대우관</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Alert.alert(
                        '즐겨찾는 강의실',
                        '즐겨찾는 강의실로 등록하시겠습니까?',
                        [
                          {text: '아니요(취소)', onPress:() =>
                          Alert.alert(
                            '취소 완료',
                            '성공적으로 취소되었습니다.',
                            [
                              {text: '확인', onPress:() => {setselect4(false)}},
                            ]
                          )
                          },
                          {text: '네(등록)', onPress:() =>
                          Alert.alert(
                            '등록 완료',
                            '성공적으로 등록되었습니다.',
                            [
                              {text: '확인', onPress:() => {setselect4(true)}},
                            ])
                            
                          },
                        ]
                      )}
            style={[styles.info_btn,{opacity: (select4)? 1 : 0.3},{backgroundColor:(select4)?"#92BEE7":"white"}]}>                    
            <Text style={styles.btn_text}>중앙도서관</Text>
        </TouchableOpacity>
       
        </View>
        <View style={styles.view_style}>

        <TouchableOpacity onPress={() => Alert.alert(
                        '즐겨찾는 강의실',
                        '즐겨찾는 강의실로 등록하시겠습니까?',
                        [
                          {text: '아니요(취소)', onPress:() =>
                          Alert.alert(
                            '취소 완료',
                            '성공적으로 취소되었습니다.',
                            [
                              {text: '확인', onPress:() => {setselect5(false)}},
                            ]
                          )
                          },
                          {text: '네(등록)', onPress:() =>
                          Alert.alert(
                            '등록 완료',
                            '성공적으로 등록되었습니다.',
                            [
                              {text: '확인', onPress:() => {setselect5(true)}},
                            ])
                            
                          },
                        ]
                      )}
            style={[styles.info_btn,{opacity: (select5)? 1 : 0.3},{backgroundColor:(select5)?"#92BEE7":"white"}]}>                    
            <Text style={styles.btn_text}>삼성관</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Alert.alert(
                        '즐겨찾는 강의실',
                        '즐겨찾는 강의실로 등록하시겠습니까?',
                        [
                          {text: '아니요(취소)', onPress:() =>
                          Alert.alert(
                            '취소 완료',
                            '성공적으로 취소되었습니다.',
                            [
                              {text: '확인', onPress:() => {setselect6(false)}},
                            ]
                          )
                          },
                          {text: '네(등록)', onPress:() =>
                          Alert.alert(
                            '등록 완료',
                            '성공적으로 등록되었습니다.',
                            [
                              {text: '확인', onPress:() => {setselect6(true)}},
                            ])
                            
                          },
                        ]
                      )}
            style={[styles.info_btn,{opacity: (select6)? 1 : 0.3},{backgroundColor:(select6)?"#92BEE7":"white"}]}>                    
            <Text style={styles.btn_text}>언더우드관</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Alert.alert(
                        '즐겨찾는 강의실',
                        '즐겨찾는 강의실로 등록하시겠습니까?',
                        [
                          {text: '아니요(취소)', onPress:() =>
                          Alert.alert(
                            '취소 완료',
                            '성공적으로 취소되었습니다.',
                            [
                              {text: '확인', onPress:() => {setselect7(false)}},
                            ]
                          )
                          },
                          {text: '네(등록)', onPress:() =>
                          Alert.alert(
                            '등록 완료',
                            '성공적으로 등록되었습니다.',
                            [
                              {text: '확인', onPress:() => {setselect7(true)}},
                            ])
                            
                          },
                        ]
                      )}
            style={[styles.info_btn,{opacity: (select7)? 1 : 0.3},{backgroundColor:(select7)?"#92BEE7":"white"}]}>                    
            <Text style={styles.btn_text}>위당관</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Alert.alert(
                        '즐겨찾는 강의실',
                        '즐겨찾는 강의실로 등록하시겠습니까?',
                        [
                          {text: '아니요(취소)', onPress:() =>
                          Alert.alert(
                            '취소 완료',
                            '성공적으로 취소되었습니다.',
                            [
                              {text: '확인', onPress:() => {setselect8(false)}},
                            ]
                          )
                          },
                          {text: '네(등록)', onPress:() =>
                          Alert.alert(
                            '등록 완료',
                            '성공적으로 등록되었습니다.',
                            [
                              {text: '확인', onPress:() => {setselect8(true)}},
                            ])
                            
                          },
                        ]
                      )}
            style={[styles.info_btn,{opacity: (select8)? 1 : 0.3},{backgroundColor:(select8)?"#92BEE7":"white"}]}>                    
            <Text style={styles.btn_text}>경영관</Text>
        </TouchableOpacity>
        </View>
        </View>
        <TouchableOpacity
                    onPress={() => setOk(!ok)}
                    style={styles.login_btn}
                >
                <Text style={styles.text}>다음</Text>
          </TouchableOpacity>

    </SafeAreaView>



    


        
    );
}

export default Mypage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    //justifyContent: "center",
  },
  container2: {
      height: 30,
      flexDirection: 'row',
      justifyContent:"space-between",
      width:363,
      marginTop:"-22%",
      marginBottom:"17%"
    },
    container3: {
      height: 80,
      justifyContent:"center",
      width:100,
      marginTop:"-30%",
      marginBottom:"17%",
      marginLeft:"4%"
    },
    
  bg_image: {
      width: "100%",
      height: "100%",
      resizeMode: "cover",
    },
  image:{
      marginTop:"30%",
      width: 370,
      height: 400,
      marginLeft: "2%",
      marginRight: "10%",
      padding: '20%',
      resizeMode:"stretch",
      borderWidth: 2,
      borderColor: "#92BEE7"
      
  },
  info_btn: {
      alignItems: "center",
      justifyContent: "center",
      width: "70%",
      height: "55%",
      marginTop: "10%",
      marginHorizontal: "3%",
      borderColor: "#92BEE7",
      backgroundColor:"#92BEE7",
      borderWidth: 4,
      borderRadius: 30,
    },
  title_container: { marginTop: "-5%",
  width: "30%",
  height: "20%"
  
  },
  title: {
    fontSize: 23,
    fontWeight: "bold",
 
    marginTop: "40%",
    marginLeft: "3%"
  },
  star: {
      marginRight:"5%",
      fontSize:20,
      alignItems: "center"

    },
  text: {
      fontSize: 17,
      fontWeight: "bold",
      alignItems: "flex-start",
      marginBottom: "3%"

    },
  image_text: {
      fontSize: 23,
      fontWeight: "bold",
      width:200,
      marginTop: "40%",
      marginLeft: "3%"
    },
  scroll_container: {
      marginTop: "-20%",
      width: "100%",
      height: "80%"
  },
  resize: {
    marginTop:"-25%"

},
  login_btn: {
      backgroundColor: "#92BEE7",
      alignItems: "center",
      justifyContent: "center",
      width: "30%",
      height: "5%",
      marginHorizontal: "10%",
      borderRadius: 5,
      marginTop: "2%"
    },
    imageregister_btn: {
      backgroundColor: "#92BEE7",
      alignItems: "center",
      justifyContent: "center",
      width: "30%",
      height: "25%",
      marginTop:"-8%",
      resizeMode:"stretch",
      borderRadius: 20,
    },
  map_container: {
      marginTop: "-50%",
      width: "100%",
      height: "80%"
  },
  image_container: {
      marginTop: "-17%",
      marginBottom: "6%",
      width: 366,
      height: 430,
      marginLeft: "3%",
      marginRight: "2%",
      borderWidth:10,
      borderColor: "#92BEE7",
      justifyContent: 'center',
      alignItems: "center",
      resizeMode:"stretch",
      marginHorizontal: "3%",
  },
  lecture_container: {
      marginTop: "-21%",
      marginLeft:"35%",
      marginRight:"10%",
      width: 300,
      height: 130,
      alignItems: "flex-start",
      justifyContent: "center",
  },
  info_container: {
      marginTop: "1%",
      marginRight:"4%",
      marginLeft:"2%",
      width: "80%",
      height: "120%"
  },
  rt_each:{
      //backgroundColor: "blue",
      width: "100%",
      height: "20%",
      flexDirection: "row",
      borderBottomColor: '#EFEFEF',
      borderBottomWidth: 2,
      paddingTop: "-20%"
  },
  rt_name:{
      textAlign: "left",
      fontSize: 20,
     
      marginTop: "1%",
      marginLeft: "5%"
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
      fontSize: 18,
      marginTop: "30%",
      marginLeft: "5%"
  },
  rt_category: {
      color: "#939393",
      textAlign: "left",
      fontSize: 17,
      marginTop: "20%",
      marginLeft: "5%"
  },
  rt_hash: {
      color: "#2B82D4",
      textAlign: "left",
      fontSize: 17,
      marginTop: "12%",
      marginLeft: "5%"
  },
  view_style: {height: 80, width:100,
      flexDirection: 'row',
       marginTop: "-7%",
       marginHorizontal: "17%",
       alignItems: "center",
       justifyContent: "center",
       paddingTop: "3%"
     },
  line: {
      flexDirection: "row"
  },
  detail_btn: {
      backgroundColor: "#D3E5F5",
      alignItems: "center",
      justifyContent: "center",
      width: 90,
      height: 30,
      marginLeft: "25%",
      borderRadius: 5,
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
      width: 300,
      height: 500,
      marginTop: "5%",
      marginHorizontal: 10,

      justifyContent: 'space-between'
      
     
    },

    btn_text: {
      fontSize:14,
      marginLeft: "1%"
     
  }
})



