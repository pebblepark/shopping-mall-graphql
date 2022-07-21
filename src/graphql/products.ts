import { gql } from 'graphql-tag';

export type Product = {
  id: number;
  imageUrl: string;
  price: number;
  title: string;
  description: string;
  createAt: string;
};

export type Products = {
  products: Product[];
};

const GET_PRODUCTS = gql`
  query GET_PRODUCTS {
    id
    imageUrl
    price
    title
    description
    createAt
  }
`;

export default GET_PRODUCTS;
