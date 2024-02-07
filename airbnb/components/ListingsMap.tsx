import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import { defaultStyles } from '@/constants/Styles'
import { useRouter } from 'expo-router';


interface Props{
    listings: any,
}

const INITIAL_REGION = {
    latitude: 26.14,
    longitude: 91.73,
    latitudeDelta: 9,
    longitudeDelta: 9,
  };


const ListingsMap = ({listings}: Props) => {

  const router = useRouter();

    const onMarkerSelected = (item:any) => { 
        router.push(`/listing/${item.properties.id}`)
        
     }

     const firstTenListings = listings.features.slice(0,10);

     console.log("first 10>>>>>>>", firstTenListings);
     


  return (
    <View style={defaultStyles.container}>
    <MapView style={StyleSheet.absoluteFillObject} 
    provider={PROVIDER_GOOGLE}
    showsUserLocation
    showsMyLocationButton
    initialRegion={INITIAL_REGION}
>
    {firstTenListings.map((item:any) => (
        <Marker
        key={item.properties.id}
        coordinate={{
            latitude: +item.properties.latitude,
            longitude: +item.properties.longitude,
          }}
        onPress={() => onMarkerSelected(item)}
          >
            <View style={styles.marker}>
              <Text style={styles.markerText}>
                $ {item.properties.price}
              </Text>
            </View>
          </Marker>
    ))}
</MapView>
    </View>
  )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    marker:{
      backgroundColor: '#fff',
      borderRadius: 12,
      padding: 6,
      // paddingHorizontal: 2,
      alignItems: 'center',
      justifyContent:"center",
      elevation: 5,
      shadowColor: '#000',
      shadowOpacity: 0.5,
      shadowRadius: 7,
      shadowOffset: {
        width: 1,
        height: 10,
      }
    },
    markerText:{
      fontSize: 14,
      fontFamily: 'mon-sb'
    }
})

export default ListingsMap