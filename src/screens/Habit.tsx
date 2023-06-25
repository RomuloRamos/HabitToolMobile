import { Alert, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native"; //Used to retrieve the params values passed throug the route calling
import { BackButton } from "../components/BackButton";
import dayjs from "dayjs";
import { ProgressBar } from "../components/ProgressBar";
import { Checkbox } from "../components/Checkbox";
import React, { useEffect, useState } from "react";
import { Loading } from "../components/Loading";
import { api } from "../lib/axios";
import colors from "tailwindcss/colors";
import { Feather } from "@expo/vector-icons";

interface Params {
    date: string
}

interface DayHabitsProps {
    completedHabits: string[];
    possibleHabits: {
        id: string;
        title: string;
    }[];
}

const dayHabits_default:DayHabitsProps = {
    completedHabits: [],
    possibleHabits:[]
} 

export function Habit() {
    const [loading, setLoading] = useState(true);   
    const [dayHabits, setDayHabits] = useState<DayHabitsProps>( {} as DayHabitsProps );
    const {navigate} = useNavigation();

    const route = useRoute();
    const { date } = route.params as Params;

    const parsedDate = dayjs(date);
    const dayOfWeek = parsedDate.format('dddd');
    const dayAndMonth = parsedDate.format('DD/MM'); 

    const completedPercent = dayHabits.possibleHabits?.length>0?Math.round((dayHabits.completedHabits.length/dayHabits.possibleHabits.length * 100)):0;

    async function fetchHabits() {
        try {
            setLoading(true);

            const response = await api.get('/day', { params:{ date} });
            setDayHabits(response.data);

        } catch (error) {
            
            console.log(error);
            Alert.alert('Ops...','Não foi possível carregas os hábitos do dia');
        }
        finally{
            setLoading(false)
        }
    }

    async function handleToggleHabit(habitId: string){

        try {
            const toggleResponse = await api.patch(`/habits/${date}/${habitId}/toggle`);

    
            let newCompletedHabits:string [] = [];
            if(toggleResponse.data.toggle === 1)
            {
                newCompletedHabits = [...dayHabits.completedHabits, habitId];
            }
            else{
                newCompletedHabits = dayHabits.completedHabits.filter(id => id !== habitId);
            }
            setDayHabits(prevState => ({...prevState, completedHabits: newCompletedHabits}));
            
        } catch (error) {
            console.log(error);
            Alert.alert('Ops, falha na conexão com o servidor');
        }
    }

    useEffect(()=>{
        fetchHabits();
    },[])


    if(loading)
    {
        return <Loading></Loading>
    }

    return (
        <View className="flex-1 bg-background px-8 pt-16">
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{paddingBottom: 100}}
            >
                <BackButton/>

                <Text 
                    className="mt-6 text-zinc-400 font-semibold text-base lowercase"
                >
                    {dayOfWeek}
                </Text>

                <Text 
                    className="text-white font-extrabold text-3xl"
                >
                    {dayAndMonth}
                </Text>

                <ProgressBar progress={completedPercent}/>

                <View className="mt-6">
                    {
                        dayHabits?.possibleHabits.length > 0 ?
                        dayHabits?.possibleHabits.map( habit =>{

                            return (
                                <Checkbox
                                    key={habit.id}
                                    title={habit.title}
                                    checked={dayHabits.completedHabits.includes(habit.id)}
                                    onPress={()=>handleToggleHabit(habit.id)}
                                />
                            )

                        })
                        :
                        <>
                        <Text className="text-white font-extrabold text-2xl">
                            Não há hábitos registrados para hoje, aproveite seu dia :)
                        </Text>
                        <View className="w-full flex-col items-center">
                            <Text className="text-zinc-400 text-base mt-6">
                                ...ou, cadastre um novo hábito:
                            </Text>
                            <TouchableOpacity
                                activeOpacity={0.7}
                                className="flex-row h-11 px-4 border border-violet-500 rounded-lg items-center"
                                onPress={()=> navigate('new')}
                            >
                                <Feather name="plus" color={colors.violet[500]} size={20}/>

                                <Text className="text-white ml-3 font-semibold text-base">
                                    Novo
                                </Text>
                            </TouchableOpacity>
                        </View>
                        </>
                    }
                </View>

            </ScrollView>   
        </View>
    )
}