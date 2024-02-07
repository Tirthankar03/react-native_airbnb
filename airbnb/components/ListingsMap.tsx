import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'
import { defaultStyles } from '@/constants/Styles'


interface Props{
    listings: any,
}




const ListingsMap = ({listings}: Props) => {
  return (
    <View style={defaultStyles.container}>
    <MapView style={styles.map} 
    provider={PROVIDER_GOOGLE}
    showsUserLocation
    showsMyLocationButton
    />
    </View>
  )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        width: '100%',
        height: '100%',
    }
})

export default ListingsMap