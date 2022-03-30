import { useState } from 'react'
import { StatusBar, StyleSheet, SafeAreaView, Dimensions } from 'react-native'
import Loading from '../components/Loading'
import { useQuery } from 'react-query'
import TodoSection from '../components/TodoSection'
import DetailSection from '../components/DetailSection'
import PostSection from '../components/PostSection'
import ScrollableTabView from 'react-native-scrollable-tab-view-forked'

const { height, width } = Dimensions.get('window')

function UserDetail({
  navigation,
  route: {
    params: { userId = '' },
  },
}) {
  const { isLoading, data = null } = useQuery('userDetail', () =>
    fetch(`https://jsonplaceholder.typicode.com/users/${userId}`).then(res =>
      res.json()
    )
  )
  if (isLoading && !data) return <Loading />
  return (
    <SafeAreaView style={styles.container}>
      <ScrollableTabView
        tabBarInactiveTextColor={'black'}
        tabBarActiveTextColor={'black'}
        initialPage={1}
      >
        <DetailSection
          key={1}
          tabLabel="Detail"
          navigation={navigation}
          userId={userId}
        />
        <PostSection
          key={2}
          tabLabel="Post"
          navigation={navigation}
          userId={userId}
        />
        <TodoSection
          key={3}
          tabLabel="Todo"
          navigation={navigation}
          userId={userId}
        />
      </ScrollableTabView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  sectionButton: {},
  indent: {
    marginLeft: 32,
  },
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    backgroundColor: 'white',
  },
  wrapper: {
    padding: 32,
  },
  name: {
    fontSize: 28,
  },
  username: {
    fontSize: 18,
  },
  content: {
    marginTop: 16,
  },
  text: {
    fontSize: 14,
  },
  addressButton: {
    marginTop: 16,
    paddingVertical: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: 'black',
  },
  // modal
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    height,
    width,
    backgroundColor: 'white',
    paddingVertical: 60,
    paddingHorizontal: 24,
    elevation: 5,
  },
  buttonSection: {
    marginTop: 32,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    padding: 10,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: 'black',
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    marginTop: 32,
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
})

export default UserDetail
