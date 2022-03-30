import {
  StatusBar,
  StyleSheet,
  View,
  Image,
  Text,
  SafeAreaView,
  Dimensions,
} from 'react-native'
import Loading from '../components/Loading'
import CollectionView from '../components/CollectionView'
import { useQuery } from 'react-query'
const { width } = Dimensions.get('window')
const cardSize = width / 2 - 32

function Album({
  route: {
    params: { albumId = '' },
  },
}) {
  const { isLoading, data = [] } = useQuery('photos', () =>
    fetch(`https://jsonplaceholder.typicode.com/albums/${albumId}/photos`).then(
      res => res.json()
    )
  )
  const renderItemCard = ({ item }) => {
    return (
      <View style={styles.card}>
        <Image style={styles.image} source={{ uri: item.url }}></Image>
        <Text>{item.title}</Text>
      </View>
    )
  }
  if (isLoading) return <Loading />
  return (
    <SafeAreaView style={styles.container}>
      <CollectionView
        items={data}
        itemsPerRow={2}
        style={{ backgroundColor: 'white' }}
        renderItem={renderItemCard}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    backgroundColor: 'white',
  },
  card: {
    width: cardSize,
    marginBottom: 8,
    marginHorizontal: 8,
  },
  image: {
    width: cardSize,
    height: cardSize,
  },
  title: {
    fontSize: 32,
  },
})

export default Album
