import { useMemo } from 'react'
import {
  StatusBar,
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  FlatList,
} from 'react-native'
import Loading from '../components/Loading'
import UserCard from '../components/UserCard'
import { useQuery } from 'react-query'

function TodoSection({ userId }) {
  const { isLoading, data = [] } = useQuery('todos', () =>
    fetch('https://jsonplaceholder.typicode.com/todos').then(res => res.json())
  )

  const filteredData = data.filter(x => x.userId === userId)

  if (isLoading) return <Loading />
  console.log(111, filteredData)

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        style={{ backgroundColor: '#eee' }}
        data={filteredData}
        keyExtractor={item => item.id}
        renderItem={({ item, index }) => (
          <View style={styles.item}>
            <Text>{item.title}</Text>
            {item.completed ? (
              <View style={[styles.complete, styles.center]}>
                <Text style={styles.check}>Completed</Text>
              </View>
            ) : (
              <View style={[styles.imcomplete, styles.center]}>
                <Text style={styles.check}>Imcomplete</Text>
              </View>
            )}
          </View>
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
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  item: {
    padding: 20,
    marginVertical: 8,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 32,
  },
  complete: {
    backgroundColor: 'green',
    width: 100,
    height: 20,
  },
  imcomplete: {
    backgroundColor: 'red',
    width: 100,
    height: 20,
  },
  check: {
    color: 'white',
  },
})

export default TodoSection
// export default HomeScreen
// import {
//   StatusBar,
//   StyleSheet,
//   View,
//   Text,
//   SafeAreaView,
//   FlatList,
// } from 'react-native'
// import Loading from '../components/Loading'
// import { useQuery } from 'react-query'

// function Comments() {
//   const { isLoading, data = null } = useQuery('postDetail', () =>
//     fetch('https://jsonplaceholder.typicode.com/posts/1').then(res =>
//       res.json()
//     )
//   )
//   const { isLoading: isLoadingComments, data: list = [] } = useQuery(
//     'comments',
//     () =>
//       fetch('https://jsonplaceholder.typicode.com/posts/1/comments').then(res =>
//         res.json()
//       )
//   )
//   const renderHeader = () => {
//     if (data)
//       return (
//         <>
//           <View style={styles.detailWrapper}>
//             <Text style={styles.title}>Title: {data.title}</Text>
//             <Text>{data.body}</Text>
//           </View>
//           <Text style={styles.subTitle}>Comments</Text>
//         </>
//       )
//     else return null
//   }
//   if (isLoadingComments && isLoading) return <Loading />

//   return (
//     <SafeAreaView style={styles.container}>
//       <FlatList
//         style={{ backgroundColor: '#eee' }}
//         data={list}
//         keyExtractor={item => item.id}
//         ListHeaderComponent={renderHeader}
//         renderItem={({ item }) => (
//           <View style={styles.item}>
//             <Text>Name: {item.name}</Text>
//             <Text>Email: {item.email}</Text>
//             <Text style={{ marginTop: 8 }}>{item.body}</Text>
//           </View>
//         )}
//       />
//     </SafeAreaView>
//   )
// }

// const styles = StyleSheet.create({
//   subTitle: {
//     marginTop: 16,
//     marginLeft: 16,
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   item: {
//     padding: 20,
//     marginVertical: 8,
//     backgroundColor: 'white',
//   },
//   title: {
//     fontSize: 18,
//     marginBottom: 16,
//   },
//   detailWrapper: {
//     backgroundColor: 'white',
//     padding: 16,
//   },
//   container: {
//     flex: 1,
//     marginTop: StatusBar.currentHeight || 0,
//   },
// })

// export default Comments
