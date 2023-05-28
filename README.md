# NGKIT Stack - Using Neo4j GraphQL Library with Svelte Kit (+ Authentication with JWT)

This repository provides an example project showcasing the integration of Neo4j GraphQL library with Svelte Kit, along with authentication using JSON Web Tokens (JWT). The stack is named NGKIT, inspired by other popular tech stack acronyms.

## About the Stack

The stack consists of the following components:

- Neo4j GraphQL Library
- Svelte Kit
- Apollo Server
- JWT Authentication

### Neo4j

Neo4j is a graph database management system developed by Neo4j, Inc. Described by its developers as an ACID-compliant transactional database with native graph storage and processing, Neo4j is the most popular graph database according to DB-Engines ranking, and the 22nd most popular database overall.

### Neo4j GraphQL Library

The Neo4j GraphQL Library is a Neo4j Labs project that provides a GraphQL to Cypher query execution layer. It allows you to build GraphQL APIs backed by Neo4j without writing any Cypher code. It also provides a GraphQL schema augmentation layer that allows you to add custom Cypher queries and mutations to your GraphQL API.

### Svelte Kit

Svelte Kit is a framework for building web applications of all sizes, with a beautiful development experience and flexible filesystem-based routing. It is the successor to Sapper, which was the previous framework for building Svelte applications.

### Apollo Server

Apollo Server is an open-source, spec-compliant GraphQL server that's compatible with any GraphQL client, including Apollo Client. It's the best way to build a production-ready, self-documenting GraphQL API that can use data from any source.

### JWT Authentication

JSON Web Tokens (JWT) are an open, industry standard RFC 7519 method for representing claims securely between two parties. JWT.IO allows you to decode, verify and generate JWT. It is a simple and secure way to authenticate users to your application without having to store any state on the server.


# About the Demo Application

The demo application is a simple social media application, where users can create posts and comments. The application is built using Svelte Kit and uses the Neo4j GraphQL library to interact with the Neo4j database. The application also uses JWT for authentication. For now, the application does not have a frontend, you will need to use a GraphQL client like Insomnia or Altair to interact with the GraphQL API. The graphql endpoint is avaaible at `/graphql`.
<br />

## Running the Neo4j Database with Docker

If you have Docker installed, you can run the Neo4j database with the following command:

```bash
docker-compose up -d
```

## Running the Svelte Kit Application

To run the Svelte Kit demo application, run the following commands:

```bash
npm install
npm run dev
```

This will start the Neo4j database in the background. You can access the Neo4j Browser at http://localhost:7474/browser/ and login with the default credentials (neo4j/password). You can change that in the docker-compose.yml. The database will be available at bolt://localhost:7687.

## Additional Resources

For more information, refer to the following resources:

- [Sveltekit-GraphQL-Auth](https://github.com/CleanGlyph/Sveltekit-GraphQL-Auth)
- [apollo-server-svelte-kit](https://github.com/alexanderschau/apollo-server-svelte-kit)
- [Neo4j GraphQL Library Documentation](https://neo4j.com/docs/graphql-manual/current/)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
