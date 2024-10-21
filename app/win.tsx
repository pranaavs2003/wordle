import { View, Text, Image, TouchableOpacity } from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import Ionicons from '@expo/vector-icons/Ionicons';
import React, { useState, useEffect } from 'react';
import { useFonts, AbrilFatface_400Regular } from '@expo-google-fonts/abril-fatface';
import { useRouter } from 'expo-router';
import { db } from '@/utils/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';

interface UserProps {
  id: string;
  name: string;
  lastKnownWinPoint: number;
  gamesPlayed: number;
  gamesLost: number;
  gamesWon: number;
  currentStreak: number;
  scores: number[];
}

const Win = () => {
  const router = useRouter();
  const frequencies = [1, 5, 16, 27, 10, 8];
  
  // Use state for values
  const [values, setValues] = useState([
    { field: 'Played', value: 0 },
    { field: 'Win %', value: 0 },
    { field: 'Current Streak', value: 0 },
    { field: 'Max Streak', value: 0 },
  ]);

  const [user, setUser] = useState<UserProps | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchUserById = async (userId: string) => {
    try {
      const userDoc = doc(db, 'users', userId);
      const userSnapshot = await getDoc(userDoc);

      if (userSnapshot.exists()) {
        setUser({ id: userSnapshot.id, ...userSnapshot.data() } as UserProps);
        console.log(userSnapshot.data());
      } else {
        setError('User not found');
      }
    } catch (err) {
      setError('Error fetching user: ' + (err as Error).message);
    }
  };

  useEffect(() => {
    fetchUserById('123');
  }, []);

  useEffect(() => {
    if (!user) return;

    // Create a new values array instead of mutating the existing one
    setValues([
      { field: 'Played', value: user.gamesPlayed },
      { field: 'Win %', value: Math.round((user.gamesWon / user.gamesPlayed) * 100) }, // Calculate Win %
      { field: 'Current Streak', value: user.currentStreak },
      { field: 'Max Streak', value: user.currentStreak }, // Assuming Max Streak is the same
    ]);
  }, [user]);

  const [fontsLoaded] = useFonts({
    AbrilFatface_400Regular,
  });

  if (!fontsLoaded) {
    return null;
  }

  const normalize = (frequency: number) => {
    const s: number = frequencies.reduce((acc, val) => acc + val, 0);
    return Math.round((frequency / s) * 500) + 20;
  };

  console.log(values);
  
  return (
    <View className='pl-8 pr-8 pt-5 pt-[50px] bg-white w-full h-full'>
      <TouchableOpacity onPress={() => router.push('/game')} className='w-full flex flex-row justify-end'>
        <Feather name='x' size={25} color='black' />
      </TouchableOpacity>

      <View className='w-full flex flex-col justify-center items-center space-y-4 mt-5 mb-5'>
        <Image source={require('@/assets/images/win.png')} style={{ height: 60, width: 60 }} />
        <Text className='text-3xl' style={{ fontFamily: 'AbrilFatface_400Regular' }}>Congratulations!</Text>
      </View>

      <View className='space-y-3 mt-2'>
        <Text className='font-bold text-sm'>STATISTICS</Text>
        <View className='w-full flex flex-row justify-around'>
          {values.map((item) => (
            <View key={item.field} className='flex flex-col items-center w-14 justify-center'>
              <Text className='font-normal text-2xl'>{item.value}</Text>
              <Text className='font-normal text-xs text-center h-10'>{item.field}</Text>
            </View>
          ))}
        </View>
      </View>

      <View className='w-full h-[30vh] mt-4 border-b-[1px] border-b-slate-200'>
        <Text className='font-bold text-sm'>GAME STATISTICS</Text>
        <View className='flex flex-row mt-4 gap-x-3'>
          <View className='flex gap-y-2'>
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <Text key={item} className='text-xs font-bold h-[18px]'>{item}</Text>
            ))}
          </View>
          <View className='flex-1 flex gap-y-2'>
            {user?.scores.map((score, i) => (
              <Text key={i} className='bg-[#58A351] text-xs font-bold h-[18px] text-white text-right pr-2' style={{ width: normalize(score) }}>{score}</Text>
            ))}
          </View>
        </View>
      </View>

      <View className='flex flex-row justify-center mt-5'>
        <TouchableOpacity className='bg-[#58A351] flex flex-row justify-center items-center w-48 pt-3 pb-3 rounded-full space-x-2'>
          <Text className='text-white font-semibold text-base'>Share</Text>
          <Ionicons name="share-social-outline" size={22} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Win;
