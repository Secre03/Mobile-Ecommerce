import { View, Text, Image, Pressable } from 'react-native'
import { Product } from '@/types/products'

type ProductProps = {
  item: Product
  onAddToCart: (item: Product) => void
}

const ProductCard = ({ item, onAddToCart }: ProductProps) => {
  return (
    <View className='w-1/2 p-2'>
      <View className='bg-white rounded-2xl overflow-hidden shadow'>
        <Image
          source={item.image}
          className='w-full h-40'
          resizeMode="cover"
        />

        <View className='p-3'>
          <Text>{item.name}</Text>
          <Text>₱{item.price}</Text>

          
          <Pressable
            onPress={() => onAddToCart(item)}
          >
            <Text>Add to Cart</Text>
          </Pressable>


        </View>
      </View>
    </View>
  )
}

export default ProductCard