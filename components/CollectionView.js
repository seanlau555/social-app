import React, { Component } from 'react'

import { FlatList, StyleSheet, View } from 'react-native'

class CollectionView extends Component {
  groupItems = (items, itemsPerRow) => {
    const itemsGroups = []
    let group = []
    let list = []
    if (items) list = items
    list.forEach(item => {
      if (group.length === itemsPerRow) {
        itemsGroups.push(group)
        group = [item]
      } else {
        group.push(item)
      }
    })

    if (group.length > 0) {
      itemsGroups.push(group)
    }

    return itemsGroups
  }

  renderGroup = ({ item, index }) => {
    const { itemsPerRow } = this.props
    const items = item.map((item, i) => {
      return this.props.renderItem({ item, index: index * itemsPerRow + i })
    })
    return <View style={styles.group}>{items}</View>
  }

  render = () => {
    const groups = this.groupItems(this.props.items, this.props.itemsPerRow)
    return (
      <FlatList
        {...this.props}
        keyExtractor={(_, index) => index.toString()}
        renderItem={this.renderGroup}
        data={groups}
      />
    )
  }
}

var styles = StyleSheet.create({
  group: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
})

export default CollectionView
