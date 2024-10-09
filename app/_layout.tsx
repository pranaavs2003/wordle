import React from 'react'
import index from '.'
import { Stack } from 'expo-router'
import {BottomSheetProvider} from "@/components/BottomSheetProvider";
import { ClerkProvider, ClerkLoaded } from '@clerk/clerk-expo'
import { tokenCache } from '@/utils/cache';

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!

if (!publishableKey) {
  throw new Error(
    'Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env',
  )
}

const RootLayout = () => {
  return (
    <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
      <ClerkLoaded>
        <BottomSheetProvider>
          <Stack initialRouteName='login'>
            
            <Stack.Screen 
              name="index" 
              options={{headerShown: false}} 
            />

            <Stack.Screen 
              name="login" 
              options={{headerShown: false}} 
            />

            <Stack.Screen 
              name="game" 
              options={{headerShown: false}} 
            />

            <Stack.Screen 
              name="lost" 
              options={{headerShown: false}} 
            />

            <Stack.Screen 
              name="win" 
              options={{headerShown: false}} 
            />

            <Stack.Screen 
              name="animated" 
              options={{headerShown: false}} 
            />

          </Stack>
        </BottomSheetProvider>
      </ClerkLoaded>
    </ClerkProvider>
  )
}

export default RootLayout;