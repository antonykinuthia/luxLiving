import { View, Text } from 'react-native'
import React, { useMemo, useRef } from 'react'
import BottomSheet from '@gorhom/bottom-sheet';

const BottomSheets = ({ sheetRef }: any) => {
    const snapPoints  = useMemo(() => ['25%', '50%'], []);
  return (
    <View className='flex-1 justify-center bg-white/5'>
        <BottomSheet ref={sheetRef} index={-1}
         snapPoints={snapPoints}>
          <Text className='font-rubik-bold text-2xl'>Let Me Cook</Text>
        </BottomSheet>
    </View>
  )
}

export default BottomSheets