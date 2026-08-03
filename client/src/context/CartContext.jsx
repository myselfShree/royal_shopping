import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const CartContext = createContext(null)

function readCartFromStorage() {
  if (typeof window === 'undefined') return []

  try {
    const savedCart = window.localStorage.getItem('royal_cart')
    return savedCart ? JSON.parse(savedCart) : []
  } catch {
    return []
  }
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(readCartFromStorage)
  const [wishlistItems, setWishlistItems] = useState([])

  useEffect(() => {
    window.localStorage.setItem('royal_cart', JSON.stringify(items))
  }, [items])

  const addToCart = (product, quantity = 1) => {
    setItems((prev) => {
      const existingItem = prev.find((item) => item.id === product.id)

      if (existingItem) {
        return prev.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item)
      }

      return [...prev, { ...product, quantity, selectedColor: product.selectedColor, selectedSize: product.selectedSize }]
    })
  }

  const updateQuantity = (id, quantity) => {
    setItems((prev) => {
      if (quantity <= 0) {
        return prev.filter((item) => item.id !== id)
      }

      return prev.map((item) => item.id === id ? { ...item, quantity } : item)
    })
  }

  const removeFromCart = (id) => {
    setItems((prev) => prev.filter((item) => item.id !== id))
  }

  const clearCart = () => {
    setItems([])
  }

  const addToWishlist = (product) => {
    setWishlistItems((prev) => prev.find((item) => item.id === product.id) ? prev : [...prev, product])
  }

  const removeFromWishlist = (id) => {
    setWishlistItems((prev) => prev.filter((item) => item.id !== id))
  }

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)
  const subtotal = items.reduce((sum, item) => sum + (item.discountPrice || item.price) * item.quantity, 0)

  const value = useMemo(() => ({
    items,
    wishlistItems,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    addToWishlist,
    removeFromWishlist,
    totalItems,
    subtotal,
  }), [items, wishlistItems, subtotal, totalItems])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  return useContext(CartContext)
}
