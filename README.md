# WNC - Final Project - Internet Banking

This is an installation guide for `Bankit!` - an internet banking project.

## Group Information

**Group number:** 09

**Registered BE/FE techical stack:** Express.js/Next.js

**Group Members:**

- **`21127092`** - Trần Hoàng Lâm
- **`21127147`** - Võ Anh Quân
- **`21127151`** - Nguyễn Nhật Quang
- **`21127629`** - Trần Minh Khoa

## Backend
### Technical Stack

Framework and others:
- **[`Express.js`](https://expressjs.com)**
- **[`Docker`](https://www.docker.com)**

Validation:
- **[`Zod`](https://zod.dev)**

Database:
- **[`Sequelize`](https://sequelize.org)**
- **[`PostgreSQL`](https://www.postgresql.org)**

Security:
- **[`JsonWebToken`](https://www.npmjs.com/package/jsonwebtoken)**

API Documentation:
- **[`Swagger`](https://swagger.io)**

### Prerequisites

- Ensure that Docker is install on your local machine.

### Installation Steps
1. **Open the Project**  

    Navigate to the submitted folder and open it in an IDE   (e.g., VSCode).

2. **Run Docker Compose**  

    Open the IDE's `Terminal` from root folder:
    ```bash
    docker compose up --build
    ```

    The application should be started and ready at   [`http://localhost:80`](http://localhost:80).

3. **End the Server**

    In the same `Terminal`, simply press `Ctrl + C` to end the Docker Container.

## Frontend

### Technical Stack

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

### Prerequisites

- Ensure that the backend has been started (see [Backend](#backend) for installation guide).
- Ensure that the `.env.local` file and its contents exist, if you happen not to find this file, please contact us. 

### Installation Steps

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