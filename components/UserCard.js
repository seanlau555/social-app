import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  Dimensions,
} from 'react-native'

const { width } = Dimensions.get('window')

function UserCard({ item, onPress }) {
  return (
    <TouchableOpacity style={[styles.item]} onPress={onPress}>
      <View style={{ backgroundColor: 'white' }}>
        <Text>{item.name}</Text>
        <Text>@{item.username}</Text>
      </View>
    </TouchableOpacity>
  )
}
export default UserCard

const styles = StyleSheet.create({
  item: {
    width,
    padding: 20,
    marginVertical: 8,
    backgroundColor: 'white',
  },
})
