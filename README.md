# Vocabulary Frontend

## Overview
The Vocabulary Frontend is a web application designed to facilitate Banglish-to-Bangla conversion, integrated with additional features such as a chat option. The project leverages modern web development tools and frameworks, including:

- **Next.js** for server-side rendering and frontend development.
- **TypeScript** for type-safe programming.
- **shadcn/ui** for sleek and responsive UI components.

## Key Features
- **Banglish-to-Bangla Conversion**: Efficiently converts transliterated Banglish text into proper Bangla.
- **Chat Feature**: Provides real-time communication capabilities.
- **PDF Management**: Tools to manage and display PDFs.
- **User Management**: Displays user data and supports individual user pages.

---

## Project Structure
Below is an overview of the project's file structure:

```
.DS_Store
.env
.gitignore
.next/
    app-build-manifest.json
    build-manifest.json
    cache/
        images/
        swc/
        webpack/
    fallback-build-manifest.json
    package.json
    react-loadable-manifest.json
    server/
        _error.js
        app/
        app-paths-manifest.json
        app/
            dashboard/
                page.js
                pdf-manage/
                    page.js
            all-users/
                page.js
            user/
                [id]/
                    page.js
            page.js
        vendor-chunks/
            tailwind-merge.js
            mime-db.js
            @radix-ui.js
            performance-now.js
    static/
        chunks/
            app/
                page.js
            pages/
                _app.js
                _document.js
        development/
            _buildManifest.js
    trace
    types/
components.json
next-env.d.ts
next.config.mjs
package.json
postcss.config.mjs
public/
    .DS_Store
    fonts/
README.md
src/
    .DS_Store
    app/
        globals.css
        layout.tsx
    components/
        navbar/
            Navigation.tsx
            Navbar.tsx
        pdf/
            PdfManagement.tsx
        ui/
            navigation-menu.tsx
            skeleton.tsx
            toaster.tsx
        user/
            Search.tsx
            ShowPdf.tsx
            UserShow.tsx
        footer/
            Footer.tsx
        converter/
            Convert.tsx
    hooks/
    lib/
    provider/
        AuthProvider.tsx
        PrivateRoute.tsx
tailwind.config.ts
tsconfig.json
```

---

## Installation

### Prerequisites
- **Node.js** (v16 or higher)
- **npm** or **yarn** package manager

### Steps
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd vocabulary-frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Configure environment variables:
   Create a `.env` file in the root directory and populate it with required environment variables. Use `.env.example` as a reference if available.

4. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open the application in your browser at `http://localhost:3000`.

---

## Scripts
- **`dev`**: Starts the development server.
- **`build`**: Builds the application for production.
- **`start`**: Starts the production server.
- **`lint`**: Lints the codebase for errors.

---

## Tech Stack
- **Frontend**: Next.js, TypeScript, shadcn/ui
- **Styling**: Tailwind CSS
- **Authentication**: Custom implementation with `AuthProvider`
- **State Management**: Context API

---

## Contributing
1. Fork the repository.
2. Create a new branch for your feature/fix:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add new feature"
   ```
4. Push the branch:
   ```bash
   git push origin feature-name
   ```
5. Open a pull request.

---

## License
This project is licensed under the MIT License. See the `LICENSE` file for more details.

---

## Contact
For any inquiries or support, please reach out to the maintainer via [email@example.com].
