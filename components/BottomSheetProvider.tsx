import React, { createContext, useContext, useRef, useMemo, ReactNode } from 'react';
import BottomSheet from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import SubscribeModel from './SubscribeModel';
import { useColorScheme } from 'react-native';

// Context to hold bottom sheet methods
interface BottomSheetContextProps {
  openBottomSheet: () => void;
  closeBottomSheet: () => void;
}

// Create a context for the bottom sheet
const BottomSheetContext = createContext<BottomSheetContextProps | undefined>(undefined);

// Custom hook to use the BottomSheetContext
export const useBottomSheet = (): BottomSheetContextProps => {
  const context = useContext(BottomSheetContext);
  if (!context) {
    throw new Error('useBottomSheet must be used within a BottomSheetProvider');
  }
  return context;
};

// BottomSheetProvider component
export const BottomSheetProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const bottomSheetRef = useRef<BottomSheet>(null);

  // Define snap points
  const snapPoints = useMemo(() => ['50%', '90%'], []);

  // Function to open the bottom sheet
  const openBottomSheet = () => {
    bottomSheetRef.current?.snapToIndex(1);
  };

  // Function to close the bottom sheet
  const closeBottomSheet = () => {
    bottomSheetRef.current?.close();
  };

  const colorScheme = useColorScheme();

  return (
    <BottomSheetContext.Provider value={{ openBottomSheet, closeBottomSheet }}>
      <GestureHandlerRootView className="flex-1">
        {children}

        {/* Bottom Sheet */}
        <BottomSheet
          ref={bottomSheetRef}
          index={-1} // Initially closed
          snapPoints={snapPoints}
          enablePanDownToClose={true}
          backgroundStyle={{ backgroundColor: colorScheme === 'dark' ? '#ffffff' : '#ffffff' }}
        >
          <SubscribeModel />
        </BottomSheet>
      </GestureHandlerRootView>
    </BottomSheetContext.Provider>
  );
};
