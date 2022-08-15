import { v4 as uuid } from 'uuid';
import { DBField, writeDB } from '../dbController';
import { Products, Resolver } from './types';

const setJSON = (data: Products) => writeDB(DBField.PRODUCTS, data);

const productResolver: Resolver = {
  Query: {
    products: (parent, { cursor = '' }, { db }) => {
      const fromIndex =
        db.products.findIndex((product) => product.id === cursor) + 1;
      return db.products.slice(fromIndex, fromIndex + 15) || [];
    },
    product: (parent, { id }, { db }) => {
      const found = db.products.find((item) => item.id === id);
      if (found) return found;
      return null;
    },
  },
  Mutation: {
    addProduct: (parent, { imageUrl, price, title, description }, { db }) => {
      const newProduct = {
        id: uuid(),
        imageUrl,
        price,
        title,
        description,
        createdAt: Date.now(),
      };
      db.products.push(newProduct);
      setJSON(db.products);
      return newProduct;
    },
    updateProduct: (parent, { id, ...data }, { db }) => {
      const existProductIndex = db.products.findIndex((item) => item.id === id);
      if (existProductIndex < 0) {
        throw new Error('존재하지 않는 상품입니다');
      }
      const updatedItem = {
        ...db.products[existProductIndex],
        ...data,
      };
      db.products.splice(existProductIndex, 1, updatedItem);
      setJSON(db.products);
      return updatedItem;
    },
    deleteProduct: (parent, { id }, { db }) => {
      // 실제 db에서 삭제 대신, flag만 설정
      const existProductIndex = db.products.findIndex((item) => item.id === id);
      if (existProductIndex < 0) {
        throw new Error('존재하지 않는 상품입니다');
      }
      const updatedItem = {
        ...db.products[existProductIndex],
      };
      delete updatedItem.createdAt;
      db.products.splice(existProductIndex, 1, updatedItem);
      setJSON(db.products);
      return id;
    },
  },
};

export default productResolver;
