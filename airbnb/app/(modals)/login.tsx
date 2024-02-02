import { View, Text } from 'react-native'
import React from 'react'
import { useWarmUpBrowser } from '@/hooks/useWarmupBrowser'

const Page = () => {
  useWarmUpBrowser();
  return (
    <View>
      <Text>Login is working </Text>
    </View>
  )
}

export default Page