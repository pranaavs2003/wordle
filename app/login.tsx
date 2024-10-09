import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import React, {useState} from 'react'
import { useRouter } from 'expo-router';
import { useOAuth } from '@clerk/clerk-expo';
import Logo from '@/assets/images/nyt-logo.svg';
import Ionicons from '@expo/vector-icons/Ionicons';

enum Strategy {
    Google = 'oauth_google',
    Apple = 'oauth_apple',
    Facebook = 'oauth_facebook',
}

const login = () => {
    const router = useRouter();

    const [email, setEmail] = useState('');
    const { startOAuthFlow: googleAuth } = useOAuth({ strategy: 'oauth_google' });
    const { startOAuthFlow: facebookAuth } = useOAuth({ strategy: 'oauth_facebook' });
    const { startOAuthFlow: appleAuth } = useOAuth({ strategy: 'oauth_apple' });

    const onSelectAuth = async (strategy: Strategy) => {
        const selectedAuth = {
          [Strategy.Google]: googleAuth,
          [Strategy.Apple]: appleAuth,
          [Strategy.Facebook]: facebookAuth,
        }[strategy];
    
        try {
          const { createdSessionId, setActive } = await selectedAuth();
    
          if (createdSessionId) {
            setActive!({ session: createdSessionId });
            router.back();
          }
        } catch (err) {
          console.error('OAuth error', err);
        }
      };

  return (
    <View className='w-full h-full bg-white flex items-center pl-4 pr-4 pt-[60px]'>
        
        <View className='flex flex-row items-center justify-between w-full'>
            <Ionicons name="close-outline" size={22} color="#6f6f6f" onPress={() => router.back()} />
            <Logo height={40} width={200} />
            <View></View>
        </View>

        <View className='flex items-center w-full mt-7 mb-7'>
            <Text className='font-bold text-lg mb-3'>Log in or create an account</Text>
            <Text className='text-center w-[80%] font-medium text-sm text-gray-600'>By continuing, you agree to the Terms of Sale, Terms of Service, and Privacy Policy.</Text>
        </View>

        <View className='w-[90%] flex justify-center items-center'>
            <Text className='w-full font-semibold text-sm mb-1'>Email address</Text>
            <TextInput 
                className='w-full border-[1px] border-gray-300 font-semibold p-2 rounded-sm mb-2'
                placeholder='Email'
                value={email}
                onChangeText={setEmail}
            />
            <TouchableOpacity className='w-full bg-black flex flex-row justify-center pt-[14px] pb-[14px] rounded-[3px]'>
                <Text className='text-white font-medium'>Continue with email</Text>
            </TouchableOpacity>
        </View>

        <View className='w-[90%] flex flex-row justify-center items-center overflow-hidden gap-x-2 mt-7 mb-7'>
            <View className='h-0 w-full border-t-[1px] border-gray-400'></View>
            <Text className='text-gray-400 font-medium'>OR</Text>
            <View className='h-0 w-full border-t-[1px] border-gray-400'></View>
        </View>

        <View className='w-[90%] flex items-center justify-center gap-y-2'>
            <TouchableOpacity onPress={() => onSelectAuth(Strategy.Google)} className='w-full border-[1px] border-gray-700 flex flex-row justify-center items-center gap-x-2 pt-[12px] pb-[12px] rounded-[3px] mb-2'>
                <Ionicons name="logo-google" size={24} color="black" />
                <Text className='font-semibold'>Continue with Google</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => onSelectAuth(Strategy.Facebook)} className='w-full border-[1px] border-gray-700 flex flex-row justify-center items-center gap-x-2 pt-[12px] pb-[12px] rounded-[3px] mb-2'>
                <Ionicons name="logo-facebook" size={24} color="black" />
                <Text className='font-semibold'>Continue with Facebook</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => onSelectAuth(Strategy.Apple)} className='w-full border-[1px] border-gray-700 flex flex-row justify-center items-center gap-x-2 pt-[12px] pb-[12px] rounded-[3px]'>
                <Ionicons name="logo-apple" size={24} color="black" />
                <Text className='font-semibold'>Continue with Apple</Text>
            </TouchableOpacity>
        </View>

    </View>
  )
}

export default login;