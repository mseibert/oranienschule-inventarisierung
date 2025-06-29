# Inventarisierung der Oranienschule

## Setup

### Umgebungsvariablen

Erstelle eine `.env` Datei im Root-Verzeichnis des Projekts mit folgendem Inhalt:

```env
# Seatable API Configuration
SEATABLE_API_TOKEN=your_token_here
```

**Wichtig:** Ersetze `your_token_here` mit deinem tatsächlichen Seatable API Token.

### Installation

```bash
pnpm install
```

## Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
│   └── favicon.svg
├── src/
│   ├── layouts/
│   │   └── Layout.astro
│   └── pages/
│       └── index.astro
└── package.json
```

## Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `pnpm install`             | Installs dependencies                            |
| `pnpm dev`             | Starts local dev server at `localhost:4321`      |
| `pnpm build`           | Build your production site to `./dist/`          |
| `pnpm preview`         | Preview your build locally, before deploying     |
| `pnpm astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `pnpm astro -- --help` | Get help using the Astro CLI                     |
