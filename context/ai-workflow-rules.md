# AI Workflow Rules

## Approach

Build the LumaStore project incrementally using a spec-driven workflow. The context files define the intended product, architecture, and implementation boundaries. All implementation work should follow these files first and only invent missing details when they are explicitly required and then recorded in the project tracker.

## Scoping Rules

- Work on one feature unit at a time.
- Prefer small, verifiable development increments over large speculative changes.
- Keep storefront and admin work separate unless a feature intentionally spans both contexts.
- Do not add unrelated product behavior that is not described in the approved project spec.

## When to Split Work

Split a task when it combines:

- Storefront UI work and admin data work in the same step
- Multiple unrelated API surfaces or route groups
- Behavior that is not clearly defined in the project context files
- Large cross-cutting changes that cannot be verified quickly end to end

If a change cannot be easily validated in a short loop, the scope is too broad.

## Handling Missing Requirements

- Do not invent product behavior not described in the LumaStore specification.
- If a requirement is ambiguous, resolve it in the relevant context file before implementing.
- If a requirement is missing, add it as an open question in `progress-tracker.md` before continuing.

## Protected Files

Do not modify the following unless explicitly instructed:

- Generated library code under `components/ui` if it is meant to be vendor-managed
- Third-party library internals
- Files explicitly excluded by the workspace context instructions

## Keeping Docs in Sync

Update the relevant context file whenever implementation changes:

- System architecture or boundaries
- State model or data shape
- Validation rules or form patterns
- Feature scope or route structure
- Project status or current issues

## Before Moving to the Next Unit

1. The current unit works end to end within its defined scope.
2. No invariant in `architecture-context.md` was violated.
3. `progress-tracker.md` reflects the completed work accurately.
4. `npm run build` passes for the current implementation state.
5. The updated behavior still matches the LumaStore product specification.
