import type { SubmitEvent } from "react";
import type { Artwork } from "../schemas/artwork";
import ArtworkCard from "./ArtworkCard";

type SearchViewProps = {
  artworks: Artwork[];
  searchTerm: string;
  isLoading: boolean;
  errorMessage: string | null;
  onSearch: (event: SubmitEvent<HTMLFormElement>) => void;
  onSearchTermChange: (value: string) => void;
  onSave: (artwork: Artwork) => void;
  isSaved: (artworkId: number) => boolean;
};

function SearchView({
  artworks,
  searchTerm,
  isLoading,
  errorMessage,
  onSearch,
  onSearchTermChange,
  onSave,
  isSaved,
}: SearchViewProps) {
  return (
    <main>
      <section className="hero-section">
        <p className="eyebrow">THE ART INSTITUTE OF CHICAGO</p>
        <h1>
          Art is everywhere.
          <br />
          <em>Find what moves you.</em>
        </h1>
        <p className="hero-copy">
          Explore remarkable artworks, discover new perspectives, and build your own personal collection.
        </p>

        <form className="search-form" onSubmit={onSearch}>
          <label className="sr-only" htmlFor="art-search">
            Search the collection
          </label>
          <input
            id="art-search"
            value={searchTerm}
            onChange={(event) => onSearchTermChange(event.target.value)}
            placeholder="Search artists, artworks, ideas..."
          />
          <button className="primary-button" type="submit" disabled={isLoading}>
            {isLoading ? "Searching..." : "Search"}
          </button>
        </form>
      </section>

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <section className="collection-section">
        {!isLoading && artworks.length === 0 && searchTerm.trim() !== "" && (
          <p className="empty-state">No artworks found. Try another search.</p>
        )}

        {isLoading && (
          <p className="loading-state">Finding something worth looking at...</p>
        )}

        <div className="artwork-grid">
          {artworks.map((artwork) => (
            <ArtworkCard
              key={artwork.id}
              artwork={artwork}
              onSave={onSave}
              isSaved={isSaved(artwork.id)}
            />
          ))}
        </div>
      </section>
    </main>
  );
}

export default SearchView;
