import { atom, selector, useRecoilState } from 'recoil';

// Helper function to load persisted cart data from localStorage
const getPersistedCart = () => {
  const savedCart = localStorage.getItem('cartState');
  return savedCart ? JSON.parse(savedCart) : [];
};

// Cart state atom with localStorage persistence
export const cartState = atom({
  key: 'cartState',
  default: getPersistedCart(),
  effects: [
    ({ onSet }) => {
      onSet((newCart) => {
        localStorage.setItem('cartState', JSON.stringify(newCart));
      });
    },
  ],
});

// Selector to calculate the total price of items in the cart
export const cartTotalSelector = selector({
  key: 'cartTotalSelector',
  get: ({ get }) => {
    const cartItems = get(cartState);
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  },
});

// Custom hook to manage cart actions, including addToCart
export const useCartActions = () => {
  const [cart, setCart] = useRecoilState(cartState);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    setCart((prevCart) =>
      prevCart.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  return { addToCart, removeFromCart, updateQuantity };
};
