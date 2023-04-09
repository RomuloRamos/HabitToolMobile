import { Text, TouchableOpacity, TouchableOpacityProps, View } from "react-native";
import {Feather} from "@expo/vector-icons";
import colors from "tailwindcss/colors";

interface Props extends TouchableOpacityProps {
    title: string
    checked?: boolean
}

export function Checkbox({title, checked = false, ...rest}: Props){

    const Activated = (
        <View className="h-8 w-8 bg-green-500 rounded-lg items-center justify-center">
            <Feather
                name="check"
                size={20}
                color={colors.white}
            />
        </View>
    );

    const Deactivated = (
        <View className="h-8 w-8 bg-zinc-900 rounded-lg"/>
    );

    return (

        <TouchableOpacity
            activeOpacity={0.7}
            className=" flex-row mb-2 items-center"
            {...rest}
        >
            {
                checked ? Activated: Deactivated
            }

            <Text className="text-white text-base ml-3 font-semibold">
                {title}
            </Text>

        </TouchableOpacity>
    )
}