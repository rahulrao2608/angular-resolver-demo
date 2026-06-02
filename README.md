# Angular Resolver Demo

A learning project demonstrating the **Angular resolver pattern** for pre-fetching data before route activation, with full SSR (Server-Side Rendering) support.

## What This Demonstrates

- **Route Resolvers** — `UserResolver` fetches user data before the route activates, so the component always has data available synchronously on render (no loading spinners, no race conditions)
- **Standalone Components** — no NgModules; all components use the modern standalone API
- **SSR + Prerendering** — Angular Universal with Express; all routes are prerendered to static HTML at build time
- **Vitest** — modern unit test runner replacing Karma/Jasmine

## How the Resolver Pattern Works

```
Navigate to /users
  → UserResolver.resolve() is invoked by the router
  → Calls UserService.getUsers() → HTTP GET https://jsonplaceholder.typicode.com/users
  → Router waits for the Observable to complete
  → UsersComponent activates with data already in route snapshot
  → Template renders immediately — no async subscription needed
```

The component reads resolved data synchronously:
```ts
this.users = route.snapshot.data['usersData'];
```

## Project Structure

```
resolver-app/
  src/
    app/
      components/users/     # UsersComponent (standalone)
      resolvers/            # UserResolver — implements Resolve<User[]>
      services/             # UserService + User interface
      app.routes.ts         # Route config: /users → UsersComponent + UserResolver
      app.config.ts         # provideRouter + provideHttpClient(withFetch())
      app.config.server.ts  # Merges appConfig with SSR providers
      app.routes.server.ts  # All routes set to RenderMode.Prerender
    server.ts               # Express SSR server (AngularNodeAppEngine)
    main.ts                 # Browser bootstrap
    main.server.ts          # Server bootstrap
```

## Getting Started

```bash
cd resolver-app
npm install
npm start           # Dev server at http://localhost:4200
```

### Other Commands

```bash
npm run build                        # Production build (browser + SSR)
npm test                             # Run unit tests with Vitest
npm run serve:ssr:resolver-app       # Serve the SSR build locally
```

## Tech Stack

| Tool | Version |
|---|---|
| Angular | 21.2.0 |
| Angular SSR | 21.2.9 |
| Express | 5.1.0 |
| RxJS | 7.8.0 |
| Vitest | 4.0.8 |
| TypeScript | 5.9.2 |
