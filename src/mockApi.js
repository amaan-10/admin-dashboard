import { createServer, Model } from "miragejs";

export function makeServer() {
  createServer({
    models: {
      user: Model,
    },

    seeds(server) {
      // Creating some initial users for testing
      server.create("user", {
        id: 1,
        name: "Alice",
        email: "alice@example.com",
        role: "Admin",
      });
      server.create("user", {
        id: 2,
        name: "Bob",
        email: "bob@example.com",
        role: "User",
      });
      server.create("user", {
        id: 3,
        name: "Charlie",
        email: "charlie@example.com",
        role: "Manager",
      });
    },

    routes() {
      this.namespace = "api"; // This will add '/api' prefix to all routes

      // Simulating GET /api/users request
      this.get("/users", (schema) => {
        // Return all users, wrapping them in an object with a 'users' key

        return { users: schema.users.all().models.map((user) => user.attrs) };
      });

      // Simulating POST /api/users request
      this.post("/users", (schema, request) => {
        let attrs = JSON.parse(request.requestBody);
        return schema.users.create(attrs);
      });

      // Simulating PUT /api/users/:id request
      this.put("/users/:id", (schema, request) => {
        let id = request.params.id;
        let attrs = JSON.parse(request.requestBody);
        let user = schema.users.find(id);
        return user.update(attrs);
      });

      // Simulating DELETE /api/users/:id request
      this.delete("/users/:id", (schema, request) => {
        let id = request.params.id;
        return schema.users.find(id).destroy();
      });
    },
  });
}
