import { gql } from 'graphql-request';

export type PRODUCT = {
  id: number;
  imageUrl: string;
  price: number;
  title: string;
  description: string;
  createAt: string;
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
