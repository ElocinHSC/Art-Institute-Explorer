import {
  NoteSchema,
  type Artwork,
  type SavedArtwork,
} from "../schemas/artwork";
import { useState } from "react";

type ArtworkCardProps = {
  artwork: Artwork | SavedArtwork;
  onSave?: (artwork: Artwork) => void;
  isSaved?: boolean;
  onRemove?: (id: number) => void;
  onUpdateNote?: (id: number, note: string) => void;
};

function ArtworkCard({
  artwork,
  onSave,
  isSaved = false,
  onRemove,
  onUpdateNote,
}: ArtworkCardProps) {
  const currentNote = "note" in artwork ? artwork.note : "";

  const [noteInput, setNoteInput] = useState(currentNote);
  const [noteError, setNoteError] = useState<string | null>(null);
  const [isEditingNote, setIsEditingNote] = useState(false);

  function handleNoteSave() {
    const validationResult = NoteSchema.safeParse(noteInput);

    if (!validationResult.success) {
      setNoteError(validationResult.error.issues[0].message);
      return;
    }

    setNoteError(null);
    onUpdateNote?.(artwork.id, validationResult.data);
    setIsEditingNote(false);
  }

  function handleEditNote() {
    setNoteInput(currentNote);
    setNoteError(null);
    setIsEditingNote(true);
  }

  function handleCancelNoteEdit() {
    setNoteInput(currentNote);
    setNoteError(null);
    setIsEditingNote(false);
  }

  function handleDeleteNote() {
    setNoteInput("");
    setNoteError(null);
    onUpdateNote?.(artwork.id, "");
  }

  return (
    <article className="artwork-card">
      <div className="artwork-image-wrap">
        {artwork.imageUrl ? (
        <img
          src={artwork.imageUrl}
          alt={artwork.title ?? "Artwork"}
          className="artwork-image"
          loading="lazy"
        />
        ) : <div className="image-fallback">Image unavailable</div>}
      </div>

      <div className="artwork-details">
        <h3>{artwork.title ?? "Untitled"}</h3>
        <p className="artist-name">{artwork.artist ?? "Unknown artist"}</p>

        {onSave && (
          <button
            className={isSaved ? "text-button saved-button" : "text-button"}
            onClick={() => onSave(artwork)}
            disabled={isSaved}
          >
            {isSaved ? "Saved to gallery" : "Add to gallery"}
            {!isSaved && <span aria-hidden="true"> ↗</span>}
          </button>
        )}

        {onRemove && (
          <button className="text-button remove-button" onClick={() => onRemove(artwork.id)}>Remove from gallery</button>
        )}

        {"note" in artwork && (
          <div className="notes-area">
            <label>Your notes</label>

            {!isEditingNote ? (
              <>
                <p className={artwork.note ? "note-text" : "note-placeholder"}>
                  {artwork.note || "No note yet."}
                </p>
                <div className="note-actions">
                  <button className="secondary-button" onClick={handleEditNote}>
                    Edit
                  </button>
                  <button className="text-button remove-button" onClick={handleDeleteNote}>
                    Delete
                  </button>
                </div>
              </>
            ) : (
              <>
                <textarea
                  id={`note-${artwork.id}`}
                  value={noteInput}
                  onChange={(event) => setNoteInput(event.target.value)}
                  placeholder="What does this work make you feel?"
                  rows={3}
                  autoFocus
                />

                {noteError && <p className="note-error">{noteError}</p>}

                <div className="note-actions">
                  <button className="secondary-button" onClick={handleNoteSave}>
                    Save note
                  </button>
                  <button className="text-button" onClick={handleCancelNoteEdit}>
                    Cancel
                  </button>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </article>
  );
}

export default ArtworkCard;
