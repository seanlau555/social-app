import { StatusBar, StyleSheet, SafeAreaView, FlatList } from 'react-native'
import Loading from '../components/Loading'
import UserCard from '../components/UserCard'
import { useQuery } from 'react-query'

function HomeScreen(props) {
  const { isLoading, data = [] } = useQuery('userList', () =>
    fetch('https://jsonplaceholder.typicode.com/users').then(res => res.json())
  )

  const onPressUserCard = userId => {
    if (props.navigation) {
      props.navigation.push('User Detail', { userId })
    }
  }

  if (isLoading) return <Loading />
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <UserCard
            item={item}
            onPress={() => onPressUserCard(item.id)}
            key={item.key}
          />
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
  title: {
    fontSize: 32,
  },
})

export default HomeScreen
