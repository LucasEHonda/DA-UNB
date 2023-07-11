import { addDoc } from 'firebase/firestore';
import React, { useCallback, useLayoutEffect, useState } from 'react';
// import { GiftedChat } from 'react-native-gifted-chat';
import { set } from 'react-native-reanimated';

export default function Chat({ route }){
//     const { messages_, interestedUser } = route.params;
//     const [messages, setMessages] = useState(messages_);

//   useLayoutEffect(() => {


//   }, []);

//   const onSend = useCallback((messages = []) => {
//     setMessages(previousMessages => GiftedChat.append(previousMessages. messages))

//     const { id, createdAt, message, user } = messages[0]
//     addDoc(collection(db, "chats"), {
//         id,
//         createdAt,
//         message,
//         user
//     }, [])

//   })

  return (
    <></>
    // <GiftedChat
    //   messages={messages}
    //   onSend={messages => onSend(messages)}
    //   user={{
    //     _id: 1,
    //   }}
    // />
  );
};

