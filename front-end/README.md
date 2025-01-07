# Manual - Frontend

## Technical Stack

SPA framework and router:

- **[`Next.js (React)`](https://nextjs.org/)**

Validation:

- **[`Zod`](https://zod.dev)**
- **[`React Hook Form`](https://react-hook-form.com)**
- **[`reCAPTCHA`](https://www.google.com/recaptcha/about/)**

State Management:

- **[`Redux`](https://redux.js.org)**

Styling:

- **[`TailwindCSS`](https://tailwindcss.com)**

Animation:

- **[`React Spring`](https://www.react-spring.dev)**

## Prerequisites

- Ensure that the backend has been started (see [Backend](#backend) for installation guide).
- Ensure that the `.env.local` file and its contents exist, if you happen not to find this file, please contact us. 

## Installation Steps

1. **Open the Project**  

    Navigate to the submitted folder and open it in an IDE   (e.g., VSCode).

2. **Install Required Packages**  

    Open the IDE's `Terminal` and locate the frontend    folder:

    ```bash
    cd .\front-end\
    ```

    If `pnpm` has not been installed in your computer,   proceed to install it using `npm`:

    ```bash
    npm install -g pnpm
    ```

    Then run the following command to install all required   packages:

    ```bash
    pnpm install
    ```

3. **Start the Server**  

    In the same `Terminal`, execute the following command to start the Next.js server:

    ```
    pnpm dev
    ```

    The application should be started and ready at   [`http://localhost:3000`](http://localhost:3000).

4. **End the Server**

    In the same `Terminal`, simply press `Ctrl + C` to end the Next.js server.