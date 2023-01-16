import React, {useState, useEffect, useRef} from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  Alert
} from 'react-native';
import login_register from "../images/login_register.png"

function Login({ navigation }) {

    const [result, setResult] = useState([]);
    const [ok, setOk] = useState(false);
    const isMounted = useRef(false);
    const [login, setLogin] = useState("");

    const secondRef = useRef();
    const [inputs, setInputs] = useState({
      id: '',
      pw: ''
    });
    const { id, pw } = inputs;

    const onChange = (keyvalue, e) => {
      const {text} = e.nativeEvent
      setInputs({
        ...inputs, 
        [keyvalue]: text 
      });
    };

    const onReset = () => {
      setInputs({
        id: '',
        pw: '',
      })
    };

    const sendResult = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8080/login", {
          method: "POST",
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            username: id,
            password: pw,
          }), 
        });
        setResult(Object.values(response));
      } catch (e) {}
    };
  
    useEffect(() => {
      if(isMounted.current){
        sendResult();
        navigation.navigate("Mypage");
      } else {
       isMounted.current = true;
      }
    }, [ok]);

    return (
        <View style={styles.container}>
          <StatusBar style="auto"/>
            <ImageBackground source={login_register} style={styles.image}>
                <View>
                    <Text style={styles.title}>로그인</Text>
                </View>
                <View style={styles.login_container}>
                    <View>
                        <Text style={styles.container_title}>Log in</Text>
                    </View>
                    <View>
                        <View>
                            <TextInput
                                style={styles.input}
                                placeholder="아이디"
                                onChange={(e) => onChange("id", e)}
                                value={id}
                                onSubmitEditing={() => secondRef.current.focus()}
                            >
                            </TextInput>
                        </View>
                        <View>
                            <TextInput
                                style={styles.input}
                                placeholder="비밀번호"
                                onChange={(e) => onChange("pw", e)}
                                value={pw}
                                secureTextEntry={true}
                                onSubmitEditing={() => secondRef.current.focus()}
                            >
                            </TextInput>
                        </View>
                    </View>
                    <TouchableOpacity
                        onPress={() => 
                          setOk(!ok)
                        }
                        style={styles.login_btn}
                    >
                    <Text style={styles.login_text}>로그인</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => navigation.navigate("Register")}
                        style={styles.register_btn}
                    >
                    <Text style={styles.register_text}>회원가입</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        </View>
    );
}

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
    title: {
      fontSize: 25,
      fontWeight: "bold",
      color: "#2B82D4",
      textAlignVertical: 'center',
      textAlign: 'center',
      marginTop: "33%"
    },
    login_container: {
      backgroundColor: "#FFFFFF",
      alignItems: "center",
      justifyContent: "center",
      width: "88%",
      height: "40%",
      marginTop: "5%",
      marginHorizontal: "6%",
      borderRadius: 12,
      shadowColor: "gray",
      shadowOffset: {
        width: 0,
        height: 2,
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
        height: "15%",
        marginHorizontal: "10%",
        borderRadius: 5,
        marginTop: "5%"
      },
      register_btn: {
        backgroundColor: "#FFFFFF",
        alignItems: "center",
        justifyContent: "center",
        width: "80%",
        height: "15%",
        marginTop: "5%",
        marginHorizontal: "10%",
        borderColor: "#92BEE7",
        borderWidth: 1,
        borderRadius: 5,
      },
      login_text: {
        color: "#FFFFFF",
        fontWeight: "bold"
      },
      register_text: {
        color: "#2B82D4",
        fontWeight: "bold"
      }, 
      input: {
        marginTop: "1%",
        paddingHorizontal: 10,
        width: 260,
        height: 40,
        borderBottomColor: '#2B82D4',
        borderBottomWidth: 1,
      }
})

export default Login;