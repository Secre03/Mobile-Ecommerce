import { View, Text, Pressable, ScrollView } from 'react-native';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import ProductCard from '@/components/ProductCard';
import CartList from '@/components/CartList';

import { products } from '@/data/products';
import { Product, CartItem } from '@/types/products';

const storage = 'cart'

const Index = () => {
  const productList = products
  const [cart, setCart] = useState<CartItem[]>([])
  const [showCart, setShowCart] = useState(false)


  useEffect(() => {
    const loadCart = async () => {
      try {
        const data = await AsyncStorage.getItem(storage)
        if (data) setCart(JSON.parse(data))
      } catch (err) {
        console.log('Error loading cart:', err)
      }
    }
    loadCart()
  }, [])

  



  const addToCart = async (item: Product) => {
    let updatedCart = [...cart]
    let found = false

    for (let i = 0; i < updatedCart.length; i++) {
      if (updatedCart[i].id === item.id) {
        found = true
        updatedCart[i].cartQuantity = updatedCart[i].cartQuantity + 1
        break
      }
    }

    if (!found) {
      updatedCart.push({ ...item, cartQuantity: 1 })
    }

    setCart(updatedCart)
    await AsyncStorage.setItem(storage, JSON.stringify(updatedCart))
  }


  const decreaseQuantity = async (id: number) => {
  let updatedCart = [...cart]

  for (let i = 0; i < updatedCart.length; i++) {
    if (updatedCart[i].id === id) {
      updatedCart[i].cartQuantity = updatedCart[i].cartQuantity - 1  
      break
    }
  }

  
  let finalCart = []
  for (let i = 0; i < updatedCart.length; i++) {
    if (updatedCart[i].cartQuantity > 0) {
      finalCart.push(updatedCart[i])
    }
  }

  setCart(finalCart)
  await AsyncStorage.setItem(storage, JSON.stringify(finalCart))
}



   const removeFromCart = async (id: number) => {
    let updatedCart = []
    for (let i = 0; i < cart.length; i++) {
      if (cart[i].id !== id) {
        updatedCart.push({ ...cart[i] })
      }
    }

    setCart(updatedCart)
    await AsyncStorage.setItem(storage, JSON.stringify(updatedCart))
  }

  let total = 0
  let totalQuantity = 0;
  for (let i = 0; i < cart.length; i++) {
    total += cart[i].price * cart[i].cartQuantity
    totalQuantity += cart[i].cartQuantity
  }

  return (
      <ScrollView className='flex-1 bg-gray-100'>
      <View className='px-4 pt-14 pb-6'>

        {/* Header */}
        <View className='flex-row justify-between items-center mb-4'>
          <Text className='text-2xl font-bold text-gray-800'>
            {showCart ? 'My Cart' : 'Products'}
          </Text>

          <Pressable
            onPress={() => setShowCart(!showCart)}
            className='bg-black px-4 py-2 rounded-full'
          >
            <Text className='text-white font-semibold'>
              {showCart ? '← Back' : `Cart (${totalQuantity})`}
            </Text>
          </Pressable>
        </View>

        {/* Products */}
        {!showCart && (
          <View>
            {productList.length === 0 ? (
              <Text className='text-gray-500 text-center mt-10'>No products Available</Text>
            ) : (
              <View className='flex-row flex-wrap'>
                {productList.map((item: Product) => (
                  <ProductCard
                    key={item.id}
                    item={item}
                    onAddToCart={addToCart}
                  />
                ))}
              </View>
            )}
          </View>
        )}

        {/* Cart */}
        {showCart && (
          <View>
            {cart.length === 0 ? (
              <Text className='text-gray-500 text-center mt-10'>Your cart is empty</Text>
            ) : (
              <View>
                {cart.map((item: CartItem) => (
                  <CartList
                    key={item.id}
                    item={item}
                    onDecrease={decreaseQuantity}
                    onRemove={removeFromCart}
                  />
                ))}

                {/* Total */}
                <View className='mt-4 p-4 bg-white rounded-2xl shadow'>
                  <View className='flex-row justify-between items-center'>
                    <Text className='text-lg text-gray-600'>Total</Text>
                    <Text className='text-xl font-bold text-gray-800'>₱{total}</Text>
                  </View>
                  <Pressable className='bg-black mt-4 py-3 rounded-full items-center'>
                    <Text className='text-white font-bold text-base'>Checkout</Text>
                  </Pressable>
                </View>
              </View>
            )}
          </View>
        )}

      </View>
    </ScrollView>
  )
}

export default Index