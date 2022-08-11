import { Resolver } from './types';

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
};

export default productResolver;
