import { StyleSheet, Text, View } from "react-native";

type CustomMarkerProps = {
  time: string;
};

// Custom marker for the map to show the pickup time and drop off time
const CustomMarker = ({ time }: CustomMarkerProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.circle}>
        <Text style={styles.time}>{time}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  circle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'orange',
    justifyContent: 'center',
    alignItems: 'center',
  },
  time: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default CustomMarker;
