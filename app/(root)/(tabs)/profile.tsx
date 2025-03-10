import { View, Text, SafeAreaView, ScrollView,Image, TouchableOpacity, ImageSourcePropType, Alert } from 'react-native'
import React from 'react'
import { GoBell } from "react-icons/go";
import images from '@/constants/images';import { BiSolidEdit } from "react-icons/bi";
import icons from '@/constants/icons';
import { RiArrowDropRightLine, RiLogoutCircleRLine } from "react-icons/ri";
import { settings } from '@/constants/data';
import { useGlobalContext } from '@/lib/global-provider';
import { logout } from '@/lib/appwrite';

interface SettingsItemProps {
  icon: ImageSourcePropType;
  title: string;
  onPress?: () => void;
  textStyle?: string;
  showArrow?: boolean;
}

const SettingsItem = ({icon, title, onPress, textStyle, showArrow = true }: SettingsItemProps) => (
   <TouchableOpacity onPress={onPress} className='flex flex-row items-center justify-between py-3'>
    <View className='flex flex-row items-center gap-3'>
      <Image source={icon} 
      style={{width: 24, height:24}}
      />
      <Text className={`text-lg font-rubik-medium text-black-300 ${textStyle}`}>{title}</Text>
    </View>
    {showArrow && <RiArrowDropRightLine className='size-5'/>}
   </TouchableOpacity>
)

const profile = () => {
  const {user, refetch } = useGlobalContext();

  const handleLogOut = async () => {
    const result = await logout();

    if(result) {
      Alert.alert('success', 'You have logged out successfully!');
      refetch();
    }else {
      Alert.alert('Error', 'something broke')
    }
  };
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
            <Image source={images.avatar} className='rounded-full relative' style={{width: 100, height: 100}}/>
            {/* <Image source={{uri: user?.avatar}} className='rounded-full size-44 relative'/> */}
            <TouchableOpacity className='absolute bottom-11 right-11'>
                <BiSolidEdit className='size-6 '/>
                {/* TODO implement the edit photo functionality. */}
            </TouchableOpacity>
            <Text className='text-2xl font-rubik-bold mt-2'>1764 | Crazy dev.</Text>
            {/* <Text className='text-2xl font-rubik-bold mt-2'>{user?.name}</Text> */}
          </View>
        </View>

        <View className='flex flex-col mt-10'>
             <SettingsItem icon={icons.calendar} title='My Bookings'/>
             <SettingsItem icon={icons.wallet} title='My Payments'/>
        </View>

        <View className='flex flex-col mt-5 bordr-t pt-5 border-primary-200'>
            {settings.slice(2).map((item, index) => (
              <SettingsItem {...item} key={index} />
            ))}
        </View>

        <View className='flex flex-col mt-5 bordr-t pt-5 border-primary-200'>
          <SettingsItem icon={icons.logout} title='Log Out' showArrow={false} textStyle='text-danger' onPress={handleLogOut}/>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default profile