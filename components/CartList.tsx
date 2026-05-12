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

      <View className='ml-3 flex-1'>
        <Text className='text-base font-semibold text-gray-800'>{item.name}</Text>
        <Text className='text-sm text-gray-500'>₱{item.price}</Text>
        <Text className='text-sm text-gray-500'>Subtotal: ₱{item.price * item.cartQuantity}</Text>

        <View className='flex-row items-center mt-2'>
           <Text className='mx-3 text-base font-semibold'>{item.cartQuantity}</Text>
           
          <Pressable
            onPress={() => onDecrease(item.id)}
            className='bg-gray-200 w-7 h-7 rounded-full items-center justify-center'
          >
            <Text className='text-base font-bold'>-</Text>
          </Pressable>

         

          
        </View>

        <Pressable onPress={confirmRemove} className='mt-2'>
          <Text className='text-red-500 text-sm'>Remove</Text>
        </Pressable>
      </View>
    </View>
  )
}

export default CartList