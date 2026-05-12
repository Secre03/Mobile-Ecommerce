import { View, Text, Image, Pressable, Alert } from 'react-native';
import { CartItem } from '@/types/products';

type CartListProps = {
  item: CartItem
  onDecrease: (id: number) => void;
  onRemove: (id: number) => void;
}



const CartList = ({item, onDecrease, onRemove}: CartListProps) => {

  const confirmRemove = () => {
    Alert.alert(
      'Remove Item',                          
      `Remove ${item.name} from cart?`,     
      [
        {
          text: 'Cancel',                     
          style: 'cancel'
        },
        {
          text: 'Remove',                   
          style: 'destructive',
          onPress: () => onRemove(item.id)    
        }
      ]
    )
  }

  return (
    <View className='bg-white rounded-2xl p-4 mb-3 shadow flex-row'>
      <Image
        source={item.image}
        className='w-20 h-20 rounded-xl'
        resizeMode="cover"
      />

      <View>
        <Text>{item.name}</Text>
        <Text>₱{item.price}</Text>
        <Text>Subtotal: ₱{item.price * item.cartQuantity}</Text>

        <View className='flex-row items-center mt-2'>
           <Text>{item.cartQuantity}</Text>
           
          <Pressable
            onPress={() => onDecrease(item.id)}
          >
            <Text>-</Text>
          </Pressable>

          
        </View>

        <Pressable onPress={confirmRemove} className='mt-2'>
          <Text>Remove</Text>
        </Pressable>

      </View>
    </View>
  )
}

export default CartList