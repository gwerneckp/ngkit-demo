import neo4j from 'neo4j-driver';
import { Neo4jGraphQL } from '@neo4j/graphql';
import { ApolloServer, gql } from 'apollo-server-svelte-kit';
import { OGM } from '@neo4j/graphql-ogm';
import { hash, compare } from 'bcrypt';
import JWT from 'jsonwebtoken';
import { Neo4jGraphQLAuthJWTPlugin } from '@neo4j/graphql-plugin-auth';

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

  type Mutation {
    signIn(username: String!, password: String!): User
    signUp(username: String!, password: String!): User
  }
`;

const ogm = new OGM({ typeDefs, driver });
ogm.init();

const User = ogm.model('User');

const resolvers = {
	Mutation: {
		signUp: async (
			_root: any,
			{ username, password }: { username: string; password: string },
			{ req }: { req: any }
		) => {
			const [existing] = await User.find({
				where: {
					username
				}
			});

			if (existing) {
				throw new Error(`User with username ${username} already exists!`);
			}

			const hashedPassword = await hash(password, 10);

			const user = await User.create({
				input: { username, password: hashedPassword }
			});

			return user.users[0];
		},

		signIn: async (
			_root: any,
			{ username, password }: { username: string; password: string },
			{ req }: { req: any }
		) => {
			const [user] = await User.find({ where: { username } });

			if (!user) {
				throw new Error('Invalid Credentials');
			}

			const valid = await compare(password, user.password);

			if (!valid) {
				throw new Error('Invalid Credentials');
			}

			const token = JWT.sign({ id: user.id, username: user.username }, 'secret-change');

			req.cookies.set('jwt', token, {
				httpOnly: true
			});

			return user;
		}
	}
};

const neoSchema = new Neo4jGraphQL({
	typeDefs: typeDefs,
	driver: driver,
	resolvers: resolvers
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
