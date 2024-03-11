import React, {useState, useEffect} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  Modal,
  Pressable,
} from 'react-native';
import api from '../api/request';
import {useNavigation} from '@react-navigation/native';

const ProductScreen = () => {
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const navigation = useNavigation<any>();

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await api.get('products');
        setCartItems(response.data.data);
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };

    fetchCartItems();
  }, []);

  const handleDeleteItem = async (itemId: null) => {
    try {
      const updatedCartItems = cartItems.filter(item => item.id !== itemId);
      await api.delete(`products/${itemId}`);
      setCartItems(updatedCartItems);
      setModalVisible(false);
    } catch (error) {
      console.error('Lỗi khi xóa sản phẩm:', error);
    }
  };

  const OnClickBack = () => {
    navigation.navigate('AddProduct');
  };

  const handleEditItem = (itemId: any) => {
    navigation.navigate('UpdateProduct', {itemId: itemId});
    console.log('first ID before send', itemId);
  };

  const renderItem = ({item}: any) => (
    <View key={item.id} style={styles.itemContainer}>
      <Image source={{uri: item.Files?.[0]?.src}} style={styles.itemImage} />
      <View style={styles.content}>
        <Text style={styles.itemText}>{item.name}</Text>
        <Text style={styles.itemPrice}>{item.price} đ</Text>
      </View>
      <View style={styles.status}>
        <Text
          style={styles.update}
          onPress={() => {
            handleEditItem(item.id);
          }}>
          Sửa
        </Text>
        <Pressable
          onPress={() => {
            setSelectedItemId(item.id);
            setModalVisible(true); // Mở modal
          }}>
          <Text style={styles.delete}>Xóa</Text>
        </Pressable>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Ionicons
          name="arrow-back-outline"
          style={styles.arrowLeft}
          onPress={() => OnClickBack()}
        />
        <Text style={styles.Subtitle}>Sản phẩm của tôi</Text>
      </View>
      <FlatList data={cartItems} renderItem={renderItem} />

      <View style={styles.btn}>
        <Text style={styles.BtnAdd} onPress={() => OnClickBack()}>
          Thêm
        </Text>
        <Text style={styles.BtnShow}>Xem Shop</Text>
      </View>

      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>
              Bạn có chắc chắn muốn xóa sản phẩm không
            </Text>

            <View style={styles.confirm}>
              <Pressable
                style={[styles.button, styles.buttonNo]}
                onPress={() => setModalVisible(false)}>
                <Text style={styles.textStyle}>Không</Text>
              </Pressable>

              <Pressable
                style={[styles.button, styles.buttonYes]}
                onPress={() => {
                  handleDeleteItem(selectedItemId);
                }}>
                <Text style={styles.textStyle}>Có</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonNo: {
    backgroundColor: '#2196F3',
  },
  buttonYes: {
    backgroundColor: 'red',
  },

  textStyle: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 15,
    textAlign: 'center',
  },

  confirm: {
    flexDirection: 'row',
    gap: 20,
  },

  container: {
    flex: 1,
    padding: 20,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    marginHorizontal: 5,
    marginTop: 20,
    padding: 10,
    borderColor: 'white',
    elevation: 10,
  },
  itemImage: {
    width: 100,
    height: 100,
    marginRight: 10,
    borderRadius: 10,
  },

  content: {
    alignSelf: 'center',
    gap: 10,
  },
  itemText: {
    maxWidth: 140,
    marginRight: 10,
    fontSize: 16,
    borderRadius: 10,
    color: '#FFA000',
  },
  itemPrice: {
    marginRight: 40,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
    fontSize: 14,
    borderRadius: 5,
    color: '#FFFFFF',
    backgroundColor: '#FFA000',
  },

  status: {
    flex: 2,
    position: 'absolute',
    right: 20,
    gap: 10,
  },
  update: {
    color: '#2E7D32',
    fontSize: 14,
  },
  delete: {
    fontSize: 14,
    color: 'red',
  },

  arrowLeft: {
    fontSize: 20,
  },

  title: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },

  Subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2E7D32',
  },

  btn: {
    paddingTop: 20,
    paddingRight: 24,
    paddingLeft: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  BtnAdd: {
    width: 110,
    textAlign: 'center',
    fontSize: 16,
    padding: 8,
    color: 'white',
    backgroundColor: '#2E7D32',
    borderRadius: 10,
  },

  BtnShow: {
    padding: 8,
    fontSize: 16,
    color: 'white',
    backgroundColor: '#2E7D32',
    borderRadius: 10,
  },
});

export default ProductScreen;
