# Art Explorer

Art Explorer is a small React and TypeScript application for discovering artworks and building a personal collection.

Users can search the Cleveland Museum of Art Open Access collection, save artworks to a personal gallery, and add, edit, or delete notes. Saved artworks are persisted in the browser with `localStorage`.

## Features

- Search artworks through the Cleveland Museum of Art Open Access API
- Validate external API data at runtime with Zod
- Transform API responses into an application-specific artwork model
- Display responsive artwork cards with image fallbacks
- Save artworks to a personal gallery without duplicates
- Add, edit, and delete personal notes
- Validate notes with a maximum length of 500 characters
- Restore and validate saved gallery data from `localStorage`
- Responsive editorial-style interface for desktop, tablet, and mobile

## Tech stack

- React
- TypeScript
- Vite
- Zod
- Fetch API
- `localStorage`
- CSS with custom properties

No UI framework or routing library is required. The application switches between Discover and My Gallery using React state.

## Getting started

Requirements: Node.js and npm.

```bash
npm install
npm run dev
```

The development server will print the local URL in the terminal.

## Available scripts

```bash
npm run dev       # Start the development server
npm run build     # Type-check and create a production build
npm run lint      # Run Oxlint
npm run preview   # Preview the production build locally
```

## Data flow and validation

The API response is treated as untrusted input. It is not copied directly into React state.

```text
Cleveland API response
        ↓
ArtworkApiResponseSchema.safeParse()
        ↓
transform API fields into the app model
        ↓
validated Artwork data
        ↓
React state and ArtworkCard
```

The external API uses fields such as `creators` and `images.web.url`. The application transforms them into the simpler internal model:

```ts
type Artwork = {
  id: number;
  title: string | null;
  artist: string | null;
  imageUrl: string | null;
};
```

Gallery data is validated again when it is read from `localStorage`. This matters because browser storage can be changed, corrupted, or contain data from an older version of the application.

## Project structure

```text
src/
├── api/
│   └── artworkApi.ts             API request and response validation
├── components/
│   └── ArtworkCard.tsx           Artwork display and note actions
├── schemas/
│   ├── artwork.ts                Artwork, note, and gallery schemas
│   └── artworkApiResponse.ts     Cleveland API response schema
├── App.tsx                       Search, gallery, and application state
├── index.css                     Design tokens and responsive styles
└── main.tsx                      React entry point
```

## Learning focus

This project was built as a practical exercise in runtime validation with Zod. It demonstrates:

- the difference between TypeScript types and runtime schemas
- deriving types with `z.infer`
- using `safeParse()` for external data
- validating API responses and browser storage
- transforming an external data shape into an application model
- keeping React state and `localStorage` synchronized

## Design

The interface follows a quiet editorial direction inspired by digital art publications. Artwork remains the visual focus, with warm neutrals, restrained accent colors, serif display typography, generous spacing, responsive grids, and accessible focus states.
