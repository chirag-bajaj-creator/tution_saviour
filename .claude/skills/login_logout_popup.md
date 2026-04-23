---
name: login-logout-popup
description: Enforce a UI pattern where authentication actions use popup modals instead of dedicated navigation pages. Use when building or updating web apps that need login and logout flows, auth entry points in headers/navbars, session actions, or protected-route UX where sign-in and sign-out should happen in modal dialogs.
---

# Login Logout Popup

Use popup modals for both login and logout flows.

## Apply the Pattern

- Trigger login from a button, navbar action, floating CTA, or protected action that requires authentication.
- Open a modal dialog instead of redirecting to a standalone `/login` page unless the app already depends on a full-page auth route for OAuth or external providers.
- Trigger logout from a user menu, profile section, or settings action.
- Open a confirmation modal before logging the user out.

## Login Modal Requirements

- Show the login form inside a centered popup with backdrop overlay.
- Include email or username field, password field, primary submit button, close button, and loading state.
- Support validation errors inline inside the popup.
- Keep the user on the current page after successful login and refresh auth-dependent UI in place.
- Return focus to the triggering element when the modal closes.

## Logout Modal Requirements

- Show a short confirmation popup before logout.
- Explain that the current session will end.
- Provide clear `Cancel` and `Logout` actions.
- Close the popup immediately after a successful logout and redirect only if the app requires a public landing state.

## UX Rules

- Trap focus inside the modal while it is open.
- Close on `Esc` and backdrop click only when no request is in progress.
- Disable duplicate submits while login or logout is pending.
- Show success or error feedback inside the modal or immediately after close.
- Preserve responsive behavior so the popup works on mobile and desktop.

## Implementation Guidance

- Keep modal state near the layout, navbar, or auth provider so any page can trigger it.
- Expose simple actions such as `openLoginModal()`, `openLogoutModal()`, and `closeAuthModal()`.
- Reuse one modal system and shared styling rather than building separate popup logic per page.
- Keep auth API calls separate from modal presentation logic.
- If protected content requires login, open the login popup and resume the intended action after authentication when feasible.

## Avoid

- Do not force navigation to a separate login screen for basic email/password auth.
- Do not log users out immediately on click without confirmation unless the product explicitly requires one-click logout.
- Do not duplicate auth forms across multiple pages and popups.
