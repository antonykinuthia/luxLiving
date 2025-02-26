import images from "@/constants/images";
import { Link } from "expo-router";
import { Image, SafeAreaView, Text, View, TouchableOpacity } from "react-native";
import { GoBell } from "react-icons/go";
import Search from "@/components/Search";
import { Cards, FeaturedCards } from "@/components/Cards";

export default function Index() {
  return (
    <SafeAreaView className="bg-white h-full">
      <View className="px-5">
        <View className="flex flex-row justify-between items-center mt-5">
          <View className="flex flex-row items-center">
            <Image source={images.avatar} className="size-12 rounded-full"/>
            <View className="flex flex-col items-start ml-2 justify-center">
              <Text className="text-xs font-rubik text-black-100">Good Morning</Text>
              <Text className="text-base font-rubik-medium text-black-300">1764</Text>
            </View>
          </View>
          <GoBell className="size-6"/>
          {/* TODO implement notifications  */}
        </View>
          <Search/>

          <View className="my-5">
            <View className="flex flex-row items-center justify-between">
                <Text className="text-xl font-rubik-bold text-black-300">Featured</Text>
                <TouchableOpacity>
                  <Text className="text-base font-rubik-bold text-primary-300">See All</Text>
                </TouchableOpacity>
            </View>

            <View className="flex flex-row gap-5 mt-5">
              <FeaturedCards/>
              <FeaturedCards/>
            </View>
          </View>

          <View className="flex flex-row items-center justify-between">
                <Text className="text-xl font-rubik-bold text-black-300">Recommendations</Text>
                <TouchableOpacity>
                  <Text className="text-base font-rubik-bold text-primary-300">See All</Text>
                </TouchableOpacity>
            </View>

            <View className="flex flex-row gap-5 mt-5">
             <Cards/>
             <Cards/>
            </View>

      </View>
    </SafeAreaView>
  );
}
