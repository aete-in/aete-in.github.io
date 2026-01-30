# React
## Setup Instructions

1.  **Environment Variables**:
    *   Rename `.env.example` to `.env`.
    *   Fill in your Firebase config keys.
    *   Add your Razorpay Key ID.

2.  **Firebase Console**:
    *   Go to your Firebase Project Console.
    *   Navigate to **Build > Authentication**.
    *   Click **Get Started**.
    *   Select **Email/Password** as a Sign-in method.
    *   **Enable** it and click **Save**.
    *   (Optional) Enable **Realtime Database** and set rules to read/write mode (for testing).

3.  **Installation & Run**:
    ```bash
    npm install
    npm run dev
    ```

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
