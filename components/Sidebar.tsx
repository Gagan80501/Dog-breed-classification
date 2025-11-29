'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  Home, 
  LayoutDashboard, 
  Dog, 
  ShoppingCart, 
  Utensils, 
  Users, 
  Mail,
  Menu,
  X
} from 'lucide-react'
import { useState } from 'react'

export default function Sidebar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  
  const links = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/breeds', label: 'Breeds', icon: Dog },
    { href: '/marketplace', label: 'Marketplace', icon: ShoppingCart },
    { href: '/food', label: 'Dog Food', icon: Utensils },
    { href: '/community', label: 'Community', icon: Users },
    { href: '/contact', label: 'Contact', icon: Mail },
  ]
  
  const isActive = (href: string) => pathname === href
  
  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 bg-white p-2 rounded-lg shadow-lg"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
      
      {/* Overlay */}
      {isOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setIsOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 h-full w-64 bg-white border-r border-gray-200 z-40 transition-transform duration-300
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="p-6">
          <h1 className="text-2xl font-bold text-blue-600">DogBreed AI</h1>
          <p className="text-sm text-gray-600 mt-1">AI-Powered Breed Classification</p>
        </div>
        
        <nav className="px-3">
          {links.map((link) => {
            const Icon = link.icon
            const active = isActive(link.href)
            
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`
                  flex items-center gap-3 px-4 py-3 mb-1 rounded-lg transition-colors
                  ${active 
                    ? 'bg-blue-50 text-blue-600 font-medium' 
                    : 'text-gray-700 hover:bg-gray-50'
                  }
                `}
              >
                <Icon size={20} />
                <span>{link.label}</span>
              </Link>
            )
          })}
        </nav>
      </aside>
    </>
  )
}