import gql from "graphql-tag";

export const queries = {
  getAll: gql`
    query {
      store {
        description
        id
        img
        price
        type
      }
    }
  `,
  filter: gql`
    query ($type: [String!]) {
     store(where: { type: { _in: $type } }) {
        id
        img
        price
        type
        description
      }
    }
  `,
  sortByType: gql`
    query {
        store(order_by: { type: asc }) {
        description
        id
        img
        price
        type
      }
    }
  `,
  sortByPrice: gql`
    query {
        store(order_by: { price: asc }) {
        description
        id
        img
        price
        type
      }
    }
  `,
  sort: gql`
    query ($type: [String!], $sort: [store_order_by!]) {
      store(where: { type: { _in: $type } }, order_by: $sort) {
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
        store(where: { description: { _ilike: $like } }) {
        id
        img
        price
        type
        description
      }
    }
  `,
};