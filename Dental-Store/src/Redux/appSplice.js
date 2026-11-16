import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  products: [],
  favorites: [],
  search: ""
}

export const appSlice = createSlice({
  name: 'app',
  initialState,

  reducers: {

    
    addToCart: (state, action) => {
      const product = action.payload

      const existing = state.products.find(
        item => item.id === product.id
      )

      if (existing) {
        existing.quantity += 1
      } else {
        state.products.push({
          id: product.id,
          title: product.title,
          price: Number(product.price),
          image: product.image,
          quantity: 1
        })
      }
    },

    increaseQty: (state, action) => {
      const item = state.products.find(p => p.id === action.payload)
      if (item) item.quantity += 1
    },

    decreaseQty: (state, action) => {
      const item = state.products.find(p => p.id === action.payload)
      if (item && item.quantity > 1) item.quantity -= 1
    },

    removeFromCart: (state, action) => {
      state.products = state.products.filter(
        item => item.id !== action.payload
      )
    },

    
    addToFavorites: (state, action) => {
      const exists = state.favorites.find(p => p.id === action.payload.id)
      if (!exists) state.favorites.push(action.payload)
    },

    removeFromFavorites: (state, action) => {
      state.favorites = state.favorites.filter(p => p.id !== action.payload)
    },

    setSearch: (state, action) => {
      state.search = action.payload
    }
  }
})

export const {
  addToCart,
  increaseQty,
  decreaseQty,
  removeFromCart,
  addToFavorites,
  removeFromFavorites,
  setSearch
} = appSlice.actions

export default appSlice.reducer