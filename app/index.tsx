import { Text, View,TextInput, Pressable, FlatList, StatusBar } from "react-native";
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import "../global.css"
import React, { useEffect } from "react";
import { Icon } from '@iconify/react';

export default function Index() {
  const [lightMode, setLightMode] = React.useState(false);
  const [text, setText] = React.useState('');
  const [onEditMode, setOnEditMode] = React.useState(false);
  const [currentEditId, setCurrentEditId] = React.useState(null);
  const [myTasks, setMyTasks] = React.useState([
    {
      id: '1',
      title: 'Трябва да програмирам',
    },
  ]);

  // Add task function
  const addTask = () => {
    if (text.trim()) {
      const newTask = { id: Date.now().toString(), title: text};
      setMyTasks([...myTasks, newTask]);
      setText('');
    }
  }

  // Edit Mode function
  const myEditMode = (id) => {
    setOnEditMode(true);
    setCurrentEditId(id);
  }

  // Edit Task function
  const editTask = (updatedTitle) => {
    if (updatedTitle.trim()) {
      const updatedTasks = myTasks.map(task => 
        task.id === currentEditId ? {...task, title: updatedTitle} : task
      );
      setMyTasks(updatedTasks);
      setOnEditMode(false);
      setCurrentEditId(null);
    }
  }

  // Delete Task Function
  const deleteTask = (id) => {
    const filteredTasks = myTasks.filter(task => task.id !== id);
    setMyTasks(filteredTasks);
  };

  // Each task component
  const Item = ({id, title}: {id: string, title: string}) => {
    const [editedText, setEditedText] = React.useState(title);
  
    return (
      <View className="flex flex-col gap-4 mt-8">
        <View className="flex flex-row items-center justify-between w-full">
          {/* Tasks */}
          <Text className={`font-normal text-sm ${lightMode ? 'text-black' : 'text-white'}`}>
            {title}
          </Text>
          {/* Edit and Delete Icons */}
          <View className="flex flex-row gap-4">
            <Pressable onPress={() => myEditMode(id)}>
              <Icon icon="ic:round-edit" className={`${lightMode ? 'text-black' : 'text-white'} w-[18px] h-[18px]`} />
            </Pressable>
            <Pressable onPress={() => deleteTask(id)}>
              <Icon icon="pajamas:remove" className={`${lightMode ? 'text-black' : 'text-white'} w-[18px] h-[18px]`} />
            </Pressable>
          </View>
        </View>
        {/* This shows only if edit mode is turned on */}
        {
          onEditMode && (
            <View className="gap-4 flex items-start justify-start">
              <TextInput
                placeholder="Промени задачата"
                value={editedText}
                onChangeText={setEditedText}
                className={`text-xs w-full h-[40px] rounded-md ${lightMode ? 'text-black': 'text-white'} pl-4 ${lightMode ? 'bg-lightDiv' : 'bg-darkDiv'}`}
              />
              <View className="flex items-center justify-center">
                <Pressable
                  className={`flex items-center justify-center w-[140px] py-3.5 rounded-3xl ${lightMode ? 'bg-black' : 'bg-lightDiv'}`}
                  onPress={() => editTask(editedText)}
                >
                  <Text className={`${lightMode ? 'text-white' : 'text-black'} font-semibold text-xs`}>Промени задачата</Text>
                </Pressable>
              </View>
            </View>
          )
        }
      </View>
    );
  };
  

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
              <Icon icon="solar:sun-bold-duotone" className={`${lightMode ? 'text-black' : 'text-white'} w-[24px] h-[24px]`} onClick={() => setLightMode(false)}/>
            </>
          ) : (
            <>
              <Icon icon="solar:sun-outline"  className={`${lightMode ? 'text-black' : 'text-white'} w-[24px] h-[24px]`} onClick={() => setLightMode(true)}/>
            </>
          )
        }
        {/* Moon Button */}
        {
          lightMode ? (
            <>
            <Icon icon="flowbite:moon-outline"  className={`${lightMode ? 'text-black' : 'text-white'} w-[24px] h-[24px]`} onClick={() => setLightMode(false)}/>
            </>
          ) : (
            <>
             <Icon icon="flowbite:moon-solid" className={`${lightMode ? 'text-black' : 'text-white'} w-[24px] h-[24px]`} onClick={() => setLightMode(true)}/>
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
         <Pressable className={`flex items-center justify-center w-[140px] py-3.5 rounded-3xl ${lightMode ? 'bg-black' : 'bg-lightDiv'}`} onPress={() => addTask()}>
           <Text className={`${lightMode ? 'text-white' : 'text-black'} font-semibold text-xs`}>Добави задача</Text>
         </Pressable>
        </View>  
      </View> 
      {/* Tasks */}
      <SafeAreaProvider>
        <SafeAreaView>
          <FlatList
            data={myTasks}
            renderItem={({item}) => <Item title={item.title} id={item.id}/>}
            keyExtractor={item => item.id}
          />
        </SafeAreaView>
      </SafeAreaProvider>
    </View>
  );
}