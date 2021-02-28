export const reducer = (state, action) => {
  const { payload } = action;
  const { cart } = state;
  switch (action.type) {
    case 'CLEAR_CART':
      return { ...state, cart: [] };
    case 'REMOVE_ITEM':
      return {
        ...state,
        cart: cart.filter((item) => item.id !== payload),
      };
    case 'TOGGLE_AMOUNT':
      let tempCart = cart
        .map((item) => {
          if (item.id === payload.id) {
            if (payload.type === 'inc') {
              return { ...item, amount: item.amount + 1 };
            }
            if (payload.type === 'dec') {
              return { ...item, amount: item.amount - 1 };
            }
          }
          return item;
        })
        .filter((item) => item.amount > 0);
      return { ...state, cart: tempCart };
    case 'GET_TOTAL':
      let { total, amount } = cart.reduce(
        (cartTotal, { price, amount }) => {
          cartTotal.amount += amount;
          const itemTotal = price * amount;
          cartTotal.total += itemTotal;
          return cartTotal;
        },
        {
          total: 0,
          amount: 0,
        }
      );
      total = parseFloat(total.toFixed(2));
      return { ...state, total, amount };
    case 'LOADING_ITEMS':
      return { ...state, loading: true };
    case 'DISPLAY_ITEMS':
      return { ...state, loading: false, cart: payload };
    default:
      throw new Error('No matching action type');
  }
};
