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
        console.log('error loading cart:', err)
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

        <View>
          <Text>
            {showCart ? 'My Cart' : 'Products'}
          </Text>

          <Pressable
            onPress={() => setShowCart(!showCart)}
          >
            <Text>
              {showCart ? '← Back' : `Cart (${totalQuantity})`}
            </Text>
            
          </Pressable>
        </View>

        {!showCart && (
          <View>
            {productList.length === 0 ? (
              <Text>No products Available</Text>
            ) : (
              <View>
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

        {showCart && (
          <View>
            {cart.length === 0 ? (
              <Text>Your cart is empty</Text>
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

                <View>
                  <View>
                    <Text>Total</Text>
                    <Text>₱{total}</Text>
                  </View>
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