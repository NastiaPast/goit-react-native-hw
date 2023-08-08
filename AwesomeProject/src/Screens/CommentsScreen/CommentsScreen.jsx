import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import { Feather } from "@expo/vector-icons";

const CommentsScreen = ({ route }) => {
  const { photoUri } = route.params;
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [messageDates, setMessageDates] = useState([]);

  const handleSendMessage = () => {
    if (newMessage) {
      setMessages([...messages, newMessage]);
      setMessageDates([...messageDates, getCurrentDateTime()]);
      setNewMessage("");
    }
  };

  const getCurrentDateTime = () => {
    const currentDateTime = new Date();

    const ukrMonths = [
      "січня",
      "лютого",
      "березня",
      "квітня",
      "травня",
      "червня",
      "липня",
      "серпня",
      "вересня",
      "жовтня",
      "листопада",
      "грудня",
    ];
    const day = currentDateTime.getDate().toString().padStart(2, "0");
    const month = ukrMonths[currentDateTime.getMonth()];
    const year = currentDateTime.getFullYear();
    const hours = currentDateTime.getHours().toString().padStart(2, "0");
    const minutes = currentDateTime.getMinutes().toString().padStart(2, "0");
    return `${day} ${month}, ${year} | ${hours}:${minutes}`;
  };

  return (
    <View style={styles.container}>
      <View style={styles.wrap}>
        <Image source={{ uri: photoUri }} style={styles.photo} />
      </View>
      <FlatList
        data={messages}
        renderItem={({ item, index }) => (
          <View style={styles.messageContainer}>
            <Text style={styles.messageText}>{item}</Text>
            <Text style={styles.messageDate}>{messageDates[index]}</Text>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Написати повідомлення..."
          value={newMessage}
          onChangeText={setNewMessage}
          style={styles.input}
        />
        <TouchableOpacity onPress={handleSendMessage} style={styles.sendButton}>
          <Feather name="send" size={24} color="#FF6C00" />
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingRight: 16,
    paddingLeft: 16,
    paddingTop: 32,
    borderTopWidth: 1,
    backgroundColor: "#FFFFFF",
    borderColor: "#BDBDBD",
  },
  wrap: {
    marginLeft: "auto",
    marginRight: "auto",
  },
  photo: {
    width: 343,
    height: 240,
    borderRadius: 8,
  },
  messageDate: {
    fontSize: 12,
    color: "#BDBDBD",
    textAlign: "right",
  },

  messageContainer: {
    backgroundColor: "#F6F6F6",
    padding: 8,
    borderRadius: 8,
    marginBottom: 8,
  },
  messageText: {
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 16,
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: "#BDBDBD",
    borderRadius: 8,
    paddingHorizontal: 8,
    marginRight: 8,
  },
  sendButton: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 8,
  },
});

export default CommentsScreen;
