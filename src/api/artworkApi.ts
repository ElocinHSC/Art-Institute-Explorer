import { ArtworkApiResponseSchema } from "../schemas/artworkApiResponse";

export async function searchArtworks(searchTerm: string) {
  const params = new URLSearchParams({
    q: searchTerm,
    limit: "12",
    has_image: "1",
    fields: "id,title,creators,images",
  });

  const response = await fetch(
    `https://openaccess-api.clevelandart.org/api/artworks/?${params}`,
  );

  if (!response.ok) {
    throw new Error(`HTTP error: ${response.status}`);
  }

  const jsonData: unknown = await response.json();
  const validationResult = ArtworkApiResponseSchema.safeParse(jsonData);

  if (!validationResult.success) {
    console.error(validationResult.error.issues);
    throw new Error("Die API-Antwort hat ein unerwartetes Format.");
  }

  return validationResult.data;
}
