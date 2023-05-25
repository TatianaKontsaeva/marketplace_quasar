import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

export const getClientOptions =()=>{
return new ApolloClient({
link: new HttpLink({
uri: 'https://fancy-hagfish-48.hasura.app/v1/graphql',
headers: {
"x-hasura-admin-secret": 'oiZ3wnvjX6MMshbwQInJoBxcHZl0KyVFdh9F9HjkkX5aUIJomTvPPb8iPUl437sw'
}
}),
cache: new InMemoryCache()
})
}
