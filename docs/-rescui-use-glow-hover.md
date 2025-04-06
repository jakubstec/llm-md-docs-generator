# @rescui/use-glow-hover

[![npm version](https://badge.fury.io/js/%40rescui%2Fuse-glow-hover.svg)](https://badge.fury.io/js/%40rescui%2Fuse-glow-hover)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Introduction

`@rescui/use-glow-hover` is a lightweight and performant React hook that adds a subtle, engaging glow effect to elements on hover. It's designed to enhance the user experience by providing visual feedback when users interact with interactive elements like buttons, links, or cards. This package eliminates the need for complex CSS transitions or external libraries to achieve a polished glow effect, making it easy to integrate into your React projects.

**Why use `@rescui/use-glow-hover`?**

*   **Improved User Experience:** Provides intuitive visual feedback, making your UI more engaging.
*   **Simplified Implementation:** Abstracted complex CSS animations into a reusable React hook, reducing boilerplate code.
*   **Customizable:** Offers options to tailor the glow color, intensity, and duration to match your design aesthetic.
*   **Performance-Focused:** Built with performance in mind, ensuring smooth animations without impacting your application's responsiveness.
*   **Easy to integrate:** Works seamlessly in any React project

**Key Concepts:**

*   **React Hook:**  A special function that lets you "hook into" React state and lifecycle features from function components. `use-glow-hover` is a custom React hook.
*   **CSS Variables (Custom Properties):**  Entities defined by CSS authors that contain specific values to be reused throughout a document. They provide a way to encapsulate repetitive CSS. `@rescui/use-glow-hover` leverages them for easy theming.
*   **Inline Styles:** Applying CSS styles directly to a HTML element using the `style` attribute in React.

This documentation will guide you through the installation, usage, and customization options of `@rescui/use-glow-hover`. Let's get started!

## Installation

Install the package using npm or yarn:

```bash
npm install @rescui/use-glow-hover
```

or

```bash
yarn add @rescui/use-glow-hover
```

No additional configuration is required after installation.

## API Reference

| Name            | Type                                                                  | Description                                                                                                                                           | Parameters                                                                                                                                                                                                                           | Return Value                                                                  |
| --------------- | --------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| `useGlowHover` | `(options?: GlowHoverOptions) => { ref: React.RefObject<HTMLElement> }` | A React hook that adds a glow effect to an element on hover.  Applies inline styles and manages the hover state.                                      | `options`: `GlowHoverOptions` (optional) - An object containing customization options for the glow effect. See the Configuration section below for details.                                                                           | `{ ref: React.RefObject<HTMLElement> }` - A ref to be attached to the element you want the glow effect to apply to. |
| `GlowHoverOptions` | `interface`                                                         | Interface defining available options for the `useGlowHover` hook. | `glowColor?: string` (optional): The color of the glow. Default: `'var(--glow-color, #007bff)'`. <br>`glowIntensity?: string` (optional): The intensity of the glow (e.g., '0.5'). Default: `'var(--glow-intensity, 0.75)'`. <br>`glowDuration?: string` (optional): The duration of the glow animation in seconds. Default: `'var(--glow-duration, 0.3s)'`. | `void`                                                            |

## Usage Examples

### Basic Usage

```jsx
import React from 'react';
import { useGlowHover } from '@rescui/use-glow-hover';

function MyButton() {
  const { ref } = useGlowHover();

  return (
    <button ref={ref} style={{ padding: '10px 20px', border: '1px solid #ccc', borderRadius: '5px', cursor: 'pointer' }}>
      Hover Me!
    </button>
  );
}

export default MyButton;
```

This example demonstrates the most basic usage. Simply import the hook, call it within your component, and attach the returned `ref` to the element you want to add the glow effect to.

### Custom Glow Color

```jsx
import React from 'react';
import { useGlowHover } from '@rescui/use-glow-hover';

function MyCustomButton() {
  const { ref } = useGlowHover({ glowColor: 'var(--my-custom-glow-color, #ff4081)' });

  return (
    <button ref={ref} style={{ padding: '10px 20px', border: '1px solid #ccc', borderRadius: '5px', cursor: 'pointer' }}>
      Hover Me!
    </button>
  );
}

export default MyCustomButton;
```

This example shows how to customize the glow color using the `glowColor` option.

### Custom Glow Intensity and Duration

```jsx
import React from 'react';
import { useGlowHover } from '@rescui/use-glow-hover';

function MyCustomButton() {
  const { ref } = useGlowHover({ glowIntensity: '0.9', glowDuration: '0.5s' });

  return (
    <button ref={ref} style={{ padding: '10px 20px', border: '1px solid #ccc', borderRadius: '5px', cursor: 'pointer' }}>
      Hover Me!
    </button>
  );
}

export default MyCustomButton;
```

This example demonstrates how to customize both the glow intensity and duration.

### Using CSS Variables (Theming)

```jsx
import React from 'react';
import { useGlowHover } from '@rescui/use-glow-hover';

function MyThemedButton() {
  const { ref } = useGlowHover();

  return (
    <button ref={ref} style={{ padding: '10px 20px', border: '1px solid #ccc', borderRadius: '5px', cursor: 'pointer' }}>
      Hover Me!
    </button>
  );
}

export default MyThemedButton;

// In your global CSS or theme file:
/*
:root {
  --glow-color: #e91e63;
  --glow-intensity: 0.8;
  --glow-duration: 0.4s;
}
*/

```

This is the best practice.  By defining `--glow-color`, `--glow-intensity`, and `--glow-duration` as CSS variables, you can easily theme the glow effect across your entire application. If these variables are not defined, the hook will fall back to its default values.

### Edge Cases

*   **Multiple Glows:** You can apply the hook to multiple elements on the same page without any conflicts. Each element will have its own independent glow effect.
*   **Dynamically Rendered Elements:** The hook works correctly with elements that are dynamically added or removed from the DOM.
*   **Nested Elements:** Be mindful of applying glows to deeply nested elements, as it might affect performance if not used judiciously.

## Configuration

The `useGlowHover` hook accepts an optional `options` object with the following properties:

*   `glowColor`: `string` (optional) - The color of the glow.  Defaults to `var(--glow-color, #007bff)`.
*   `glowIntensity`: `string` (optional) - The intensity of the glow (a value between 0 and 1).  Defaults to `var(--glow-intensity, 0.75)`.
*   `glowDuration`: `string` (optional) - The duration of the glow animation in seconds (e.g., "0.3s").  Defaults to `var(--glow-duration, 0.3s)`.

These options allow you to fully customize the appearance of the glow effect to match your application's design.  It is recommended to set these values using CSS variables whenever possible to maintain a consistent look and feel throughout your application, and to allow for easy theming.

## Browser Compatibility

The `useGlowHover` hook relies on CSS box-shadow and transitions, which are widely supported across modern browsers, including:

*   Chrome
*   Firefox
*   Safari
*   Edge
*   Opera

Internet Explorer is **not officially supported** due to limited support for CSS variables and transitions.  While the effect may still work to some extent, it's not guaranteed to function as expected.

**Polyfills:**

No specific polyfills are required for basic functionality. However, if you need to support older browsers, you might consider using a CSS variables polyfill like `css-vars-ponyfill`. However, that might come with a performance penalty.

## Dependencies

The package has no external dependencies beyond React itself. It requires React version 16.8 or higher to support the use of hooks.

*   **react:** `^16.8.0` or higher

## Troubleshooting

*   **Glow effect not appearing:**
    *   Ensure the `ref` is correctly attached to the desired element.
    *   Verify that the element has a background color or some visual styling so that the glow is visible.
    *   Check that you haven't accidentally overwritten the inline styles applied by the hook with other CSS rules (especially important when using CSS frameworks).  Specificity can be a common issue.  Use developer tools in your browser to inspect the element's styles.
    *   If using CSS variables, ensure they are properly defined in your CSS.
*   **Glow effect is too subtle or too intense:**
    *   Adjust the `glowIntensity` option to a value between 0 and 1.  Smaller values result in a more subtle glow, while larger values result in a more intense glow.
*   **Glow animation is too fast or too slow:**
    *   Modify the `glowDuration` option to adjust the animation speed.  Shorter durations result in faster animations, while longer durations result in slower animations.
*   **Unexpected behavior on older browsers:**
    *   If you need to support older browsers, consider using a CSS variables polyfill, but be aware of potential performance implications.

If you encounter any other issues or have suggestions for improvement, please open an issue on the [GitHub repository](https://github.com/your-username/use-glow-hover). We appreciate your feedback!
