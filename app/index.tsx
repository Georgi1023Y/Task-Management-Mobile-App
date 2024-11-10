import { Text, View,TextInput, Pressable, FlatList, StatusBar } from "react-native";
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import "../global.css"
import React, { useEffect } from "react";
import { Icon } from '@iconify/react';

export default function Index() {
  const [lightMode, setLightMode] = React.useState(false);
  const [text, setText] = React.useState('');
  const [myTasks, setMyTasks] = React.useState([
    {
      id: '1',
      title: 'Трябва да програмирам',
    },
    {
      id: '2',
      title: 'Трябва да уча',
    },
    {
      id: '3',
      title: 'Трябва да се подстрижа',
    },
  ]);

   // Функция, която добавя задача
   const addTask = () => {
    if(text.trim()) {
      const newTask = { id: Date.now().toString(), title: text };
      setMyTasks([...myTasks, newTask]);
      setText('');
    }
   }

  //  Функция за едитване на задача
  const editTask = () => {

  }

  type ItemProps = {title: string};

  const Item = ({title}: ItemProps) => (
    <View className="flex flex-col gap-4 mt-8">
      <View className="flex flex-row items-center justify-between w-full">
        {/* Tasks */}
        <Text className={`font-normal text-sm ${lightMode ? 'text-black' : 'text-white'}`}>
          {title}
        </Text>
        {/* Edit and Delete Icons */}
        <View className="flex flex-row gap-4">
          <Pressable onPress={editTask}>
            <Icon icon="ic:round-edit"  className={`${lightMode ? 'text-black' : 'text-white'} w-[18px] h-[18px]`}/>
          </Pressable>
          <Pressable>
            <Icon icon="pajamas:remove"  className={`${lightMode ? 'text-black' : 'text-white'} w-[px] h-[18px]`} />
          </Pressable>  
        </View>
      </View>  
    </View>
  );

  const handleModeChange = () => {
    setLightMode(!lightMode);
  }
  

  return (
    <View
      className={`flex p-5 gap-5 min-h-screen ${lightMode ? 'bg-white' : 'bg-darkBackground'}`}
    >
      {/* Light or Dark mode */}
      <View className="flex flex-row gap-3.5 items-center justify-center">
        {/* Sun Button */}
        {
          lightMode ? (
            <>
              <Icon icon="solar:sun-outline"  className={`${lightMode ? 'text-black' : 'text-white'} w-[24px] h-[24px]`} onClick={handleModeChange}/>
            </>
          ) : (
            <>
              <Icon icon="solar:sun-bold-duotone" className={`${lightMode ? 'text-black' : 'text-white'} w-[24px] h-[24px]`} onClick={handleModeChange}/>
            </>
          )
        }
        {/* Moon Button */}
        {
          lightMode ? (
            <>
             <Icon icon="flowbite:moon-solid" className={`${lightMode ? 'text-black' : 'text-white'} w-[24px] h-[24px]`} onClick={handleModeChange}/>
            </>
          ) : (
            <>
            <Icon icon="flowbite:moon-outline"  className={`${lightMode ? 'text-black' : 'text-white'} w-[24px] h-[24px]`} onClick={handleModeChange}/>
            </>
          )
        }    
      </View>
      <Text className={`text-base font-semibold ${lightMode ? 'text-black': 'text-white'}  text-center`}>Приложение за управление на задачите</Text>
      <View className="flex mt-8 flex-col gap-5 w-full">
        <Text className={`text-sm font-normal ${lightMode ? 'text-black': 'text-white'}`}>Добави задача</Text>
        <TextInput
          placeholder="Добави задача"
          onChangeText={setText}
          value={text}
          className={`text-xs w-full h-[40px] rounded-md ${lightMode ? 'text-black': 'text-white'} pl-4 ${lightMode ? 'bg-lightDiv' : 'bg-darkDiv'}`}
        />
        <View className="flex items-center justify-center">
         <Pressable className={`flex items-center justify-center w-[140px] py-3.5 rounded-3xl ${lightMode ? 'bg-black' : 'bg-lightDiv'}`} onPress={addTask}>
           <Text className={`${lightMode ? 'text-white' : 'text-black'} font-semibold text-xs`}>Добави задача</Text>
         </Pressable>
        </View>  
      </View> 
      {/* Tasks */}
      <SafeAreaProvider>
        <SafeAreaView>
          <FlatList
            data={myTasks}
            renderItem={({item}) => <Item title={item.title} />}
            keyExtractor={item => item.id}
          />
        </SafeAreaView>
      </SafeAreaProvider>
    </View>
  );
}
