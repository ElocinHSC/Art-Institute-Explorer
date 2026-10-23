import { z } from "zod";

export const ArtworkSchema = z.object({
  id: z.number(),
  title: z.string().nullable(),
  artist: z.string().nullable(),
  imageUrl: z.string().nullable(),
});

export const NoteSchema = z
  .string()
  .max(500, "Notes can contain up to 500 characters.");

export const SavedArtworkSchema = ArtworkSchema.extend({
  note: NoteSchema.default(""),
});

export const SavedArtworksSchema = z.array(SavedArtworkSchema);

export type Note = z.infer<typeof NoteSchema>;
export type SavedArtwork = z.infer<typeof SavedArtworkSchema>;

export type Artwork = z.infer<typeof ArtworkSchema>;
