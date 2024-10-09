import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native'
import React from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import { useFonts, AbrilFatface_400Regular } from '@expo-google-fonts/abril-fatface';
import { useBottomSheet } from '@gorhom/bottom-sheet';

const SubscribeModel = () => {
    const [fontsLoaded] = useFonts({
        AbrilFatface_400Regular
      });

      const BENEFITS = [
        'Enjoy full access to Wordle, Spelling Bee, The Crossword and more.',
        'Play new puzzles every day for concentration or relaxation.',
        'Strengthen your strategy with WordleBot.',
        'Unlock over 10,000 puzzles in our Wordle, Spelling Bee and crossword archives.',
        'Track your stats and streaks on any device.',
      ];

      const bottomSheet = useBottomSheet();

      if (!fontsLoaded) {
        return <View />;
      }

  return (
    <View className='pl-4 pr-4 relative'>
        
        <View className="flex flex-row justify-between items-center mb-5">
            <TouchableOpacity><Text className='text-xs font-bold'>LOG IN</Text></TouchableOpacity>
            <TouchableOpacity onPress={() => bottomSheet.close()} ><Ionicons name="close-outline" size={24} color="#6f6f6f" /></TouchableOpacity>
        </View>

        <ScrollView>
            <View className='flex justify-center items-center'> 
            
                <Text className='text-[28px]' style={{fontFamily: 'AbrilFatface_400Regular'}} >Unlimited Play.</Text>
                <Text className='text-[28px] mt-1 mb-4' style={{fontFamily: 'AbrilFatface_400Regular'}} >Try free for 7 days.</Text>

                <Image 
                    source={require('@/assets/images/games.png')}
                    style={{  width: '100%',alignSelf: 'center',height: 40}}
                />

                <View className='mt-7'>
                    {
                        BENEFITS.map((item) => (
                            <View className='flex-row gap-x-4 w-[90%] mb-3' key={item}>
                                <Text className='' >{'\u2022'}</Text>
                                <Text className='text-xs font-medium text-gray-600' >{item}</Text>
                            </View>
                        ))
                    }
                </View>

                <Text className='pl-2 pr-2 text-justify text-xs font-semibold mt-3 mb-40'>
                        If you subscribe to The New York Times via this app, payment for your subscription will
                    be automatically charged to your Apple ID account upon your confirmation of purchase
                    with Apple. Your Apple ID account will be automatically charged for renewal at the
                    applicable rate shown to you at the time of subscription every calendar month (for
                    monthly subscriptions) or every year (for annual subscriptions) within 24-hours prior to
                    the start of your next billing period. For special introductory offers, you will be
                    automatically charged the applicable introductory rate shown to you at the time of
                    subscription for the stated introductory period and the standard rate rate shown to you
                    at the time of subscription thereafter. You will be charged in advance. Subscriptions
                    continue automatically until you cancel. Cancellation takes effect at the end of your
                    current billing period. You can manage and cancel subscriptions in your account settings
                    on the App Store. To cancel, please turn off auto-renew at lead.
                </Text>

            </View>
        </ScrollView>

        <View className='absolute bottom-[-3px] bg-[#E3E3E1] w-[100vw] h-40 flex items-center pt-5' >
            <TouchableOpacity className='bg-black w-[310px] flex flex-row justify-center pt-3 pb-3 rounded-sm'>
                <Text className='text-white text-sm font-semibold'>Try 7 days for free</Text>
            </TouchableOpacity>
            <Text className='mt-3 font-medium text-gray-700 text-xs '>2,99 €/month after 7-day trial. Cancel anytime.</Text>
        </View>

    </View>
  )
}

export default SubscribeModel