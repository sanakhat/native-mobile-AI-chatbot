import React from 'react'

import { View, Text ,ActivityIndicator,StyleSheet} from 'react-native'

const LoadingScreen = () => {
    const loadingTexts=[
        "Loading...",
        "Please wait",
        "Almost there",
        "Just a moment",
        "Please be patient",

    ];
    const [currentText, setCurrentText]=React.useState(loadingTexts[0]);
    React.useEffect(() =>{
        const intervalId= setInterval(() =>{
            setCurrentText((prevText) =>{
                const currentIndex=loadingTexts.indexOf(prevText);
                const newIndex=(currentIndex+1)%loadingTexts.length;
                return loadingTexts[newIndex];
            });
    }, 200
    );return()=> clearInterval(intervalId);
},[]);
  return (
    <View style={style.container}>
        <ActivityIndicator size="large" color="#FF6347"/>
        <Text style={style.text}>{currentText}</Text>
      <Text>LoadingScreen</Text>
    </View>
  )
}

export default LoadingScreen
const style=StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        },

})