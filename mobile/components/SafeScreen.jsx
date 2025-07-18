import { Text, View } from 'react-native'
import { useSafeAreaInsets } from "react-native-safe-area-context"
import {COLORS} from "@/constants/colors"

export default function SafeScreen({children}) {
    const insets = useSafeAreaInsets()

    return (
      <View style={{padding: insets.top, flex: 1, backgroundColor: COLORS.background}}>
        {children}
      </View>
    )

}
