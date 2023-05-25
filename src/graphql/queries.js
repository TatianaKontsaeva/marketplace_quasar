import gql from "graphql-tag";

export const queries = {
  getAll: gql`
    query {
      product {
        name
        id
        img
        price
        type
        description
      }
    }
  `,
  sort: gql`
  query ($type: [String!], $sort: [product_order_by!]) {
    product(where: { type: { _in: $type } }, order_by: $sort) {
      id
      img
      price
      type
      name
      description
    }
  }
`,
  filter: gql`
    query ($type: [String!]) {
      product(where: { type: { _in: $type } }) {
        id
        img
        price
        type
        name
        description
      }
    }
  `,
  sortByType: gql`
    query {
      product(order_by: { type: asc }) {
        name
        id
        img
        price
        type
        description
      }
    }
  `,
  sortByPrice: gql`
    query {
      product(order_by: { price: asc }) {
        name
        id
        img
        price
        type
        description
      }
    }
  `,
  searchData: gql`
    query ($like: String!) {
      product(where: { name: { _ilike: $like } }) {
        id
        img
        price
        type
        name
        description
      }
    }
  `,
};
