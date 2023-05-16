import { useQuery } from "@vue/apollo-composable";
import gql from "graphql-tag";
import { state } from "./index.js"

export const GET_BOOKS = ({ commit }) => {
	const fetching = async () => {
		try {
			const { onResult } = useQuery(
				gql`
	         query MyQuery {
	           books {
				category
                name
                author
                genre
                price
                url
	           }
	         }
	       `
			);
			onResult(queryResult => {
				commit("setBooks", { books: queryResult?.data?.books, booksFilter: queryResult?.data?.books, loading: queryResult.loading })
			})
		} catch (e) {
			console.log("Error:", e);
		}
	};
	fetching();
}

export const GET_CART_BOOKS = ({ commit }) => {
	const fetching = async () => {
		try {
			const { onResult, refetch } = useQuery(gql`
			query MyQuery {
			  cartItems {
                category
                name
                author
                genre
                price
                url
			  }
			}
		 `, null, {
				pollInterval: 1000,
			}
			);
			onResult(queryResult => {
				commit("setCartBooks", { CartBooks: queryResult?.data?.cartItems, loading: queryResult.loading, refetch: refetch })
				if (state.quantityBooksCart <= 0) {
					commit("setQuantityBooksCart", queryResult?.data?.cartItems.length)
				}
			})
		} catch (e) {
			console.log("Error:", e);
		}
	};
	fetching();
} 