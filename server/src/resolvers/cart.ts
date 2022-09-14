import { DBField, writeDB } from '../dbController';
import { Cart, Resolver } from './types';

const setJSON = (data: Cart) => writeDB(DBField.CART, data);

const cartResolver: Resolver = {
  Query: {
    cart: (parent, args, { db }) => {
      return db.cart;
    },
  },
  Mutation: {
    addCart: (parent, { id }, { db }) => {
      if (!id) throw new Error('상품 id가 존재하지 않습니다.');
      const targetProduct = db.products.find((item) => item.id === id);

      if (!targetProduct) {
        throw new Error('상품이 없습니다');
      }
      const existCartItemIndex = db.cart.findIndex((item) => item.id === id);
      if (existCartItemIndex > -1) {
        const newCartItem = {
          id,
          amount: db.cart[existCartItemIndex].amount + 1,
        };
        db.cart.splice(existCartItemIndex, 1, newCartItem);
        setJSON(db.cart);
        return newCartItem;
      }
      const newItem = {
        id,
        amount: 1,
      };
      db.cart.push(newItem);
      setJSON(db.cart);
      return newItem;
    },
    updateCart: (parent, { id, amount }, { db }) => {
      const existCartIndex = db.cart.findIndex((item) => item.id === id);
      if (existCartIndex < 0) {
        throw new Error('없는 데이터입니다');
      }
      const newCartItem = {
        id,
        amount,
      };
      db.cart.splice(existCartIndex, 1, newCartItem);
      setJSON(db.cart);
      return newCartItem;
    },
    deleteCart: (parent, { id }, { db }) => {
      const existCartIndex = db.cart.findIndex((item) => item.id === id);
      if (existCartIndex < 0) {
        throw new Error('없는 데이터입니다');
      }

      db.cart.splice(existCartIndex, 1);
      setJSON(db.cart);
      return id;
    },
    executePay: (parent, { ids }, { db }) => {
      const selectedCartData = db.cart.filter((cartItem) =>
        ids.includes(cartItem.id)
      );
      const deletedProducts = selectedCartData.filter((item) => {
        const product = db.products.find((products) => products.id === item.id);
        return !product?.createdAt;
      });

      if (deletedProducts.length > 0) {
        deletedProducts.forEach((product) => {
          const existCartIndex = db.cart.findIndex(
            (item) => item.id === product.id
          );
          db.cart.splice(existCartIndex, 1);
          setJSON(db.cart);
        });
        throw new Error('삭제된 상품이 포함되어 결제를 진행할 수 없습니다.');
      }
      const newCartData = db.cart.filter(
        (cartItem) => !ids.includes(cartItem.id)
      );

      db.cart = newCartData;
      setJSON(db.cart);
      return ids;
    },
  },
  CartItem: {
    product: (cartItem, args, { db }) =>
      db.products.find((product: any) => product.id === cartItem.id),
  },
};

export default cartResolver;
