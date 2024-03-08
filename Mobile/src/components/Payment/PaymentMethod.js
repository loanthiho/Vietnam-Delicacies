import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'; 

const PaymentMethods = () => {
  const [selectedMethod, setSelectedMethod] = useState('ZaloPay'); 

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.paymentMethodButton, selectedMethod === 'CashOnDelivery' && styles.selectedPaymentMethod]}
        onPress={() => setSelectedMethod('CashOnDelivery')}>
        <View style={styles.paymentMethodContent}>
          <FontAwesome5 name="money-bill" size={24} color="#2E7D32" />
          <Text style={[styles.paymentMethodText, selectedMethod === 'CashOnDelivery' && styles.selectedPaymentText]}>Thanh toán khi nhận hàng</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.paymentMethodButton, selectedMethod === 'ZaloPay' && styles.selectedPaymentMethod]}
        onPress={() => setSelectedMethod('ZaloPay')}>
        <View style={styles.paymentMethodContent}>
          <Image
            source={require('../../assets/Logo_ZaloPay.png')}
            style={styles.zalopay}
          />
          <Text style={[styles.paymentMethodText, selectedMethod === 'ZaloPay' && styles.selectedPaymentText]}>ZaloPay</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  
  },
  paymentMethodButton: {
    flex: 1,
    padding: 15,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 10,
    marginBottom: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 5,

  },
  selectedPaymentMethod: {
    backgroundColor: '#FFA000',
  },
  selectedPaymentText: {
    color: 'white', 
  },
  paymentMethodContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  paymentMethodText: {
    fontWeight: 'bold',
    color: '#333333',
    fontSize: 17,
    marginLeft: 10, 
  },
  zalopay: {
    width: 27,
    height: 27,
  },
});

export default PaymentMethods;