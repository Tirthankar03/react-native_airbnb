import { View, Text, FlatList, ListRenderItem, TouchableOpacity, StyleSheet, Image } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { defaultStyles } from "@/constants/Styles";
import { Link } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import Animated, { FadeInRight, FadeOutLeft } from 'react-native-reanimated'

interface Props {
  listings: any[];
  category: string;
}

const Listings = ({ listings: items, category }: Props) => {
  //adding listRef to make the listings track to the selected category
  const listRef = useRef<FlatList>(null);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log("reload listings", items.length);
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 200);
  }, [category]);

  const renderRow: ListRenderItem<any> = ({ item }) => (
    <Link href={`/listing/${item.id}`} asChild>
      <TouchableOpacity>
        <Animated.View style={styles.listing} entering={FadeInRight} exiting={FadeOutLeft}>
          <Image source={{ uri: item.medium_url }} style={styles.image} />
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={{ fontWeight: '500', fontSize: 16 }}>{item.name}</Text>
            <View style={{ flexDirection: 'row', gap: 4 }}>
              <Ionicons name="star" size={16} />
              <Text style={{ fontWeight: '500' }}>{item.review_scores_rating / 20}</Text>
            </View>
          </View>
          <Text>{item.room_type}</Text>
          <View style={{ flexDirection: 'row', gap: 4 }}>
            <Text style={{ fontWeight: '500' }}>€ {item.price}</Text>
            <Text>night</Text>
          </View>
        </Animated.View>
      </TouchableOpacity>
    </Link>
  );






  return (
    <View style={defaultStyles.container}>
      <FlatList
      renderItem={renderRow}
      // ref={listRef} 
      data={loading ? [] : items} />
    </View>
  );
};



const styles = StyleSheet.create({
  listing: {
    padding:16,
    gap: 10,
    marginVertical: 16,
  },
  image:{
    width: '100%',
    height: 300,
    borderRadius: 10,
  }
})



export default Listings;


