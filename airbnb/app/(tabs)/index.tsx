import { View, Text } from 'react-native'
import React, { useMemo, useState } from 'react'
import { Link, Stack } from 'expo-router'
import ExploreHeader from '@/components/ExploreHeader'
import Listings from '@/components/Listings'

import listingsData from '@/assets/data/airbnb-listings.json'


const Page = () => {


  //implement redux later instead of prop drilling

  const [category, setCategory] = useState('Tiny homes')
  const items = useMemo(() => listingsData as any, []);
  const onDataChanged = (category: string) => {
    console.log("changed", category );
    setCategory(category)
    
  }


  return (
    <View style={{flex:1, marginTop: 130}}>
      <Stack.Screen options={{
        header: () => <ExploreHeader onCategoryChanged={onDataChanged}/>
      }}/>
      <Listings listings={items} category={category}/>
    </View>
  )
}

export default Page