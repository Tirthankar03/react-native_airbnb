import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import React, { useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link } from "expo-router";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import * as Haptics from 'expo-haptics';


const categories = [
  {
    name: "Tiny homes",
    icon: "home",
  },
  {
    name: "Cabins",
    icon: "house-siding",
  },
  {
    name: "Trending",
    icon: "local-fire-department",
  },
  {
    name: "Play",
    icon: "videogame-asset",
  },
  {
    name: "City",
    icon: "apartment",
  },
  {
    name: "Beachfront",
    icon: "beach-access",
  },
  {
    name: "Countryside",
    icon: "nature-people",
  },
];


interface Props {
    onCategoryChanged: (category: string) => void
}


const ExploreHeader = ({onCategoryChanged} : Props) => {
    const itemsRef = useRef<Array<TouchableOpacity | null>>([]);
    const scrollRef = useRef<ScrollView>(null);
    const [activeIndex, setActiveIndex] = useState(0);

    const selectCategory = (index: number) => {
        const selected = itemsRef.current[index];
        setActiveIndex(index);

        //gives the measurement of the item inside the view
        selected?.measure((x) => { 
            scrollRef.current?.scrollTo({x:x-16, y: 0, animated:true})
         })


        //responsible for making your device shake
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
        onCategoryChanged(categories[index].name);
    }

  return (
    //flex 1?
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={styles.container}>
        <View style={styles.actionRow}>
          {/* to use expo router link comp around anything, use as child */}
          <Link href={"/(modals)/booking"} asChild>
            <TouchableOpacity style={styles.searchBtn}>
              <Ionicons name="search" size={24} />
              <View>
                <Text style={{ fontFamily: "mon-sb" }}>Where to</Text>
                <Text style={{ fontFamily: "mon", color: Colors.grey }}>
                  Anywhere · Any week
                </Text>
              </View>
            </TouchableOpacity>
          </Link>

          <TouchableOpacity style={styles.filterBtn}>
            <Ionicons name="options-outline" size={24} />
          </TouchableOpacity>
        </View>


        {/* can't scroll issue android issue*/}
        <ScrollView ref={scrollRef} horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{
            alignItems:'center',
            gap: 20,
            paddingHorizontal:16,
        }}>
            {categories.map((item, index) => (
                <TouchableOpacity key={index}
                    onPress={() => selectCategory(index)}
                    ref={(e) => itemsRef.current[index] = e}
                    style={activeIndex === index ? styles.categoriesBtnActive : styles.categoriesBtn}
                >
                    <MaterialIcons size={24} name={item.icon as any} color={
                    activeIndex === index ? '#000' : Colors.grey                    } />
                    <Text 
                    style={activeIndex === index ? styles.categoryTextActive : styles.categoryText}
                    
                    >{item.name}</Text>
                </TouchableOpacity>
            ))}
        </ScrollView>


      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: "#fff",
    height: 130,
  },
  actionRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    paddingBottom: 16,
    gap: 10,
  },
  filterBtn: {
    padding: 10,
    borderWidth: 1,
    borderColor: Colors.grey,
    borderRadius: 24,
  },
  searchBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    borderColor: "#c2c2c2c",
    borderWidth: StyleSheet.hairlineWidth,
    padding: 14,
    borderRadius: 30,
    backgroundColor: "#fff",
    flex: 1,

    elevation: 15,
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 25,
    shadowOffset: {
      width: 1,
      height: 1,
    },
  },
  categoryText: {
    fontSize: 14,
    fontFamily: 'mon-sb',
    color: Colors.grey,
  },
  categoryTextActive: {
    fontSize: 14,
    fontFamily: 'mon-sb',
    color: '#000',
  },
  categoriesBtn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 8,
  },
  categoriesBtnActive: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomColor: '#000',
    borderBottomWidth: 2,
    paddingBottom: 8,
  },
});

export default ExploreHeader;
