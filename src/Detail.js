import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, SafeAreaView, Platform, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import LoadingScreen from './LoadingScreen';

const renderItinerary = (text) => {
  const formattedText = text.replace(/\*\*/g, "").replace(/\*/g, "");
  const dayWiseItinerary = [];
  const lines = formattedText.split("\n");
  let currentDayDetails = [];
  let currentDayTitle = "";
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line.startsWith("Day")) {
      if (currentDayDetails.length > 0) {
        dayWiseItinerary.push({
          day: currentDayTitle,
          details: currentDayDetails
        });
      }
      currentDayTitle = line;
      currentDayDetails = [];
    } else {
      currentDayDetails.push(
        <Text key={i} style={styles.itineraryText}>
          {line}
        </Text>
      );
    }
  }
  
  // Push the last day details
  if (currentDayDetails.length > 0) {
    dayWiseItinerary.push({
      day: currentDayTitle,
      details: currentDayDetails
    });
  }
  
  return dayWiseItinerary.map((dayData, index) => (
    <View key={index} style={styles.dayContainer}>
      <Text style={styles.day}>{dayData.day}</Text>
      {dayData.details}
    </View>
  ));
};

const Detail = ({ route }) => {
  const navigation = useNavigation();
  const { response, isLoading } = route.params;
  
  return (
    <SafeAreaView style={styles.container}>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <FlatList
            data={renderItinerary(response)}
            renderItem={({ item }) => item}
            keyExtractor={(item, index) => index.toString()}
          />
        </>
      )}
    </SafeAreaView>
  );
};

export default Detail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  backButton: {
    padding: 10,
    alignSelf: 'flex-start',
  },
  dayContainer: {
    padding: 10,
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
  },
  day: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  itineraryText: {
    color: 'white',
    marginBottom: 5,
  },
});
