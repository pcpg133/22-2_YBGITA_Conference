import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground
} from 'react-native';
import main from "../images/main.png"

function Main ({ navigation }) {

  return (
     <View style={styles.container}>
      <StatusBar style="auto"/>
      <ImageBackground source={main} style={styles.image}>
        <View>
          <Text style={styles.title}>고르샘~</Text> 
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate("Login")}
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
      </ImageBackground>
    </View>
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
  title: {
    fontSize: 65,
    fontWeight: "bold",
    color: "#FFFFFF",
    textAlignVertical: 'center',
    textAlign: 'center',
    marginTop: "28%"
  },
  login_btn: {
    backgroundColor: "#2B82D4",
    alignItems: "center",
    justifyContent: "center",
    width: "80%",
    height: "6%",
    marginTop: "92%",
    marginHorizontal: "10%",
    borderRadius: 5,
  },
  register_btn: {
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    width: "80%",
    height: "6%",
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
  }
});

export default Main;