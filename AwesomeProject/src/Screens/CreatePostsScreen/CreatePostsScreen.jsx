import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
import { Camera } from "expo-camera";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";
import * as Location from "expo-location";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

const CreatePostsScreen = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const cameraRef = useRef(null);
  const [photoUri, setPhotoUri] = useState(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [hasTakenPhoto, setHasTakenPhoto] = useState(false);
  const [postTitle, setPostTitle] = useState("");
  const [location, setLocation] = useState({ latitude: 0, longitude: 0 });
  const [locationPlaceholder, setLocationPlaceholder] = useState("");
  const [publishedPosts, setPublishedPosts] = useState([]);

  const navigation = useNavigation();
  const isFocused = useIsFocused();

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  useEffect(() => {
    setLocationPlaceholder("");
  }, [isFocused]);

  const getLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === "granted") {
        const location = await Location.getCurrentPositionAsync({});
        const { coords } = location;
        const address = await Location.reverseGeocodeAsync({
          latitude: coords.latitude,
          longitude: coords.longitude,
        });

        const cityName = address[0].city;
        const countryName = address[0].country;

        setLocation({
          latitude: coords.latitude,
          longitude: coords.longitude,
        });
        setLocationPlaceholder(` ${cityName}, ${countryName}`);
      }
    } catch (error) {
      console.error("Error getting location:", error);
    }
  };

  const takePhoto = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      setPhotoUri(photo.uri);
      setIsCameraOpen(false);
      setHasTakenPhoto(true);
      await savePhotoToGallery(photo.uri);
    }
  };

  const savePhotoToGallery = async (uri) => {
    try {
      const permission = await MediaLibrary.requestPermissionsAsync();

      if (permission.granted) {
        const asset = await MediaLibrary.createAssetAsync(uri);
        console.log("Photo saved to gallery:", asset);
      } else {
        console.log("Permission not granted to access media library");
      }
    } catch (error) {
      console.error("Error saving photo:", error);
    }
  };

  const handleOpenCamera = () => {
    setIsCameraOpen(true);
  };

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const openImagePicker = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled && result.assets.length > 0) {
      setPhotoUri(result.assets[0].uri);
      setHasTakenPhoto(true);
    }
  };

  const publishPost = () => {
    if (hasTakenPhoto && postTitle && locationPlaceholder) {
      const newPost = {
        name: postTitle,
        location: location,
        image: photoUri,
        locationPlaceholder: locationPlaceholder,
      };
      setPublishedPosts([...publishedPosts, newPost]);

      navigation.navigate("Home", {
        screen: "PostsScreen",
        params: { publishedPosts: [...publishedPosts, newPost] },
      });
      getLocation();
      handleDelete();
    }
  };

  const handleDelete = () => {
    setPhotoUri(null);
    setHasTakenPhoto(false);
    setPostTitle("");
    setLocationPlaceholder("");
    setLocation({ latitude: 0, longitude: 0 });
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.overlay}>
        {isCameraOpen && (
          <Camera
            style={styles.camera}
            ref={cameraRef}
            type={Camera.Constants.Type.back}
            ratio={"3:4"}
          />
        )}
        {photoUri && !isCameraOpen && (
          <Image source={{ uri: photoUri }} style={styles.camera} />
        )}
        <TouchableOpacity
          onPress={handleOpenCamera}
          style={[
            styles.openCameraButton,
            { display: isCameraOpen ? "none" : "flex" },
          ]}
        >
          <Ionicons
            style={[
              styles.icon,
              {
                backgroundColor: photoUri
                  ? "rgba(255, 255, 255, 0.2)"
                  : "white",
              },
            ]}
            name="camera"
            size={30}
            color={photoUri ? "white" : "#BDBDBD"}
          />
        </TouchableOpacity>
        {isCameraOpen && (
          <TouchableOpacity onPress={takePhoto} style={styles.captureButton}>
            <Ionicons name="camera" size={30} color="white" />
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.uploadWrap}>
        {hasTakenPhoto ? (
          <TouchableOpacity onPress={openImagePicker}>
            {!isCameraOpen && (
              <Text style={styles.uploadButtonText}>Редагувати</Text>
            )}
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={openImagePicker}>
            {!isCameraOpen && (
              <Text style={styles.uploadButtonText}>Завантажте фото</Text>
            )}
          </TouchableOpacity>
        )}
        <View style={styles.titleInputContainer}>
          <TextInput
            placeholder="Назва..."
            placeholderTextColor="#BDBDBD"
            value={postTitle}
            onChangeText={setPostTitle}
            style={styles.input}
          />
        </View>
        <View style={styles.locationInputContainer}>
          <TouchableOpacity
            onPress={() => {
              if (hasTakenPhoto) {
                getLocation();
              }
            }}
          >
            <AntDesign name="enviromento" size={24} color="#BDBDBD" />
          </TouchableOpacity>
          <TextInput
            placeholder="Місцевість..."
            placeholderTextColor="#BDBDBD"
            value={locationPlaceholder}
            onChangeText={(text) => {
              setLocationPlaceholder(text);
            }}
            style={styles.input}
          />
        </View>
        <TouchableOpacity onPress={publishPost}>
          <Text
            style={[
              styles.publishButtonText,
              {
                backgroundColor:
                  hasTakenPhoto && postTitle && locationPlaceholder
                    ? "#FF6C00"
                    : "#F6F6F6",
              },
              {
                color:
                  hasTakenPhoto && postTitle && locationPlaceholder
                    ? "#FFFFFF"
                    : "#BDBDBD",
              },
            ]}
            disabled={!hasTakenPhoto || !postTitle || !locationPlaceholder}
          >
            Опублікувати
          </Text>
        </TouchableOpacity>
        <View style={styles.bottomButtonContainer}>
          <TouchableOpacity onPress={handleDelete} style={styles.deleteButton}>
            <Feather name="trash-2" size={24} color="#BDBDBD" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    paddingTop: 32,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderColor: "#BDBDBD",
    width: "100%",
    height: "100%",
    paddingLeft: 23,
    paddingRight: 23,
  },
  uploadWrap: {
    marginTop: 5,
  },
  overlay: {
    width: 343,
    height: 240,
    marginLeft: "auto",
    marginRight: "auto",
    backgroundColor: "#E8E8E8",
    borderRadius: 8,
  },
  camera: {
    flex: 1,
    width: "100%",
    height: "100%",
    position: "absolute",
    top: 0,
    left: 0,
    borderRadius: 8,
  },
  icon: {
    padding: 15,
    borderRadius: 40,
  },
  openCameraButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 20,
  },
  preview: {
    width: 100,
    height: 240,
    position: "absolute",
    bottom: 16,
    right: 16,
    borderWidth: 2,
    borderColor: "white",
  },
  captureButton: {
    position: "absolute",
    bottom: 16,
    alignSelf: "center",
  },
  uploadButtonText: {
    color: "#BDBDBD",
    letterSpacing: 0.2,
    fontSize: 16,
    fontFamily: "Roboto-Regular",
  },
  input: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
  },
  titleInputContainer: {
    marginTop: 32,
    borderBottomWidth: 1,
    borderColor: "#E8E8E8",
    paddingBottom: 5,
  },
  locationInputContainer: {
    display: "flex",
    flexDirection: "row",
    marginTop: 25,
    borderBottomWidth: 1,
    borderColor: "#E8E8E8",
    gap: 5,
    alignItems: "center",
    paddingBottom: 5,
    marginBottom: 32,
    paddingRight: 30,
  },
  publishButtonText: {
    textAlign: "center",
    paddingTop: 16,
    paddingBottom: 16,
    borderRadius: 25,
  },

  bottomButtonContainer: {
    position: "absolute",
    bottom: "-72%",
    left: 0,
    right: 0,
  },

  deleteButton: {
    backgroundColor: "#F6F6F6",
    paddingRight: 23,
    paddingLeft: 23,
    paddingBottom: 8,
    paddingTop: 8,
    borderRadius: 25,
    marginLeft: "auto",
    marginRight: "auto",
  },
});

export default CreatePostsScreen;
