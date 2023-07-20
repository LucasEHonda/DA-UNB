import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import { db } from "../../service/firebase";
import { getDoc, doc, updateDoc } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import { v4 as uuidv4 } from "uuid";
import { userFromStorage } from "../../utils/userFromStorage";

const ChatMessage = ({ message, date, messageBy }) => {
  return (
    <View
      style={[
        styles.message,
        messageBy === "interested" ? styles.incoming : styles.outgoing,
      ]}
    >
      <View style={styles.messageContent}>
        <Text>{message}</Text>
        <Text style={styles.date}>{date}</Text>
      </View>
    </View>
  );
};

export default function Chat({ route }) {
  const navigation = useNavigation();
  const [messages, setMessages] = useState([]);
  const [chat, setChat] = useState({});
  const [user, setUser] = useState({});
  const [newMessage, setNewMessage] = useState("");

  async function getMessages() {
    const querySnapshot = await getDoc(doc(db, "chats", route?.params?.chatId));
    const chat_ = querySnapshot.data();
    setMessages(chat_?.messages);
    setChat({ ...chat_, id: chat_.id });
  }

  async function updateChat(messages_) {
    const chat_ = chat;
    delete chat_["id"];
    await updateDoc(doc(db, "chats", route?.params?.chatId), {
      ...chat_,
      messages: messages_,
    });
  }

  async function getUser() {
    const user_ = await userFromStorage();
    setUser(user_);
  }

  const sendMessage = () => {
    if (newMessage.trim() === "") return;

    const date = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    const message_ = {
      id: uuidv4(),
      message: newMessage,
      date,
      messageBy: user.uid === chat.owner ? "owner" : "interested",
    };

    setMessages([...messages, message_]);
    setNewMessage("");
    updateChat([...messages, message_]);
    getMessages();
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getMessages();
      getUser();
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.container}>
      <ScrollView style={styles.chat}>
        {messages.map((message) => (
          <ChatMessage
            key={message.id}
            message={message.message}
            date={message.date}
            messageBy={message.messageBy}
          />
        ))}
      </ScrollView>
      <View style={styles.messageInput}>
        <TextInput
          style={styles.input}
          placeholder="Digite sua mensagem..."
          value={newMessage}
          onChangeText={(text) => setNewMessage(text)}
        />
        <TouchableOpacity style={styles.button} onPress={sendMessage}>
          <Text style={styles.buttonText}>Enviar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  chat: {
    flex: 1,
    padding: 10,
  },
  message: {
    padding: 8,
    borderRadius: 5,
    marginBottom: 8,
    maxWidth: "80%",
  },
  incoming: {
    backgroundColor: "#f1f0f0",
    alignSelf: "flex-start",
  },
  outgoing: {
    backgroundColor: "#dcf8c6",
    alignSelf: "flex-end",
  },
  messageContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  date: {
    fontSize: 12,
    color: "#777",
    marginLeft: 8,
  },
  messageInput: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
  },
  input: {
    flex: 1,
    padding: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
  button: {
    padding: 8,
    marginLeft: 8,
    backgroundColor: "#0088cc",
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
  },
});
