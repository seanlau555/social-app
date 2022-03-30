import { useState, useMemo } from 'react'
import {
  FlatList,
  View,
  Pressable,
  TouchableOpacity,
  StatusBar,
  StyleSheet,
  SafeAreaView,
  Text,
  Modal,
  Dimensions,
} from 'react-native'
import Loading from '../components/Loading'
import { useQuery } from 'react-query'

const { height, width } = Dimensions.get('window')

function UserDetail({ navigation, userId }) {
  const [modalVisible, setModalVisible] = useState(false)

  const { isLoading: isLoadingAlbum, data: album = [] } = useQuery(
    'albums',
    () =>
      fetch(`https://jsonplaceholder.typicode.com/albums`).then(res =>
        res.json()
      )
  )
  const { isLoading, data = null } = useQuery('userDetail', () =>
    fetch(`https://jsonplaceholder.typicode.com/users/${userId}`).then(res =>
      res.json()
    )
  )
  const filteredAlbum = useMemo(
    () => album.filter(x => x.userId === userId),
    [album]
  )

  const onPressAddress = () => {
    setModalVisible(true)
  }
  const onPressAlbumDetail = item => {
    if (navigation) {
      navigation.push('Album', { albumId: item.id })
    }
  }
  const renderHeader = () => {
    return (
      <View style={styles.wrapper}>
        <Text style={styles.name}>{data.name}</Text>
        <Text style={styles.username}>@{data.username}</Text>
        <View style={styles.content}>
          {data.email && <Text style={styles.text}>Email: {data.email}</Text>}
          {data.phone && <Text style={styles.text}>Phone: {data.phone}</Text>}
          {data.website && (
            <Text style={styles.text}>Website: {data.website}</Text>
          )}
          {data.company && (
            <>
              <Text style={styles.text}>Company: {data.company.name}</Text>
              <Text style={[styles.text, styles.indent]}>
                {data.company.catchPhrase}
              </Text>
              <Text style={[styles.text, styles.indent]}>
                {data.company.bs}
              </Text>
            </>
          )}
          {data.address && (
            <TouchableOpacity
              style={[styles.addressButton]}
              onPress={onPressAddress}
            >
              <Text>Address</Text>
            </TouchableOpacity>
          )}
        </View>
        <Text style={styles.subTitle}>Album</Text>
      </View>
    )
  }
  if (isLoading && isLoadingAlbum) return <Loading />
  return (
    <SafeAreaView style={styles.container}>
      <Modal
        style={{ height: 300 }}
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.')
          setModalVisible(!modalVisible)
        }}
      >
        <View style={styles.centeredView}>
          {data.address && (
            <View style={styles.modalView}>
              <Text style={styles.name}>Address</Text>
              <Text style={styles.username}>Street: {data.address.street}</Text>
              <Text style={styles.username}>Suite: {data.address.suite}</Text>
              <Text style={styles.username}>City: {data.address.city}</Text>
              <Text style={styles.username}>
                Zipcode: {data.address.zipcode}
              </Text>
              <Text style={styles.username}>
                Geo location: {data.address.geo.lat}, {data.address.geo.lng}
              </Text>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>Hide Address</Text>
              </Pressable>
            </View>
          )}
        </View>
      </Modal>

      <FlatList
        style={{ backgroundColor: '#eee' }}
        data={filteredAlbum}
        keyExtractor={item => item.id}
        ListHeaderComponent={renderHeader}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() => onPressAlbumDetail(item)}
          >
            <Text>Album name: {item.title}</Text>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  subTitle: {
    marginTop: 32,
    fontSize: 18,
    fontWeight: 'bold',
  },
  indent: {
    marginLeft: 32,
  },
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    backgroundColor: 'white',
  },
  item: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    marginVertical: 8,
    backgroundColor: 'white',
  },
  wrapper: {
    backgroundColor: 'white',
    padding: 20,
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
