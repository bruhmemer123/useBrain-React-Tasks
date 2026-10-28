import { useState } from 'react'
import { useReducer } from 'react'
const TOPPING_PRICE = 30

const reducer = (state: string[], action: { type: 'add' | 'remove'; topping: string }) => {
  switch (action.type) {
    case 'add':
      return [...state, action.topping]
    case 'remove':
      return state.filter(t => t !== action.topping)
    default:
      return state
  }
}

export default function PizzaBuilder() {
  const [toppings, dispatch] = useReducer(reducer, [])

  const total = 100 + toppings.length * TOPPING_PRICE

  return (
    <div>
      <p data-testid="total">Total: {total}</p>
      <button onClick={() => dispatch({type:'add',topping:'cheese'})}>Add cheese</button>
      <button onClick={() => dispatch({type:'add',topping:'mushroom'})}>Add mushroom</button>
      <button onClick={() => dispatch({type:'remove',topping:'cheese'})}>Remove cheese</button>
      <ul data-testid="toppings">
        {toppings.map((t, i) => (
          <li key={`${t}-${i}`}>{t}</li>
        ))}
      </ul>
    </div>
  )
}
