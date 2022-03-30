import {
  StatusBar,
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  FlatList,
} from 'react-native'
import Loading from '../components/Loading'
import { useQuery } from 'react-query'

function PostDetail({
  route: {
    params: { postId = '' },
  },
}) {
  const { isLoading, data = null } = useQuery('postDetail', () =>
    fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`).then(res =>
      res.json()
    )
  )
  const { isLoading: isLoadingComments, data: list = [] } = useQuery(
    'comments',
    () =>
      fetch(
        `https://jsonplaceholder.typicode.com/posts/${postId}/comments`
      ).then(res => res.json())
  )
  const renderHeader = () => {
    if (data)
      return (
        <>
          <View style={styles.detailWrapper}>
            <Text style={styles.title}>Title: {data.title}</Text>
            <Text>{data.body}</Text>
          </View>
          <Text style={styles.subTitle}>Comments</Text>
        </>
      )
    else return null
  }
  if (isLoadingComments && isLoading) return <Loading />

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={list}
        keyExtractor={item => item.id}
        ListHeaderComponent={renderHeader}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>Name: {item.name}</Text>
            <Text>Email: {item.email}</Text>
            <Text style={{ marginTop: 8 }}>{item.body}</Text>
          </View>
        )}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  subTitle: {
    marginTop: 16,
    marginLeft: 16,
    fontSize: 18,
    fontWeight: 'bold',
  },
  item: {
    padding: 20,
    marginVertical: 8,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 18,
    marginBottom: 16,
    fontWeight: 'bold',
  },
  detailWrapper: {
    backgroundColor: 'white',
    padding: 16,
  },
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
})

export default PostDetail
