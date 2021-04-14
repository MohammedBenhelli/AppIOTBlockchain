import {Application} from "https://deno.land/x/oak@v6.2.0/mod.ts";
import {GraphQLService} from "./services.ts";

const app = new Application();

app.use(GraphQLService.routes(), GraphQLService.allowedMethods());

console.log("Server start at http://localhost:8090");
await app.listen({ port: 8090 });
