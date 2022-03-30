import { useMemo } from 'react'
import {
  StatusBar,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Text,
  FlatList,
} from 'react-native'
import Loading from '../components/Loading'
import { useQuery } from 'react-query'

function PostSection({ navigation, userId }) {
  const { isLoading, data = [] } = useQuery('posts', () =>
    fetch('https://jsonplaceholder.typicode.com/posts').then(res => res.json())
  )

  const filteredData = useMemo(
    () => data.filter(x => x.userId === userId),
    [data]
  )
  const onPressPost = item => {
    if (navigation) {
      navigation.push('Post detail', { postId: item.id })
    }
  }

  if (isLoading) return <Loading />
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        style={{ backgroundColor: '#eee' }}
        data={filteredData}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => onPressPost(item)}
            style={styles.item}
          >
            <Text style={styles.title}>Title: {item.title}</Text>
            <Text>{item.body}</Text>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    padding: 20,
    marginVertical: 8,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
})

export default PostSection
