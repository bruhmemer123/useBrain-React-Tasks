export type Item = { id: string; name: string; price: number; qty: number }
export type CartState = { items: Item[] }
export type CartAction = { type: 'increment'; id: string } | { type: 'decrement'; id: string } | { type: 'clear' }

export const initialCart: CartState = {
  items: [
    { id: 'samosa', name: 'Samosa', price: 20, qty: 0 },
    { id: 'chai', name: 'Chai', price: 15, qty: 0 },
    { id: 'vadapav', name: 'Vada pav', price: 25, qty: 0 },
  ],
}

// Fix this function. Cart.tsx is fine.
export function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'increment': {
      return { ...state, items: state.items.map(i => (i.id === action.id ? { ...i, qty: i.qty + 1 } : i)) }
    }
    case 'decrement': {
      return { ...state, items: state.items.map(i => (i.id === action.id ? { ...i, qty: Math.max(0, i.qty - 1) } : i)) }
    }
    case 'clear':
      return { items: state.items.map(i => ({ ...i, qty: 0 })) }
    default:
      return state
  }
}
