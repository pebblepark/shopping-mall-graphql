import { gql } from 'graphql-tag';

export type Product = {
  id: string;
  imageUrl: string;
  price: number;
  title: string;
  description: string;
  createdAt: number;
};

export type MutableProduct = Omit<Product, 'id' | 'createdAt'>;

export type Products = {
  products: Product[];
};

const GET_PRODUCTS = gql`
  query GET_PRODUCTS($cursor: ID, $showDeleted: Boolean) {
    products(cursor: $cursor, showDeleted: $showDeleted) {
      id
      imageUrl
      price
      title
      description
      createdAt
    }
  }
`;

export const GET_PRODUCT = gql`
  query GET_PRODUCT($id: ID!) {
    product(id: $id) {
      id
      imageUrl
      price
      title
      description
      createdAt
    }
  }
`;

export const ADD_PROUDCT = gql`
  mutation ADD_PROUDCT(
    $imageUrl: String!
    $price: Int!
    $title: String!
    $description: String!
  ) {
    addProduct(
      imageUrl: $imageUrl
      price: $price
      title: $title
      description: $description
    ) {
      id
      imageUrl
      price
      title
      description
      createdAt
    }
  }
`;

export const UPDATE_PRODUCT = gql`
  mutation UPDATE_PRODUCT(
    $id: ID!
    $imageUrl: String
    $price: Int
    $title: String
    $description: String
  ) {
    updateProduct(
      id: $id
      imageUrl: $imageUrl
      price: $price
      title: $title
      description: $description
    ) {
      id
      imageUrl
      price
      title
      description
      createdAt
    }
  }
`;

export const DELETE_PRODUCT = gql`
  mutation DELETE_PRODUCT($id: ID!) {
    deleteProduct(id: $id) {
      id
      imageUrl
      price
      title
      description
      createdAt
    }
  }
`;

export default GET_PRODUCTS;
