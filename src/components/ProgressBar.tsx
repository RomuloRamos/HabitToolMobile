import { useEffect } from "react";
import { View } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";

interface Props {
    progress?: number
}

export function ProgressBar({progress = 0}:Props){

    const sharedProgress = useSharedValue(progress) //This is similar to react states, but used to animations

    const style = useAnimatedStyle(()=>{//This function is used to defines a animated style that will be used in the component
        return {
            width:`${sharedProgress.value}%`
        }
    })

    useEffect(()=>{
        sharedProgress.value = withTiming(progress); //It's the effec from the reanimated library the is used to update the progress bar
    },[progress]) //This ensures that always the progress value changes, the useEffec will run. 

    return(
        <View className="w-full h-3 rounded-xl bg-zinc-700 mt-4"> 
        
            <Animated.View //It's a animated view
                className="h-3 rounded-xl bg-violet-600"
                style={ style }
            />
        
        </View>
    );
}