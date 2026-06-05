# Logo Sizing Guide

This guide explains how to adjust the sizes of the logos on the website without needing to touch any React code or CSS. You can modify these settings safely in under 30 seconds.

## How it works
The entire website reads logo sizes from a single configuration file:
**`src/config/branding.ts`**

In this file, you will find five straightforward categories containing `width` and `height` parameters. Changing the numbers instantly changes the size of the corresponding logo.

---

## 1. Desktop Header Logo
- **Current Size:** Width `260`, Height `52`
- **Location:** Visible in the top-left navigation bar on computer screens.
- **How to increase:** Change `navbarDesktop` width to `280` or `300` and height proportionally (e.g., `56` or `60`).
- **How to decrease:** Change `navbarDesktop` width to `200` and height to `40`.

## 2. Mobile Header Logo
- **Current Size:** Width `180`, Height `36`
- **Location:** Visible in the top-left navigation bar on phones and tablets.
- **How to increase:** Change `navbarMobile` width to `200` and height to `40`.
- **How to decrease:** Change `navbarMobile` width to `160` and height to `32`.

## 3. Mobile Slide-out Menu Logo
- **Current Size:** Width `180`, Height `36`
- **Location:** Visible at the top of the menu that slides out when you click the hamburger icon on phones.
- **How to adjust:** Change the `mobileMenu` numbers identical to how you adjust the Mobile Header Logo.

## 4. Desktop Footer Logo
- **Current Size:** Width `320`, Height `72`
- **Location:** Visible at the very bottom left on computer screens (dark background).
- **How to increase:** Change `footerDesktop` width to `360` and height to `80`.
- **How to decrease:** Change `footerDesktop` width to `280` and height to `60`.

## 5. Mobile Footer Logo
- **Current Size:** Width `240`, Height `60`
- **Location:** Visible at the very bottom on phones and tablets.
- **How to adjust:** Change `footerMobile` width to `260` (increase) or `200` (decrease) and height proportionally.

---

## Live Preview Instructions

To test logo sizes instantly on your computer:

1. **Open the file:**
   Open `src/config/branding.ts` in your code editor.
   
2. **Change the numbers:**
   Find the category you want to change (for example, `navbarDesktop`).
   Update the numbers. For instance:
   ```typescript
   navbarDesktop: {
     width: 300, // Changed from 260
     height: 60  // Changed from 52
   }
   ```

3. **Save the file:**
   Press `Ctrl + S` (Windows/Linux) or `Cmd + S` (Mac).

4. **View the changes:**
   Open your browser and navigate to your local website (e.g., `http://localhost:2028`). Next.js will automatically refresh the page in less than a second, and you will see the new logo size applied.

> **Responsive Safety Note:** All logos are strictly set to `object-contain`. This means if you type an exceptionally large width or height, the logo will not warp, distort, or stretch out of proportion. However, be careful not to use excessively large numbers (e.g., `height: 200` on the navbar), as this may cause the navigation bar layout to expand and push content awkwardly.
