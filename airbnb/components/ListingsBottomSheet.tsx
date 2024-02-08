import { View, Text, StyleSheet, Button } from "react-native";
import React, { useCallback, useEffect, useMemo, useRef } from "react";
import BottomSheet, { BottomSheetScrollView, TouchableOpacity } from "@gorhom/bottom-sheet";

import {
  BottomSheetModalProvider,
  BottomSheetModal,
} from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Listings from "./Listings";
import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";

// import BottomSheet, { BottomSheetDraggableView } from '@gorhom/bottom-sheet'

interface Props {
  listings: any[];
  category: string;
}

const ListingsBottomSheet = ({ listings, category }: Props) => {
  // useEffect(() => {
  //     bottomSheetRef.current?.present();
  //   }, []);

  const bottomSheetRef = useRef<BottomSheet>(null);

  const snapPoints = useMemo(() => ["10%", "100%"], []);

const showMap = () => { 
    bottomSheetRef.current?.collapse();

}

//   const handlePresentModalPress = useCallback(() => {
//     bottomSheetRef.current?.present();
//   }, []);
  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={1}
      snapPoints={snapPoints}
      onChange={handleSheetChanges}
      enablePanDownToClose={false}
      style={styles.sheetContainer}
    >
        <View style={styles.contentContainer}>
      <Listings listings={listings} category={category} />
        <View style={styles.absoluteBtn}>
            <TouchableOpacity onPress={showMap} style={styles.btn}>
                <Text style={{fontFamily: 'mon-sb', color: '#fff'}}>Map</Text>
                <Ionicons name="map" size={20} color={'#fff'}/>
            </TouchableOpacity>
        </View>
        </View>
    </BottomSheet>
  );
};

export default ListingsBottomSheet;

const styles = StyleSheet.create({
  absoluteBtn: {
    position: 'absolute',
    bottom: 30,
    width: '100%',
    alignItems: 'center'

  },
  contentContainer: {
    flex: 1,
  },
  btn: {
    backgroundColor: Colors.dark,
    padding: 16,
    gap: 8,
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center'
  },
  sheetContainer: {
    borderRadius: 30,
    backgroundColor: '#fff',
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 4,
    shadowOffset: {
      width: 1,
      height: 1,
    }
}

});
