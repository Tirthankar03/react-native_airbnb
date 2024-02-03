import { View, Text, StyleSheet, Image, Dimensions } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'
import listingsData from '@/assets/data/airbnb-listings.json';
import Animated from 'react-native-reanimated';



const { width } = Dimensions.get('window');
const IMG_HEIGHT = 300;




const Page = () => {
    const {id} = useLocalSearchParams<{id:string}>();
    console.log('hi id', id);
  const listing = (listingsData as any[]).find((item) => item.id === id);

    
  return (
    <View style={styles.container}>
      {/* <Text>Page</Text> */}

      {/* Scrollview doesn't work */}
      <Animated.ScrollView>
        <Animated.Image source={{uri: listing.xl_picture_url}} style={styles.image}/>
      </Animated.ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  image: {
    height: IMG_HEIGHT,
    width: width,
  },

})

export default Page