import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const SuggestionsList = ({products, navigation}: any) => {
  return (
    <FlatList
      horizontal={false}
      data={products}
      numColumns={2}
      contentContainerStyle={{paddingHorizontal: 20}}
      style={{
        alignItems: 'center',
        flexDirection: 'column',
      }}
      renderItem={({item}) => (
        <TouchableOpacity
          key={`id_${item?.id}`}
          onPress={() =>
            navigation.navigate('ProductDetailScreen', {selectedItem: item})
          }>
          <View style={styles.groupProduct}>
            <View style={styles.featuredProducts}>
              {item?.Files?.length > 0 ? (
                <Image
                  source={{uri: item.Files[0].src}}
                  style={styles.itemPhoto}
                  resizeMode="cover"
                />
              ) : (
                <Image
                  source={require('../../assets/no_image.jpg')}
                  style={styles.itemPhoto}
                  resizeMode="cover"
                />
              )}
              <View>
                <Text numberOfLines={1} style={styles.itemText}>
                  {item.name}
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    padding: 6,
                    marginBottom: 10,
                    justifyContent: 'space-between',
                  }}>
                  <View style={styles.star}>
                    <Ionicons name="star" style={styles.starIcon} />
                    <Text style={styles.textIcon}>4.5</Text>
                  </View>
                  <Text numberOfLines={1} style={styles.itemPrice}>
                    {item.price
                      ?.toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
                    đ
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      )}
      keyExtractor={item => item.id}
    />
  );
};

const styles = StyleSheet.create({
  groupProduct: {
    justifyContent: 'flex-end',
  },
  featuredProducts: {
    backgroundColor: 'white',
    borderRadius: 10,
    width: 160,
    marginHorizontal: 5,
    marginTop: 20,
    marginBottom: 20,
  },
  itemPhoto: {
    alignSelf: 'center',
    marginTop: 16,
    width: 120,
    height: 120,
    borderRadius: 10,
    justifyContent: 'space-between',
  },
  itemText: {
    color: 'black',
    fontSize: 16,
    textAlign: 'center',
    padding: 14,
  },
  star: {
    flexDirection: 'row',
    alignSelf: 'center',
    gap: 5,
    paddingLeft: 6,
  },
  starIcon: {
    alignSelf: 'center',
    fontSize: 16,
    color: '#ffa000',
  },
  itemPrice: {
    color: '#fff',
    fontSize: 13,
    padding: 4,
    backgroundColor: '#ffa000',
    borderRadius: 6,
    marginRight: 4,
  },

  textIcon: {
    fontSize: 13,
    alignSelf: 'center',
  },
});

export default SuggestionsList;
