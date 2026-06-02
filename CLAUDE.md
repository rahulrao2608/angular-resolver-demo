# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Structure

The Angular app lives inside `resolver-app/`. All commands below must be run from that directory.

```
resolver-app/
  src/
    app/
      components/users/   # UsersComponent (standalone)
      resolvers/          # UserResolver (class-based, Resolve<T>)
      services/           # UserService + User interface
      app.routes.ts       # Route config with resolver binding
      app.config.ts       # provideRouter + provideHttpClient(withFetch())
      app.config.server.ts# Merges appConfig with SSR providers
      app.routes.server.ts# All routes use RenderMode.Prerender
    server.ts             # Express SSR server (AngularNodeAppEngine)
    main.ts               # Browser bootstrap
    main.server.ts        # Server bootstrap
```

## Commands

```bash
cd resolver-app

npm start           # dev server at http://localhost:4200
npm run build       # production build
npm test            # run tests with Vitest
npm run serve:ssr:resolver-app  # serve SSR build (after npm run build)
```

Run a single test file:
```bash
npx vitest run src/app/services/user.spec.ts
```

## Architecture

**Standalone components** — no NgModules in use. `AppModule` in `app.module.ts` is vestigial and unused. Bootstrap happens via `bootstrapApplication(App, appConfig)`.

**Resolver pattern** — `UserResolver` implements `Resolve<User[]>`, pre-fetches data before route activation, and falls back to `of([])` on error. Resolved data is accessed synchronously in the component constructor via `ActivatedRoute.snapshot.data['usersData']`.

**HTTP** — configured with `provideHttpClient(withFetch())` in `app.config.ts`. Uses the Fetch API under the hood (required for SSR compatibility).

**SSR** — `server.ts` is an Express server using `AngularNodeAppEngine`. All routes prerender (`RenderMode.Prerender`). The server config merges browser `appConfig` with `provideServerRendering`.

**Test runner** — Vitest (not Karma/Jasmine). Test files are `*.spec.ts` alongside source files.

## Standing Rules

- Always create a `.spec.ts` test file alongside every new service.
- Use `AsNoTracking()` for read-only queries.
- Prefer `Task.WhenAll` for independent async calls.
