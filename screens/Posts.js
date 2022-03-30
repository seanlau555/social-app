import { StatusBar, StyleSheet, SafeAreaView, FlatList } from 'react-native'
import Loading from '../components/Loading'
import UserCard from '../components/UserCard'
import { useQuery } from 'react-query'

function HomeScreen() {
  const { isLoading, data = [] } = useQuery('repoData', () =>
    fetch('https://jsonplaceholder.typicode.com/users').then(res => res.json())
  )
  const onPressUserCard = userId => {}
  if (isLoading) return <Loading />
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={item => item.id}
        renderItem={({ item, index }) => (
          <UserCard item={item} onPress={onPressUserCard} key={item.key} />
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
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
})

export default HomeScreen
