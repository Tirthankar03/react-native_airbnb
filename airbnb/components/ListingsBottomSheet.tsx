import { View, Text, StyleSheet, Button } from "react-native";
import React, { useCallback, useEffect, useMemo, useRef } from "react";
import BottomSheet from "@gorhom/bottom-sheet";

import {
  BottomSheetModalProvider,
  BottomSheetModal,
} from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";

// import BottomSheet, { BottomSheetDraggableView } from '@gorhom/bottom-sheet'

interface Props {
  listings: any[];
  category: string;
}

const ListingsBottomSheet = ({ listings, category }: Props) => {

    useEffect(() => {
        bottomSheetModalRef.current?.present();
      }, []);
      
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const snapPoints = useMemo(() => ["10%", "100%"], []);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

  return (
    // <GestureHandlerRootView 
    // style={{ flex: 1 }}
    // >
      <BottomSheetModalProvider>
          <BottomSheetModal
            ref={bottomSheetModalRef}
            index={1}
            snapPoints={snapPoints}
            onChange={handleSheetChanges}
            enablePanDownToClose={false}
          >
              <View style={styles.contentContainer}>
            <Text>Awesome 🎉</Text>
          </View>
          </BottomSheetModal>
      </BottomSheetModalProvider>
  );
};

export default ListingsBottomSheet;

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
});
