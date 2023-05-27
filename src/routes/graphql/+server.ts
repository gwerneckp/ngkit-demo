import neo4j from 'neo4j-driver';
import { Neo4jGraphQL } from '@neo4j/graphql';
import { ApolloServer, gql } from 'apollo-server-svelte-kit';

const driver = neo4j.driver('bolt://localhost:7687', neo4j.auth.basic('neo4j', 'password'));

const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    password: String! @private
    posts: [Post!]! @relationship(type: "POSTED_BY", direction: OUT)
  }
  
  type Post {
    id: ID!
    title: String!
    content: String!TG
    author: User @relationship(type: "POSTED_BY", direction: IN)
  }
  
  type Query {
    users: [User]
    posts: [Post]
  }
`;

const neoSchema = new Neo4jGraphQL({
	typeDefs: typeDefs,
	driver: driver
});

const server = new ApolloServer({
	schema: await neoSchema.getSchema(),
	context: ({ req }) => {
		return {
			driver: driver,
			req: req
		};
	}
});

await server.start();

export const POST = server.handleRequest;
