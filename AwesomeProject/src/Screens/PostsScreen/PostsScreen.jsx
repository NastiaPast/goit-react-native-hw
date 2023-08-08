import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const PostsScreen = ({ route }) => {
  const [userData, setUserData] = useState(null);
  const [publishedPosts, setPublishedPosts] = useState([]);

  const navigation = useNavigation();

  useEffect(() => {
    if (route.params && route.params.userData) {
      setUserData(route.params.userData);
    } else if (route.params && route.params.publishedPosts) {
      setPublishedPosts(route.params.publishedPosts);
    }
  }, [route.params]);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
    >
      {userData ? (
        <View style={styles.overlay}>
          {userData?.selectedImage && (
            <Image
              source={{ uri: userData.selectedImage }}
              style={styles.image}
            />
          )}
          <View style={styles.wrap}>
            <Text style={styles.textLogin}>{userData.login}</Text>
            <Text style={styles.textEmail}>{userData.email}</Text>
          </View>
        </View>
      ) : (
        <Text>Publications</Text>
      )}

      {publishedPosts.length > 0 &&
        publishedPosts.map((post, index) => (
          <View key={index} style={styles.postWrap}>
            <Image source={{ uri: post.image }} style={styles.postImage} />
            <Text style={styles.postName}>{post.name}</Text>
            <View style={styles.postContainer}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("Comments", { photoUri: post.image })
                }
              >
                <Feather
                  name="message-circle"
                  size={24}
                  color="#BDBDBD"
                  style={styles.flippedIcon}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("Map", {
                    location: post.location,
                  })
                }
              >
                <AntDesign
                  style={styles.iconLocation}
                  name="enviromento"
                  size={24}
                  color="#BDBDBD"
                />
              </TouchableOpacity>
              <Text style={styles.postLocation}>
                {`${post.locationPlaceholder}`}
              </Text>
            </View>
          </View>
        ))}
    </ScrollView>
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
  scrollContent: {
    paddingBottom: 50,
  },
  overlay: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
    marginLeft: 10,
  },
  wrap: {
    marginTop: 25,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 16,
    resizeMode: "cover",
  },
  textLogin: {
    letterSpacing: 0.8,
    fontSize: 20,
    fontFamily: "Roboto-Medium",
  },
  textEmail: {
    letterSpacing: 0.2,
    fontSize: 16,
    fontFamily: "Roboto-Regular",
  },
  postWrap: {
    marginTop: 32,
    marginLeft: "auto",
    marginRight: "auto",
  },
  postImage: {
    width: 343,
    height: 240,
    borderRadius: 8,
  },
  postName: {
    fontFamily: "Roboto-Medium",
    fontSize: 16,
    marginTop: 8,
  },
  flippedIcon: {
    transform: [{ scaleX: -1 }],
  },
  postContainer: {
    display: "flex",
    flexDirection: "row",
    marginTop: 8,
  },
  iconLocation: {
    marginLeft: 64,
    marginRight: 8,
  },
  postLocation: {
    flex: 1,
    textDecorationLine: "underline",
    fontFamily: "Roboto-Regular",
  },
});

export default PostsScreen;
