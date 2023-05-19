import { createHttpLink, InMemoryCache } from '@apollo/client/core'
import { setContext } from "@apollo/client/link/context";

export function getClientOptions(options) {
  const httpLink = createHttpLink({
    uri: "https://master-fox-84.hasura.app/v1/graphql",
  })

  const authLink = setContext((_, { headers }) => {
    const token = sessionStorage.getItem("token");
    return {
      headers: {
        ...headers,
        Authorization: token ? `Bearer ${token}` : "",
      }
    }
  })

  return Object.assign(
    {
      link: authLink.concat(httpLink),
      cache: new InMemoryCache(),
    })
  }