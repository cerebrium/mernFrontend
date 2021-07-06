export interface ApolloListing {
  _id: string,
  name: string,
  email: string,
  location: string,
  image: string,
  description: string,
  amenities: Array<string>
}

export interface Listings {
  listings: Array<ApolloListing>
}
