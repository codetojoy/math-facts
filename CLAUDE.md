# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- Run the app (dev mode, http://localhost:9000): `./run-app.sh` (wraps `sbt run`)
- Run tests: `./test-app.sh` (wraps `sbt clean test`) — no tests exist yet
- Run a single test (once tests exist): `sbt "testOnly fully.qualified.ClassName"`
- Compile only: `sbt compile`

Java 21 and sbt 1.10.5 are required. The Play sbt plugin pulls in the rest.

## Architecture

Play Framework 3.0.x app (Java) using sbt + Scala 2.13 for the build. The frontend is server-rendered Twirl + Knockout JS + jQuery hitting a JSON API on the same app.

Request flow:
- `conf/routes` maps `GET /` → `MathFactsController.index` (renders `app/views/index.scala.html`) and `GET /api/mathfacts?n=<long>` → `MathFactsController.facts` (returns JSON).
- `MathFactsController` is constructor-injected (Guice via `libraryDependencies += guice`) with `MathFactsService`, which holds the math logic (currently `isPrime`).
- The view loads jQuery + Knockout from CDNs and `public/javascripts/mathfacts.js`, which is the Knockout view-model that calls `/api/mathfacts` and binds the result.

When adding a new "math fact" (per `docs/Spec.md`):
- Add the predicate/computation as a method on `MathFactsService`.
- Extend the JSON object built in `MathFactsController.facts` with the new field.
- Update `mathfacts.js` and `index.scala.html` bindings to display it.
- Do **not** prefix new files/classes with `Prime` — use `MathFacts` (primality is just one attribute among many planned).
- Stick with AJAX/JSON + Knockout for new UI; no database, no auth.

`docs/Spec.md` is the source of truth for product intent. `docs/TODO-*.md` files are sequenced work items — read them before starting feature work.

## Notes

- `my-resources/` contains a local edit-logging hook script (`my-edit-logger.sh`) and its log; not part of the app.
- `target/`, `project/target/`, `logs/`, `RUNNING_PID` are sbt/Play build artifacts (gitignored).
