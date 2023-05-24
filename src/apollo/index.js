// import { createHttpLink, InMemoryCache } from '@apollo/client/core'
// import { setContext } from "@apollo/client/link/context";

// export function getClientOptions(options) {
//   const httpLink = createHttpLink({
//     uri: "https://fancy-hagfish-48.hasura.app/v1/graphql",
//   })

//   const authLink = setContext((_, { headers }) => {
//     const token = sessionStorage.getItem("token");
//     return {
//       headers: {
//         ...headers,
//         Authorization: token ? `Bearer ${token}` : "",
//       }
//     }
//   })

//   return Object.assign(
//     {
//       link: authLink.concat(httpLink),
//       cache: new InMemoryCache(),
//     })
//   }

// import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

// export const getClientOptions =()=>{
// return new ApolloClient({
// link: new HttpLink({
// uri: 'https://fancy-hagfish-48.hasura.app/v1/graphql',
// headers: {
// "x-hasura-admin-secret": 'oiZ3wnvjX6MMshbwQInJoBxcHZl0KyVFdh9F9HjkkX5aUIJomTvPPb8iPUl437sw'
// }
// }),
// cache: new InMemoryCache()
// })
// }
import { createHttpLink, InMemoryCache } from '@apollo/client/core'


export const getClientOptions =()=> {
  return Object.assign(
    // General options.
    {
      link: createHttpLink({
        uri:
          process.env.GRAPHQL_URI ||
          // Change to your graphql endpoint.
          'https://fancy-hagfish-48.hasura.app/v1/graphql',
        //   headers: {
        //     'x-hasura-admin-secret': 'oiZ3wnvjX6MMshbwQInJoBxcHZl0KyVFdh9F9HjkkX5aUIJomTvPPb8iPUl437sw'
        //   }
      }),
      cache: new InMemoryCache(),
    },
    // Specific Quasar mode options.
    process.env.MODE === 'spa'
      ? {
          //
        }
      : {},
    process.env.MODE === 'ssr'
      ? {
          //
        }
      : {},
    process.env.MODE === 'pwa'
      ? {
          //
        }
      : {},
    process.env.MODE === 'bex'
      ? {
          //
        }
      : {},
    process.env.MODE === 'cordova'
      ? {
          //
        }
      : {},
    process.env.MODE === 'capacitor'
      ? {
          //
        }
      : {},
    process.env.MODE === 'electron'
      ? {
          //
        }
      : {},
    // dev/prod options.
    process.env.DEV
      ? {
          //
        }
      : {},
    process.env.PROD
      ? {
          //
        }
      : {},
    // For ssr mode, when on server.
    process.env.MODE === 'ssr' && process.env.SERVER
      ? {
          ssrMode: true,
        }
      : {},
    // For ssr mode, when on client.
    process.env.MODE === 'ssr' && process.env.CLIENT
      ? {
          ssrForceFetchDelay: 100,
        }
      : {}
  )
}