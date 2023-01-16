import React, {useState,Component, useEffect, useRef} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Dimensions,
  Animated,
  PanResponder,
  Image,
  TouchableOpacity,
  Navigation,
  Icon,
  Alert,
  navigation,
} from 'react-native';

import { NavigationScreenProps } from "react-navigation";

import a from "../images/1.jpg";
import aa from "../images/2.jpg";
import b from "../images/3.jpg";
import bb from "../images/4.jpg";
import c from "../images/5.jpg";
import cc from "../images/6.jpg";
import d from "../images/7.jpg";
import dd from "../images/8.jpg";
import e from "../images/9.jpg";
import ee from "../images/10.jpg";
import f from "../images/11.jpg";
import ff from "../images/12.jpg";
import g from "../images/13.jpg";
import gg from "../images/14.jpg";
import h from "../images/15.jpg";
import hh from "../images/16.jpg";
import i from "../images/17.jpg";
import ii from "../images/18.jpg";
import j from "../images/19.jpg";
import jj from "../images/20.jpg";
import k from "../images/21.jpg";
import kk from "../images/22.jpg";
import l from "../images/23.jpg";
import ll from "../images/24.jpg";
import m from "../images/25.jpg";
import mm from "../images/26.jpg";
import n from "../images/27.jpg";
import nn from "../images/28.jpg";
import o from "../images/29.jpg";
import oo from "../images/30.jpg";
import p from "../images/31.jpg";
import pp from "../images/32.jpg";
import q from "../images/33.jpg";
import qq from "../images/34.jpg";
import r from "../images/35.jpg";
import rr from "../images/36.jpg";
import z from "../images/0.jpg";

//const [ok, setOk] = useState(false);

const getRandom = (min, max) => Math.floor(Math.random() * (max - min) + min);
const list = 
  [z,a,aa,b,bb,c,cc,d,dd,e,ee,f,ff,g,gg,h,hh,i,ii,j,jj,k,kk,l,ll,m,mm,n,nn,o,oo,p,pp,q,qq,r,rr]
const list2 =
  [getRandom(0,36),getRandom(0,36),getRandom(0,36),getRandom(0,36),getRandom(0,36)]

  console.log(list2)
  // const sendResult = async () => {
  //   try {
  //     const response = await fetch("http://127.0.0.1:8080/image/result", {
  //       method: "POST",
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify({
  //         num: list2
  //       }), 
  //     }).then(response => console.log(response.status));
  //     setResult(response.status);
  //   } catch (e) {}
  // };

  // useEffect(() => {
  //   if(isMounted.current){
  //     sendResult();
  //     //navigation.navigate("Result");
  //   } else {
  //    isMounted.current = true;
  //   }
  // }, []);



const array = [];


const DCONTENT = [
  {
    picture: list[list2[0]]
  },
  {
    picture: list[list2[1]]
  },
  {
    picture: list[list2[2]]
  },
  {
    picture: list[list2[3]]
  },
  {
    picture: list[list2[4]]
  },
];

const DEMO = [
  {
    id: '1',
    cardTitle: 'Card 11',
    backgroundColor: '#FFC107',
  },
  {
    id: '2',
    cardTitle: 'Card 2',
    backgroundColor: '#ED2525',
    

  },
  {
    id: '3',
    cardTitle: 'Card 3',
    backgroundColor: '#E7088E',
    

  },
  {
    id: '4',
    cardTitle: 'Card 11',
    backgroundColor: '#00BCD4',

  },
  {
    id: '5',
    cardTitle: 'Card 5',
    backgroundColor: '#FFFB14',

  },
];

const DEMO_CONTENT = DEMO.concat(DCONTENT);
const SCREEN_WIDTH = Dimensions.get('window').width;

const SwipeableCard = ({item, removeCard, swipedDirection}) => {
  // let xPosition = new Animated.Value(0);
  const [xPosition, setXPosition] = useState(new Animated.Value(0));

  let swipeDirection = '';
  let cardOpacity = new Animated.Value(1);
  let rotateCard = xPosition.interpolate({
    inputRange: [-200, 0, 200],
    outputRange: ['-20deg', '0deg', '20deg'],
  });

  let panResponder = PanResponder.create({
    onStartShouldSetPanResponder:
      (evt, gestureState) => false,
    onMoveShouldSetPanResponder:
      (evt, gestureState) => true,
    onStartShouldSetPanResponderCapture: 
      (evt, gestureState) => false,
    onMoveShouldSetPanResponderCapture:
      (evt, gestureState) => true,
    onPanResponderMove:
      (evt, gestureState) => {
        xPosition.setValue(gestureState.dx);
        if (gestureState.dx > SCREEN_WIDTH - 250) {
          swipeDirection = 'Right';
        } else if (gestureState.dx < -SCREEN_WIDTH + 250) {
          swipeDirection = 'Left';
        }
      },
    onPanResponderRelease: (evt, gestureState) => {
      if (
        gestureState.dx < SCREEN_WIDTH - 150 &&
        gestureState.dx > -SCREEN_WIDTH + 150
      ) {
        swipedDirection('--');
        Animated.spring(xPosition, {
          toValue: 0,
          speed: 5,
          bounciness: 10,
          useNativeDriver: false,
        }).start();
      } else if (gestureState.dx > SCREEN_WIDTH - 150) {
        Animated.parallel([
          Animated.timing(xPosition, {
            toValue: SCREEN_WIDTH,
            duration: 200,
            useNativeDriver: false,
          }),
          Animated.timing(cardOpacity, {
            toValue: 0,
            duration: 200,
            useNativeDriver: false,
          }),
        ]).start(() => {
          swipedDirection(swipeDirection);
          removeCard();
          console.log('좋아요')
          array.push('true')
          console.log(array)
          Alert.alert('좋아요');
        });
      } else if (gestureState.dx < -SCREEN_WIDTH + 150) {
        Animated.parallel([
          Animated.timing(xPosition, {
            toValue: -SCREEN_WIDTH,
            duration: 200,
            useNativeDriver: false,
          }),
          Animated.timing(cardOpacity, {
            toValue: 0,
            duration: 200,
            useNativeDriver: false,
          }),
        ]).start(() => {
          swipedDirection(swipeDirection);
          removeCard();
          console.log('싫어요')
          array.push('false')
          console.log(array)
          Alert.alert('싫어요');
        });
      }
    },
  });

  return (
    <Animated.View
      {...panResponder.panHandlers}
      style={[
        styles.cardStyle,
        {
          backgroundColor: item.backgroundColor,
          opacity: cardOpacity,
          transform: [{translateX: xPosition}, {rotate: rotateCard}],
        },
      ]}>
    <Image source = {item.picture} style={{width: 340, height: 410}}/>
    </Animated.View>
  );
};

const Random = ({navigation}) => {
  const isMounted = useRef(false);

  const secondRef = useRef();
  const [ok, setOk] = useState(false);
  const [noMoreCard, setNoMoreCard] = useState(false);
  const [
    sampleCardArray,
    setSampleCardArray
  ] = useState(DEMO_CONTENT);
  const [swipeDirection, setSwipeDirection] = useState('--');

  const removeCard = (id) => {
    // alert(id);
    sampleCardArray.splice(
      sampleCardArray.findIndex((item) => item.id == id),
      1,
    );
    setSampleCardArray(sampleCardArray);
    if (sampleCardArray.length == 5) {
      setNoMoreCard(true);
    }
  };

  const lastSwipedDirection = (swipeDirection) => {
    setSwipeDirection(swipeDirection);
  };

  const sendResult = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8080/image/result", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          num: list2,
          tf: array,
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

  return (
    <SafeAreaView style={{flex: 1, marginBottom:"5%"}}>
      <Text style={styles.titleText}>
        랜덤 추천기
      </Text>
      <Text style={styles.swipeText}>
        마음에 든다면 오른쪽으로 넘겨 주세요!
      
      </Text>
      <View style={styles.swipecontainer}>
      <Text style={styles.swipetext2}>
      💔💔⬅️⬅️                          ➡️➡️❤️❤️
      
      </Text>
      </View>
      <View style={styles.container}>
        {sampleCardArray.map((item, key) => (
          <SwipeableCard
            key={key}
            item={item}
            removeCard={() => removeCard(item.id)}
            swipedDirection={lastSwipedDirection}
          />
        ))}
        {noMoreCard ? (
          <View style={styles.random_container}>
          <Text style={{fontSize: 20, color: '#000'}}>
            이제 음식점 추천을 해드릴게요!{'\n'}
            아래 버튼을 눌러주세요
          </Text>

          <TouchableOpacity
                        onPress={() => setOk(!ok)}
                        style={styles.random_btn}
                    >
                    <Text style={styles.text}>랜덤 추천 결과보기</Text>
                
            </TouchableOpacity>
            </View>
          
          
        ) : null}
      </View>
      {/* <TouchableOpacity
                        onPress={() => removeCard()}
                        style={styles.login_btn}
                    >
                    <Text style={styles.text}>그냥 이거 바로 먹을래요!</Text>
                
            </TouchableOpacity> */}
            <TouchableOpacity
                        onPress={() => setOk(!ok)}
                        style={styles.register_btn}
                    >
                    <Text style={styles.text2}>이전</Text>
            </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Random;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 20,
  },
  cardStyle: {
    width: '75%',
    height: '45%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    borderRadius: 7,
  },
  cardTitleStyle: {
    color: '#fff',
    fontSize: 24,
  },
  swipeText: {
    fontSize: 23,
    textAlign: 'center',
  }, 
  swipetext2: {
    fontSize: 23,
    textAlign: 'center',
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
  login_btn: {
    backgroundColor: "#2B82D4",
    alignItems: "center",
    justifyContent: "center",
    width: "80%",
    height: "5%",
    marginHorizontal: "10%",
    borderRadius: 5,
    marginTop: "15%"
  },
  random_container: {
    backgroundColor: "#92BEE7",
    alignItems: "center",
    justifyContent: "center",
    width: "80%",
    height: "50%",
    marginHorizontal: "10%",
    borderRadius: 5,
    marginTop: "5%"
  },
  swipecontainer: {
    alignItems: "space-around",
    justifyContent: "flex-end",
    width: "90%",
    height: "10%",
    borderRadius: 5,
    marginTop: "-7%",
    marginHorizontal:"5%"
  },
  random_btn: {
    backgroundColor: "#2B82D4",
    alignItems: "center",
    justifyContent: "center",
    width: "60%",
    height: "30%",
    marginHorizontal: "10%",
    borderRadius: 50,
    marginTop: "20%"
  },
  text: {
    fontSize:20,
    marginTop: "1%",
    color:"white"
},
text2: {
  fontSize:20,
  marginTop: "1%",
},
image:{
    width: 300,
    height: 300,
  
  }
});
