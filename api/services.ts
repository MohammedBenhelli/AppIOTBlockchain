import {Router, RouterContext} from "https://deno.land/x/oak@v6.2.0/mod.ts";
import { applyGraphQL } from "https://deno.land/x/oak_graphql/mod.ts";
import {types} from "./types.ts";
import {resolvers} from "./resolvers.ts";

export const GraphQLService = await applyGraphQL<Router>({
    Router,
    typeDefs: types,
    resolvers: resolvers,
    context: (ctx: RouterContext) => {
        console.log(ctx);
        return { user: "Praveen" };
    }
});
