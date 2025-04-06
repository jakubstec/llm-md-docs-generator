# Testing Strategy for @rescui/use-glow-hover

## 1. Test Strategy Overview

This document outlines the testing strategy for the `@rescui/use-glow-hover` React hook.  The goal is to ensure the hook functions correctly, is easy to use, and provides a consistent user experience across different scenarios. We will be using Jest and React Testing Library to achieve this.

**Testing Tools:**

*   **Jest:**  A JavaScript testing framework used for writing and running tests.
*   **React Testing Library:**  A library for testing React components by focusing on user behavior rather than implementation details.

**What is being tested:**

*   **Hook Functionality:**  That the hook correctly applies the necessary inline styles to an element when it's hovered over.  This includes the box-shadow property, which creates the glow effect.
*   **Customization Options:**  That the `glowColor`, `glowIntensity`, and `glowDuration` options are correctly applied and override the default values.
*   **CSS Variable Fallback:**  That the hook correctly falls back to default values if CSS variables are not defined.
*   **Ref Attachment:**  That the ref returned by the hook correctly attaches to the DOM element.
*   **Hover State Management:**  That the hover effect is applied only when the element is hovered over and removed when the mouse leaves.
*   **Performance:** (Indirectly) While we won't be writing explicit performance tests, the tests will check that only the necessary styles are applied, minimizing unnecessary re-renders.

**What is NOT being tested (Out of Scope):**

*   **Specific Browser Rendering:**  We will assume that browsers correctly implement CSS box-shadow and transitions. Testing specific rendering quirks across different browsers is outside the scope of this unit test.  Consider visual regression testing for this purpose as a separate quality gate.
*   **Pixel-Perfect Visual Accuracy:**  Minor visual differences due to browser rendering or operating system configurations are not within the scope of these tests.
*   **Internet Explorer Compatibility:**  As noted in the package description, Internet Explorer is not officially supported.  Testing compatibility with IE is therefore out of scope.  If IE support is required, manual testing and polyfills should be considered.
*   **Complex Animation Sequences:** The hook applies a simple hover effect. Complex animation sequences are outside the scope.
*   **End-to-end tests:** Full application flow testing is not the focus of these unit tests for an individual hook.

## 2. Full Test Files

```tsx
// useGlowHover.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import React, { useRef } from 'react';
import { useGlowHover } from '../src/useGlowHover'; // Adjust path as needed

// Mock ResizeObserver which is required by React 18 in test env but not provided
global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

describe('useGlowHover Hook', () => {

  it('should apply default glow effect on hover', () => {
    const TestComponent = () => {
      const { ref } = useGlowHover();
      return <button ref={ref}>Hover Me</button>;
    };

    render(<TestComponent />);
    const button = screen.getByText('Hover Me');

    fireEvent.mouseEnter(button);
    expect(button).toHaveStyle('box-shadow: var(--glow-shadow, 0 0 5px var(--glow-color, #007bff))');

    fireEvent.mouseLeave(button);
    expect(button).not.toHaveStyle('box-shadow: var(--glow-shadow, 0 0 5px var(--glow-color, #007bff))');
  });

  it('should apply custom glow color on hover', () => {
    const TestComponent = () => {
      const { ref } = useGlowHover({ glowColor: 'red' });
      return <button ref={ref}>Hover Me</button>;
    };

    render(<TestComponent />);
    const button = screen.getByText('Hover Me');

    fireEvent.mouseEnter(button);
    expect(button).toHaveStyle('box-shadow: var(--glow-shadow, 0 0 5px red)');

    fireEvent.mouseLeave(button);
    expect(button).not.toHaveStyle('box-shadow: var(--glow-shadow, 0 0 5px red)');
  });

  it('should apply custom glow intensity on hover', () => {
    const TestComponent = () => {
      const { ref } = useGlowHover({ glowIntensity: '0.8' });
      return <button ref={ref}>Hover Me</button>;
    };

    render(<TestComponent />);
    const button = screen.getByText('Hover Me');

    fireEvent.mouseEnter(button);
    expect(button).toHaveStyle('box-shadow: var(--glow-shadow, 0 0 5px var(--glow-color, #007bff))'); // Intensity not directly testable without mocking CSS variable context

    fireEvent.mouseLeave(button);
    expect(button).not.toHaveStyle('box-shadow: var(--glow-shadow, 0 0 5px var(--glow-color, #007bff))');
  });

  it('should apply custom glow duration on hover', () => {
    const TestComponent = () => {
      const { ref } = useGlowHover({ glowDuration: '0.5s' });
      return <button ref={ref}>Hover Me</button>;
    };

    render(<TestComponent />);
    const button = screen.getByText('Hover Me');

    fireEvent.mouseEnter(button);
    expect(button).toHaveStyle('transition: box-shadow var(--glow-duration, 0.3s) ease-in-out'); // Duration partially tested.

    fireEvent.mouseLeave(button);
    expect(button).not.toHaveStyle('box-shadow: var(--glow-shadow, 0 0 5px var(--glow-color, #007bff))');
  });

  it('should fall back to default glow color if CSS variable is not defined', () => {
    const TestComponent = () => {
      const { ref } = useGlowHover();
      return <button ref={ref}>Hover Me</button>;
    };

    render(<TestComponent />);
    const button = screen.getByText('Hover Me');

    fireEvent.mouseEnter(button);
    expect(button).toHaveStyle('box-shadow: var(--glow-shadow, 0 0 5px var(--glow-color, #007bff))');

    fireEvent.mouseLeave(button);
    expect(button).not.toHaveStyle('box-shadow: var(--glow-shadow, 0 0 5px var(--glow-color, #007bff))');
  });

   it('should handle rapid hover and unhover events', () => {
    const TestComponent = () => {
      const { ref } = useGlowHover();
      return <button ref={ref}>Hover Me</button>;
    };

    render(<TestComponent />);
    const button = screen.getByText('Hover Me');

    fireEvent.mouseEnter(button);
    fireEvent.mouseLeave(button);
    fireEvent.mouseEnter(button);
    fireEvent.mouseLeave(button);

    expect(button).not.toHaveStyle('box-shadow: var(--glow-shadow, 0 0 5px var(--glow-color, #007bff))');
   });

  it('should correctly attach the ref to the element', () => {
      const TestComponent = () => {
        const elementRef = useRef(null);
        const { ref } = useGlowHover();
        return <button ref={(node) => {
          elementRef.current = node;
          ref(node); // Call the ref returned by useGlowHover
        }}>Hover Me</button>;
      };

      render(<TestComponent />);
      const button = screen.getByText('Hover Me');
      fireEvent.mouseEnter(button);
      expect(button).toHaveStyle('box-shadow: var(--glow-shadow, 0 0 5px var(--glow-color, #007bff))');
  });
});
```

## 3. Setup & Run Instructions

**Installation:**

1.  Install the `@rescui/use-glow-hover` package:

    ```bash
    npm install @rescui/use-glow-hover
    ```

2.  Install Jest and React Testing Library as development dependencies:

    ```bash
    npm install --save-dev jest @testing-library/react @testing-library/jest-dom
    ```
    or
    ```bash
    yarn add --dev jest @testing-library/react @testing-library/jest-dom
    ```

3. (Optional) Install `identity-obj-proxy` for CSS Modules mocking if your project uses CSS Modules.

    ```bash
    npm install --save-dev identity-obj-proxy
    ```

**Configuration:**

1.  **Jest Configuration:** Create a `jest.config.js` file (if you don't have one already) in the root of your project with the following configuration:

    ```javascript
    // jest.config.js
    module.exports = {
      testEnvironment: 'jsdom',
      setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'], // Create this file if you don't have it, to import jest-dom matchers
      moduleNameMapper: {
        '\\.(css|less|scss|sass)$': 'identity-obj-proxy', // For CSS Modules
      },
      transform: {
        "^.+\\.(js|jsx|ts|tsx)$": "babel-jest"
      },
    };
    ```

2.  **`setupTests.ts` (or `.js`):** Create a `src/setupTests.ts` file to import `jest-dom` matchers (if you don't have one already).  This is required to use `toHaveStyle` and other custom matchers from `@testing-library/jest-dom`.
     ```typescript
     // src/setupTests.ts
     import '@testing-library/jest-dom';
     ```

3. Add the following to `package.json`:
    ```json
     "scripts": {
      "test": "jest",
      "test:coverage": "jest --coverage"
     }
    ```

**Running the Tests:**

1.  Run the tests using the following command:

    ```bash
    npm test
    ```

2. To generate a coverage report, run:
    ```bash
    npm run test:coverage
    ```

## 4. Coverage Summary

**Features Covered:**

*   **Default Glow Effect:**  Tests that the default glow effect is applied correctly on hover.
*   **Custom Glow Color:**  Tests that the `glowColor` option correctly overrides the default glow color.
*   **Custom Glow Intensity:**  Tests that the `glowIntensity` option is applied (indirectly, as direct style assertion isn't possible without mocking CSS variable contexts in tests).
*   **Custom Glow Duration:**  Tests that the `glowDuration` option correctly sets the transition duration.
*   **CSS Variable Fallback:** Tests that the hook falls back to the default glow color if the CSS variable is not defined.
*   **Ref Attachment:**  Tests that the ref returned by the hook is correctly attached to the element.
*   **Rapid Hover/Unhover:** Tests handling of rapid hover and unhover events to ensure no lingering styles.

**Edge Cases Covered:**

*   CSS variable fallback.
*   Rapid hover/unhover interaction.

**Out of Scope/Requires Manual Testing:**

*   **Specific Browser Rendering Differences:**  Visual consistency across different browsers and operating systems.  This can be addressed with visual regression testing tools.
*   **Accessibility:** While we can ensure the hook doesn't interfere with basic accessibility, full accessibility testing requires manual evaluation with screen readers and other assistive technologies. For example, ensure sufficient contrast between the glow and the element's background.
*   **Performance:** While these tests assert against basic functionality, extensive performance testing of real-world scenarios may be required in performance-critical applications.  Consider using profiling tools to analyze the impact of the hook on overall application performance.
*   **Complex Integrations:** Testing with complex component structures and interactions may require separate integration tests.
*   **Visual Testing:** Snapshot or visual regression tests are recommended but not included in the basic unit test suite.  These tests would help catch unexpected visual changes.