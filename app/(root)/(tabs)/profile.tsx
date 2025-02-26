import { View, Text, SafeAreaView, ScrollView,Image, TouchableOpacity, ImageSourcePropType } from 'react-native'
import React from 'react'
import { GoBell } from "react-icons/go";
import images from '@/constants/images';import { BiSolidEdit } from "react-icons/bi";
import icons from '@/constants/icons';

interface SettingsItemProps {
  icon: ImageSourcePropType;
  title: string;
  onPress?: () => void;
  textStyle?: string;
  showArrow?: boolean;
}

const SettingsItem = ({icon, title, onPress, textStyle, showArrow = true }: SettingsItemProps) => (
   <TouchableOpacity className='flex flex-row items-center justify-between py-3'>
      <Image source={icon}/>
      <Text>{title}</Text>
   </TouchableOpacity>
)

const profile = () => {
  const handleLogOut = async () => {};
  return (
    <SafeAreaView className='h-full bg-white'>
      <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerClassName='pb-32 px-7'
      >
        <View className='flex flex-row justify-between items-center mt-5'>
          <Text className='text-xl font-rubik-bold'>Profile</Text>
          <GoBell className='size-5'/>
        </View>

        <View className='flex flex-row justify-center mt-5'>
          <View className='flex flex-col items-center relative mt-5'>
            <Image source={images.avatar} className='rounded-full size-44 relative'/>
            <TouchableOpacity className='absolute bottom-11 right-11'>
                <BiSolidEdit className='size-6 '/>
            </TouchableOpacity>
            <Text className='text-2xl font-rubik-bold mt-2'>1764 | Crazy dev.</Text>
          </View>
        </View>

        <View className='flex flex-col mt-10'>
             <SettingsItem icon={icons.calendar} title='My Bookings'/>
             <SettingsItem icon={icons.wallet} title='My Payments'/>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default profile