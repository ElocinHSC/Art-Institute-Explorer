import { z } from "zod";

const ClevelandArtworkSchema = z
  .object({
    id: z.number(),
    title: z.string().nullable(),
    creators: z
      .array(z.object({ description: z.string().nullable() }))
      .default([]),
    images: z
      .object({
        web: z.object({ url: z.url() }).nullable().optional(),
      })
      .nullable()
      .optional(),
  })
  .transform((raw) => ({
    id: raw.id,
    title: raw.title,
    artist: raw.creators[0]?.description ?? null,
    imageUrl: raw.images?.web?.url ?? null,
  }));

export const ArtworkApiResponseSchema = z.object({
  info: z.object({ total: z.number() }),
  data: z.array(ClevelandArtworkSchema),
});
