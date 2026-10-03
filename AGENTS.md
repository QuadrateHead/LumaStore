# LumaStore Agent Rules

## Application Building Context and Context Folder Rules

Read the following files in order before implementing or making any architectural decision:

`context/` contains the project specification and implementation guidance. In particular:
- `context/Full Stack E Commerce Web Site Full.md` is the full product/spec reference.
- `context/Full Stack E Commerce Web Site API.md` is the API reference.
- `context/project-overview.md` defines the product scope and goals.
- `context/architecture-context.md` defines the system boundaries, route structure, and technical constraints.
- `context/ui-context.md` defines the visual direction and layout conventions.
- `context/code-standards.md` defines implementation and folder rules.
- `context/ai-workflow-rules.md` defines workflow and scoping expectations.
- `context/progress-tracker.md` tracks the current status and next work.
- `context/UIHTMLDESIGN` is the HTML design source and must be read before custom UI work.

Update `context/progress-tracker.md` after each meaningful implementation change.

If implementation changes the architecture, scope, or standards documented in the context files, update the relevant file before continuing.

## Design Source Rules

- Treat the HTML mockups in `context/UIHTMLDESIGN` as the starting design source.
- Read the HTML files before making design decisions.
- Extract reusable elements, section components, page structures, and feature blocks from the HTML first.
- Translate the discovered structure into the app using the proper folder boundaries.
- Only add custom design decisions after the HTML structure is understood.
- If the design folder contains multiple page mockups, map each HTML page to the relevant route or feature.

## Folder Structure Rules

- `/src/elements` = reusable, generic UI atoms only
- `/src/components` = assembled UI sections and page blocks
- `/src/features` = feature-based domain logic and orchestration
- `/src/store` = Zustand state
- `/src/lib` = helpers, validation, API utilities
- `/src/types` = domain models
- `/src/hooks` = reusable hooks
- `/src/pages` = route/page shells when needed
- Keep each folder focused on one responsibility.
- Do not mix business logic into reusable elements.

## Implementation Rules

- Work in small feature slices.
- Do not combine unrelated work in one step.
- Respect the approved architecture and feature boundaries.
- Use mock data or a mock API layer unless the project explicitly expands beyond the current scope.
- Do not add real payment or production backend logic without updating the project context first.

## Protected Files

Do not modify the protected context/design files or generated vendor-managed UI primitives without explicit instruction.
