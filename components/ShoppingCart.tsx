'use client'

import { useState, useEffect } from 'react'
import { ShoppingCart as ShoppingCartIcon, X, Plus, Minus, Trash2, CheckCircle } from 'lucide-react'
import { CartItem } from '@/types'

export default function ShoppingCart() {
  const [isOpen, setIsOpen] = useState(false)
  const [cart, setCart] = useState<CartItem[]>([])
  const [showSuccess, setShowSuccess] = useState(false)
  
  useEffect(() => {
    // Load cart from localStorage
    const savedCart = localStorage.getItem('cart')
    if (savedCart) {
      setCart(JSON.parse(savedCart))
    }
    
    // Listen for cart updates
    const handleCartUpdate = () => {
      const updatedCart = localStorage.getItem('cart')
      if (updatedCart) {
        setCart(JSON.parse(updatedCart))
      }
    }
    
    window.addEventListener('cartUpdated', handleCartUpdate)
    return () => window.removeEventListener('cartUpdated', handleCartUpdate)
  }, [])
  
  const updateQuantity = (id: string, change: number) => {
    const updatedCart = cart.map(item => {
      if (item.id === id) {
        const newQuantity = Math.max(0, item.quantity + change)
        return { ...item, quantity: newQuantity }
      }
      return item
    }).filter(item => item.quantity > 0)
    
    setCart(updatedCart)
    localStorage.setItem('cart', JSON.stringify(updatedCart))
    window.dispatchEvent(new Event('cartUpdated'))
  }
  
  const removeItem = (id: string) => {
    const updatedCart = cart.filter(item => item.id !== id)
    setCart(updatedCart)
    localStorage.setItem('cart', JSON.stringify(updatedCart))
    window.dispatchEvent(new Event('cartUpdated'))
  }
  
  const clearCart = () => {
    setCart([])
    localStorage.removeItem('cart')
    window.dispatchEvent(new Event('cartUpdated'))
  }
  
  const handleCheckout = () => {
    // Show success message
    setShowSuccess(true)
    
    // Clear cart after 2 seconds
    setTimeout(() => {
      clearCart()
      setShowSuccess(false)
      setIsOpen(false)
    }, 2000)
  }
  
  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0)
  
  return (
    <>
      {/* Cart Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed top-4 right-4 z-40 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
      >
        <ShoppingCartIcon className="w-6 h-6" />
        {itemCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
            {itemCount}
          </span>
        )}
      </button>
      
      {/* Cart Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50" onClick={() => setIsOpen(false)} />
      )}
      
      {/* Cart Sidebar */}
      <div className={`fixed top-0 right-0 h-full w-full sm:w-96 bg-white z-50 shadow-2xl transform transition-transform duration-300 ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-xl font-bold">Shopping Cart</h2>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          
          {/* Success Message */}
          {showSuccess && (
            <div className="absolute inset-0 bg-white z-10 flex items-center justify-center">
              <div className="text-center p-8">
                <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Order Successful!</h3>
                <p className="text-gray-600">Thank you for your purchase</p>
              </div>
            </div>
          )}
          
          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-4">
            {cart.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <ShoppingCartIcon className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Your cart is empty</p>
              </div>
            ) : (
              <div className="space-y-4">
                {cart.map(item => (
                  <div key={item.id} className="flex gap-4 bg-gray-50 rounded-lg p-4">
                    {item.image && (
                      <img 
                        src={`${item.image}?w=200&h=200&fit=crop&auto=format,compress`}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded"
                      />
                    )}
                    <div className="flex-1">
                      <h3 className="font-semibold text-sm mb-1">{item.name}</h3>
                      <p className="text-blue-600 font-bold mb-2">${item.price.toFixed(2)}</p>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="p-1 bg-white border rounded hover:bg-gray-100"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-3 py-1 bg-white border rounded">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="p-1 bg-white border rounded hover:bg-gray-100"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="ml-auto p-1 text-red-600 hover:bg-red-50 rounded"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {/* Footer */}
          {cart.length > 0 && (
            <div className="border-t p-4 space-y-4">
              <div className="flex justify-between text-lg font-bold">
                <span>Total:</span>
                <span className="text-blue-600">${total.toFixed(2)}</span>
              </div>
              <button 
                onClick={handleCheckout}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Proceed to Checkout
              </button>
              <button 
                onClick={clearCart}
                className="w-full border border-gray-300 text-gray-700 py-2 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
              >
                Clear Cart
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  )
}