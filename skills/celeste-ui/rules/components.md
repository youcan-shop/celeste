# Choosing a component

The registry (`ai/component-registry.md`, shipped inside `@youcan/celeste`) is
generated from source and describes **what every component accepts** — props,
their types and defaults, events, slots, and what each component composes with.
Check it before writing any UI.

This file covers what the registry deliberately does not: **which component to
reach for** when several have near-identical signatures. That is a judgement
call, not a fact about the API, so it lives here.

## Never hand-roll a control that exists

Celeste exports 146 components. Before writing a styled `<div>`, a custom
`<button>`, or a bespoke dropdown, look it up. A hand-rolled control loses
keyboard handling, focus management, and dark mode.

## Buttons

Five components with overlapping props. The types cannot tell you which to use.

| Use             | When                                                                                                   |
| --------------- | ------------------------------------------------------------------------------------------------------ |
| `Button`        | Any standard action. The default — start here.                                                         |
| `FancyButton`   | The single primary call to action on a page. Using more than one defeats the emphasis.                 |
| `CompactButton` | Dense UI such as toolbars and table rows. Sized for one icon; pass exactly one icon as the only child. |
| `LinkButton`    | The action reads as a link but is not navigation. Inline text, no chrome.                              |
| `SocialButton`  | OAuth providers. Renders the provider mark from `brand` — do not pass an icon.                         |

## Badges

| Use           | When                                                                                |
| ------------- | ----------------------------------------------------------------------------------- |
| `Badge`       | A static label for a category. Not interactive.                                     |
| `StatusBadge` | The value represents a **state**. Also selects its icon automatically from `state`. |
| `Tag`         | The value can be dismissed or selected by the user.                                 |

## Prefer built-in props over `class`

Every component exposes `variant`, `intent`, and `size` props that resolve to
tokens. Reach for those before overriding anything through `class`. The `class`
prop is for layout — placement, width, margin — not for restyling a component's
colours or typography.
