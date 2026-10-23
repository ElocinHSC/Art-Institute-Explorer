import type { SavedArtwork } from "../schemas/artwork";
import ArtworkCard from "./ArtworkCard";

type GalleryViewProps = {
  savedArtworks: SavedArtwork[];
  onRemove: (artworkId: number) => void;
  onUpdateNote: (artworkId: number, note: string) => void;
  onDiscover: () => void;
};

function GalleryView({
  savedArtworks,
  onRemove,
  onUpdateNote,
  onDiscover,
}: GalleryViewProps) {
  return (
    <main className="gallery-page">
      <section className="gallery-intro">
        <p className="eyebrow">YOUR PERSONAL COLLECTION</p>
        <h1>Your collection</h1>
        <p>A collection of art that speaks to you.</p>
      </section>

      {savedArtworks.length === 0 ? (
        <div className="empty-gallery">
          <p className="eyebrow">A QUIET SPACE</p>
          <h2>Your collection is waiting.</h2>
          <p>Save a work from Discover and it will appear here.</p>
          <button className="primary-button" onClick={onDiscover}>
            Discover artworks
          </button>
        </div>
      ) : (
        <div className="artwork-grid">
          {savedArtworks.map((artwork) => (
            <ArtworkCard
              key={artwork.id}
              artwork={artwork}
              onRemove={onRemove}
              onUpdateNote={onUpdateNote}
            />
          ))}
        </div>
      )}
    </main>
  );
}

export default GalleryView;
