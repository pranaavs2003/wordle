import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import Icon from '@/assets/images/wordle-icon.svg';
import { useFonts, BreeSerif_400Regular } from '@expo-google-fonts/bree-serif';
import { GowunBatang_400Regular, GowunBatang_700Bold } from '@expo-google-fonts/gowun-batang';
import { DMSerifText_400Regular } from '@expo-google-fonts/dm-serif-text';
import { AbrilFatface_400Regular } from '@expo-google-fonts/abril-fatface';
import { useBottomSheet } from '@/components/BottomSheetProvider';
import { useRouter } from 'expo-router';
import { SignedIn, SignedOut, useAuth } from '@clerk/clerk-expo';

const Index = () => {
  // Load fonts
  const [fontsLoaded] = useFonts({
    BreeSerif_400Regular,
    GowunBatang_400Regular,
    GowunBatang_700Bold,
    DMSerifText_400Regular,
    AbrilFatface_400Regular,
  });

  // Ensure fonts are loaded
  const bottomSheet = useBottomSheet();

  const router = useRouter();

  const auth = useAuth();
  
  // Avoid early return that might change hook order
  if (!fontsLoaded) {
    return <View />;
  }

  return (
    <View className="bg-[#E3E3E1] dark:bg-black w-full h-full flex flex-col justify-center items-center">
      <Icon width={70} height={70} />
      <Text className="text-4xl mt-3 mb-5 dark:text-white" style={{ fontFamily: 'AbrilFatface_400Regular' }}>
        Wordle
      </Text>

      <Text className="text-xl w-[70%] text-center mb-5 dark:text-white" style={{ fontFamily: 'GowunBatang_700Bold' }}>
        Get 6 chances to guess a 5-letter word.
      </Text>

      <TouchableOpacity onPress={() => router.push('/game')} className="bg-black dark:bg-[#6AAA64] pl-10 pr-10 pt-3 pb-3 rounded-full w-[39%] mt-2">
        <Text className="text-white text-center font-medium">Play</Text>
      </TouchableOpacity>

      <SignedOut>
        <TouchableOpacity onPress={() => router.push('/login')} className="border-[1px] pl-10 pr-10 pt-3 pb-3 rounded-full w-[39%] mt-2 dark:border-[#E3E3E1] text-[#E3E3E1]">
          <Text className="text-center font-medium dark:text-[#E3E3E1]">Login</Text>
        </TouchableOpacity>
      </SignedOut>

      <SignedIn>
        <TouchableOpacity onPress={() => auth.signOut()} className="border-[1px] pl-10 pr-10 pt-3 pb-3 rounded-full w-[39%] mt-2 dark:border-[#E3E3E1] text-[#E3E3E1]">
          <Text className="text-center font-medium dark:text-[#E3E3E1]">Sign Out</Text>
        </TouchableOpacity>
      </SignedIn>

      {/* bottomSheet.openBottomSheet() */}
      <TouchableOpacity onPress={() => bottomSheet.openBottomSheet()} className="border-[1px] pl-10 pr-10 pt-3 pb-3 rounded-full w-[39%] mt-2 dark:bg-[#D1B036] border-none">
        <Text className="text-center font-medium dark:text-white">Subscribe</Text>
      </TouchableOpacity>

      <View className="mt-7 flex justify-center ">
        <Text className="text-center font-bold text-xs dark:text-[#E3E3E1]">September 28, 2024</Text>
        <Text className="text-center font-semibold text-xs mt-3 dark:text-[#E3E3E1]">No. 1197</Text>
        <Text className="text-center text-xs dark:text-[#E3E3E1]">Edited by Tracy Bennett</Text>
      </View>
    </View>
  );
};

export default Index;
