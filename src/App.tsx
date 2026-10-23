import { useEffect, useState, type SubmitEvent } from "react";
import { searchArtworks } from "./api/artworkApi";
import {
  SavedArtworksSchema,
  type Artwork,
  type SavedArtwork,
} from "./schemas/artwork";
import GalleryView from "./components/GalleryView";
import Navigation from "./components/Navigation";
import SearchView from "./components/SearchView";

function App() {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [activeView, setActiveView] = useState<"search" | "gallery">("search");
  const [savedArtworks, setSavedArtworks] = useState<SavedArtwork[]>(() => {
    const storedArtworks = localStorage.getItem("saved-artworks");

    if (!storedArtworks) {
      return [];
    }

    try {
      const parsedData: unknown = JSON.parse(storedArtworks);
      const validationResult = SavedArtworksSchema.safeParse(parsedData);

      if (!validationResult.success) {
        console.error(validationResult.error.issues);
        return [];
      }

      return validationResult.data;
    } catch (error) {
      console.error("Could not load saved gallery:", error);
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("saved-artworks", JSON.stringify(savedArtworks));
  }, [savedArtworks]);

  async function handleSearch(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    if (searchTerm.trim() === "") {
      setErrorMessage("Please enter a search term.");
      setArtworks([]);
      return;
    }

    try {
      setIsLoading(true);
      setErrorMessage(null);

      const result = await searchArtworks(searchTerm.trim());
      setArtworks(result.data);
    } catch (error) {
      console.error(error);
      setArtworks([]);

      if (error instanceof TypeError) {
        setErrorMessage("The artwork service could not be reached. Please try again.");
      } else if (error instanceof Error && error.message.startsWith("HTTP error")) {
        setErrorMessage("The artwork service is temporarily unavailable. Please try again later.");
      } else {
        setErrorMessage("Something went wrong while searching. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  }

  function handleSaveArtwork(artwork: Artwork) {
    setSavedArtworks((currentArtworks) => {
      const alreadySaved = currentArtworks.some(
        (savedArtwork) => savedArtwork.id === artwork.id,
      );

      if (alreadySaved) {
        return currentArtworks;
      }

      return [...currentArtworks, { ...artwork, note: "" }];
    });
  }

  function handleRemoveArtwork(artworkId: number) {
    setSavedArtworks((currentArtworks) =>
      currentArtworks.filter((artwork) => artwork.id !== artworkId),
    );
  }

  function handleUpdateNote(artworkId: number, note: string) {
    setSavedArtworks((currentArtworks) =>
      currentArtworks.map((artwork) =>
        artwork.id === artworkId ? { ...artwork, note } : artwork,
      ),
    );
  }

  function isArtworkSaved(artworkId: number) {
    return savedArtworks.some((artwork) => artwork.id === artworkId);
  }

  return (
    <div className="app-shell">
      <Navigation
        activeView={activeView}
        galleryCount={savedArtworks.length}
        onChangeView={setActiveView}
      />

      {activeView === "search" ? (
        <SearchView
          artworks={artworks}
          searchTerm={searchTerm}
          isLoading={isLoading}
          errorMessage={errorMessage}
          onSearch={handleSearch}
          onSearchTermChange={setSearchTerm}
          onSave={handleSaveArtwork}
          isSaved={isArtworkSaved}
        />
      ) : (
        <GalleryView
          savedArtworks={savedArtworks}
          onRemove={handleRemoveArtwork}
          onUpdateNote={handleUpdateNote}
          onDiscover={() => setActiveView("search")}
        />
      )}
    </div>
  );
}

export default App;
