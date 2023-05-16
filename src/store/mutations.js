export const setBooks = (state, { books, booksFilter, loading }) => {
	state.books = books
	state.booksFilter = booksFilter
	state.loadingCatalog = loading
}

export const setCartBooks = (state, { CartBooks, loading, refetch }) => {
	state.cart = CartBooks
	state.loadingCart = loading
	state.refetchCart = refetch
}

export const setQuantityBooksCart = (state, count) => {
	state.quantityBooksCart = state.quantityBooksCart + count
}