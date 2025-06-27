import { Image } from "expo-image";
import { Link } from "expo-router";
import { Text, View, StyleSheet } from "react-native";

export default function Index() {
  return (
    <View
      style={styles.container}
    >
      <Text style={{color: "white"}}>Edit app/index.tsx to edit this screen.hellow 123</Text>
      <Link href={"/about"}>About Me</Link>

      <Image style={{ width: 200, height: 400}} source={{uri: "https://images.unsplash.com/photo-1750439799809-e8067c8d3ff5?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw5fHx8ZW58MHx8fHx8"}} />
      <Image style={{ width: 100, height: 100}} source={require("@/assets/images/react-logo.png")} />

      <View>
        <Text>hello</Text>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  }
})