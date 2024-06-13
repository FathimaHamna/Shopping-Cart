import {ReactNode, createContext, useContext, useState} from 'react';

type ShoppingCartProviderProps = {
    children: ReactNode
}

type CartItem = {
    id: number
    quantity: number
}

type ShoppingCartContext = {
    openCart: () => void
    closeCart: () => void
    getItemQuantity: (id: number) => number
    increaseCartQuantity: (id: number) => void
    decreaseCartQuantity: (id: number) => void
    removeFromCart: (id: number) => void
    cartQuantity: number
    cartItems: CartItem[]
}



const ShoppingCartContext = createContext({} as ShoppingCartContext)


export function useshoppingCart(){
    return useContext(ShoppingCartContext)
}

export function ShoppingCartProvider({children}:

ShoppingCartProviderProps){

    const [isOpen, setisOpen] = useState(false)
    const [cartItems, setCartItems] = useState<CartItem[]>([])

    const cartQuantity = cartItems.reduce(
        (quantity, item) => item.quantity + quantity, 
    0
)

const openCart = () => setisOpen(true)
const closeCart = () => setisOpen(false)

function getItemQuantity(id: number){
    return cartItems.find(Item => Item.id === id)?.quantity || 0
}

function increaseCartQuantity(id: number) {
    setCartItems(currItems => {
      if (currItems.find(item => item.id === id) == null) {
        return [...currItems, { id, quantity: 1 }]
      } else {
        return currItems.map(item => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity + 1 }
          } else {
            return item
          }
        })
      }
    })
  }

  function decreaseCartQuantity(id: number) {
    setCartItems(currItems => {
      if (currItems.find(item => item.id === id)?.quantity === 1) {
        return currItems.filter(item => item.id !== id)
      } else {
        return currItems.map(item => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity - 1 }
          } else {
            return item
          }
        })
      }
    })
  }

  function removeFromCart(id: number) {
    setCartItems(currItems => {
        return currItems.filter(item => item.id !== id)
      })
    }


    return <ShoppingCartContext.Provider value={{ 
        getItemQuantity, 
        increaseCartQuantity, 
        decreaseCartQuantity, 
        removeFromCart,
        openCart,
        closeCart,
        cartItems,
        cartQuantity,
        }}>
        {children}
    </ShoppingCartContext.Provider>
}