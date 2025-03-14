import images from "@/constants/images";
import { Link, router, useLocalSearchParams } from "expo-router";
import { Image, SafeAreaView, Text, View, TouchableOpacity, FlatList, Button, ActivityIndicator } from "react-native";
import { GoBell } from "react-icons/go";
import Search from "@/components/Search";
import { Cards, FeaturedCards } from "@/components/Cards";
import Filters from "@/components/Filters";
import { useGlobalContext } from "@/lib/global-provider";
import { useAppwrite } from "@/lib/useAppwrite";
import { getLatestProperties, getProperties } from "@/lib/appwrite";
import { useEffect, useMemo, useRef } from "react";
import NoResults from "@/components/NoResults";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import BottomSheet from "@gorhom/bottom-sheet";


export default function Index() {
  const { user} = useGlobalContext();
  const params = useLocalSearchParams<{query?: string; filter?: string}>();

const sheetRef = useRef<BottomSheet>(null);
const snapPoints = useMemo(() => ['25%', '50%'], []);
  
  const {data: latestProperties, loading: latesPropertiesLoading } = useAppwrite({
    fn: getLatestProperties
  });

  const {data: properties, loading, refetch} = useAppwrite({
    fn: getProperties,
    params: {
      filter: params.filter!,
      query: params.query!,
      limit: 6
    },
    skip: true,
  })

  const handleCardPress = (id:string) => router.push(`/properties/${id}`);

  useEffect(() => {
    refetch({
      filter: params.filter!,
      query: params.query!,
      limit: 6
    });
  }, [params.filter, params.query]);

  return (
    <GestureHandlerRootView className="flex-1">
    <SafeAreaView className="bg-white h-full relative">
          <FlatList
          data={properties}
          renderItem={({item}) => <Cards item={item} onPress={() => handleCardPress(item.$id)}/>}
          keyExtractor={(item) => item.$id}
          numColumns={2}
          contentContainerClassName="pb-32"
          columnWrapperClassName="flex gap-5 px-5"
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            loading ? (
              <ActivityIndicator size='large' className="text-primary-300 mt-5"/>
            ): <NoResults/>
          }
          ListHeaderComponent={
            <View className="px-5">
              <View className="flex flex-row justify-between items-center mt-5">
                <View className="flex flex-row items-center">
                  <Image source={images.avatar} className="size-12 rounded-full"/>
                  {/* <Image source={{uri: user?.avatar}} className="size-12 rounded-full"/> */}
                  <View className="flex flex-col items-start ml-2 justify-center">
                    <Text className="text-xs font-rubik text-black-100">welcome</Text>
                    <Text className="text-base font-rubik-medium text-black-300">1764</Text>
                    {/* <Text className="text-base font-rubik-medium text-black-300">{user?.name}</Text> */}
                  </View>
                </View>
                <GoBell className="size-6"/>
                {/* TODO implement notifications  */}
              </View>
                <Search/>

                <View className="my-5">
                  <View className="flex flex-row items-center justify-between">
                      <Text className="text-xl font-rubik-bold text-black-300">Featured</Text>
                      <TouchableOpacity onPress={() => router.push('/explore')}>
                        <Text className="text-base font-rubik-bold text-primary-300">See All</Text>
                      </TouchableOpacity>
                  </View>
                  {latesPropertiesLoading? <ActivityIndicator size='large' className="text-primary-300"/> : !latestProperties || latestProperties.length === 0 ? <NoResults/> :(
                    <FlatList 
                    data={latestProperties}
                    renderItem={({item}) => <FeaturedCards item={item} onPress={() => handleCardPress(item.$id)}/>}
                    keyExtractor={(item) => item.$id}
                    horizontal
                    bounces={false}
                    showsHorizontalScrollIndicator={false}
                    contentContainerClassName="flex gap-5 mt-5"
                    />
                  ) }
                </View>

                <View className="flex flex-row items-center justify-between">
                      <Text className="text-xl font-rubik-bold text-black-300">Recommendations</Text>
                      <TouchableOpacity onPress={() => router.push('/explore')}>
                        <Text className="text-base font-rubik-bold text-primary-300">See All</Text>
                      </TouchableOpacity>
                  </View> 

                  <Filters/>

            </View>
          } 
          />

        </SafeAreaView>
        <View className="bg-black rounded-lg">
            <BottomSheet
            ref={sheetRef}
            index={1}
            snapPoints={snapPoints}
            >
              <Text className="font-rubik-bold text-2xl">
                Let Me Cook
              </Text>
            </BottomSheet>
        </View>
       
    </GestureHandlerRootView>
       
  );
}
