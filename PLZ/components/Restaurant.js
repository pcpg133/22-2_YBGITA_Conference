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
import cafeteria from "../images/cafeteria.png";


const Restaurant = ({navigation}) => {
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
  const setclick7 = () => setselect(7);
  const setclick8 = () => setselect(8);

  const sendResult = async () => {
    console.log(select)
    try {
      const response = await fetch("http://127.0.0.1:8080/category/Mcategory", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          Mcategory: select,
        }), 
      }).then(response => console.log(response.status));
      setResult(response.status);
    } catch (e) {}
  };

  useEffect(() => {
    if(isMounted.current){
      sendResult();
      //navigation.navigate("Result")
      navigation.navigate("Menu", {
        num: select
      });
    } else {
     isMounted.current = true;
    }
  }, [ok]);
    return (
    
        <SafeAreaView style={styles.container}>
          <StatusBar style="auto"/>
             <Text style={styles.title}>원하는 음식점 찾기</Text>           
            <ScrollView 
                    style={styles.scroll_container}
                    contentContainerStyle={{ flexGrow: 1, alwaysBounceVertical: false, bounces: false}}
                    >
                {/* <Text style={styles.second_text}>원하는 유형의 음식점을 선택해주세요.</Text> */}
                
                
                <View style={{height: 220, flexDirection: 'row'}}>
                    <View style={{flex: 1, alignItems: "center"}}>
                        <View style={{alignItems: 'center'}}>
                        <TouchableOpacity onPress={setclick1}>
                        <Image style={[styles.image,{opacity: (select===1 || select===0)? 1 : 0.2}]} source={require('../images/0.jpg')}/>
                        </TouchableOpacity>  
                        </View>
                        <View>
                        <Text style={styles.image_text}>한식</Text>
                        </View>
                    </View>
                    <View style={{flex: 1, alignItems: "center"}}>
                        <View style={{alignItems: 'center'}}>
                        <TouchableOpacity onPress={setclick2}>
                        <Image style={[styles.image,{opacity: (select===2 || select===0)? 1 : 0.2}]} source={require('../images/12.jpg')}/>
                        </TouchableOpacity>
                        </View>
                        <View>
                        <Text style={styles.image_text}>양식</Text>
                        </View>
                    </View>
                </View>
                <View style={{height: 220, flexDirection: 'row'}}>
                    <View style={{flex: 1, alignItems: "center"}}>
                        <View style={{alignItems: 'center', }}>
                        <TouchableOpacity onPress={setclick3}>
                        <Image style={[styles.image,{opacity: (select===3 || select===0)? 1 : 0.2}]} source={require('../images/3.jpg')}/>
                        </TouchableOpacity>
                        </View>
                        <View>
                        <Text style={styles.image_text}>중식</Text>
                        </View>
                    </View>

                    <View style={{flex: 1, alignItems: "center"}}>
                        <View style={{alignItems: 'center', }}>
                        <TouchableOpacity onPress={setclick4}>
                        <Image style={[styles.image,{opacity: (select===4 || select===0)? 1 : 0.2}]} source={require('../images/6.jpg')}/>
                        </TouchableOpacity>
                        </View>
                        
                        <View>
                        <Text style={styles.image_text}>일식</Text>
                        </View>
                    </View>
                </View>
                <View style={{height: 220, flexDirection: 'row'}}>
                    <View style={{flex: 1, alignItems: "center"}}>
                        <View style={{alignItems: 'center', }}>
                        <TouchableOpacity onPress={setclick5}>
                        <Image style={[styles.image,{opacity: (select===5 || select===0)? 1 : 0.2}]} source={require('../images/9.jpg')}/>
                        </TouchableOpacity>
                        </View>
                        <View>
                        <Text style={styles.image_text}>분식</Text>
                        </View>
                    </View>

                    <View style={{flex: 1, alignItems: "center"}}>
                        <View style={{alignItems: 'center', }}>
                        <TouchableOpacity onPress={setclick6}>
                        <Image style={[styles.image,{opacity: (select===6 || select===0)? 1 : 0.2}]} source={require('../images/11.jpg')}/>
                        </TouchableOpacity>
                        </View>
                        
                        <View>
                        <Text style={styles.image_text}>패스트푸드</Text>
                        </View>
                    </View>
                </View>
                <View style={{height: 220, flexDirection: 'row'}}>
                    <View style={{flex: 1, alignItems: "center"}}>
                        <View style={{alignItems: 'center', }}>
                        <TouchableOpacity onPress={setclick7}>
                        <Image style={[styles.image,{opacity: (select===7 || select===0)? 1 : 0.2}]} source={require('../images/15.jpg')}/>
                        </TouchableOpacity>
                        </View>
                        <View>
                        <Text style={styles.image_text}>닭요리</Text>
                        </View>
                    </View>

                    <View style={{flex: 1, alignItems: "center"}}>
                        <View style={{alignItems: 'center', }}>
                        <TouchableOpacity onPress={setclick8}>
                        <Image style={[styles.image,{opacity: (select===8 || select===0)? 1 : 0.2}]} source={require('../images/30.jpg')}/>
                        </TouchableOpacity>
                        </View>
                        
                        <View>
                        <Text style={styles.image_text}>별식/퓨전요리</Text>
                        </View>
                    </View>
                </View>                
                </ScrollView>


              <TouchableOpacity
                        onPress={() => setOk(!ok)}
                        style={styles.login_btn}
                    >
                    <Text style={styles.text}>다음</Text>
              </TouchableOpacity>
              <TouchableOpacity
                        onPress={() => navigation.navigate("Category")}
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
      justifyContent: "center",
    },
    image:{
      width: 150,
      height: 150,
    
    },
    title: {
      fontSize: 25,
      fontWeight: "bold",
      color: "#2B82D4",
      textAlignVertical: 'center',
      textAlign: 'center',
      marginTop: "10%",
      marginBottom: "-30%"

    },
    login_container: {
      backgroundColor: "#FFFFFF",
      alignItems: "center",
      justifyContent: "center",
      width: "90%",
      height: "95%",
      marginTop: "8%",
      marginHorizontal: "8%",
      borderRadius: 10,
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
        marginTop: "1%"
    },
    second_text: {
        fontSize:20,
        marginTop: "-25%"
    },
    image_text: {
        fontSize:22,
        marginTop: "10%"
    },
    user:{
        backgroundColor:'white',
        marginHorizontal:20,
    },
    scroll_container: {
      paddingTop: "30%",
      paddingBottom: "50%",
      marginTop: "5%",
      height: "100%",
      width: "100%",
      marginHorizontal: "10%",
      contentOffset:{x: 0, y: -50},
    
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

export default Restaurant;

