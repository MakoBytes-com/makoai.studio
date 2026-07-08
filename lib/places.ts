// Google Places API (New) integration for live Mako Logics reviews.
// Cached 24 h via Next's fetch cache so we don't re-hit the API on
// every page load.

export type PlaceReview = {
  rating: number;
  relativePublishTimeDescription: string;
  publishTime: string;
  text: string;
  authorName: string;
  authorUri?: string;
  authorPhotoUri?: string;
};

export type PlaceData = {
  rating: number | null;
  userRatingCount: number | null;
  reviews: PlaceReview[];
  name: string | null;
};

type RawReview = {
  rating?: number;
  relativePublishTimeDescription?: string;
  publishTime?: string;
  text?: { text?: string; languageCode?: string };
  originalText?: { text?: string };
  authorAttribution?: {
    displayName?: string;
    uri?: string;
    photoUri?: string;
  };
};

type RawPlace = {
  displayName?: { text?: string };
  rating?: number;
  userRatingCount?: number;
  reviews?: RawReview[];
};

const ENDPOINT = "https://places.googleapis.com/v1/places";
const FIELD_MASK = "id,displayName,rating,userRatingCount,reviews";

export async function fetchPlaceReviews(): Promise<PlaceData | null> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY?.trim();
  const placeId = process.env.GOOGLE_PLACES_PLACE_ID?.trim();
  if (!apiKey || !placeId) return null;

  try {
    const res = await fetch(`${ENDPOINT}/${placeId}`, {
      headers: {
        "X-Goog-Api-Key": apiKey,
        "X-Goog-FieldMask": FIELD_MASK
      },
      next: { revalidate: 60 * 60 * 24 } // 24 hours
    });

    if (!res.ok) {
      console.error("[places] fetch failed", res.status, await res.text());
      return null;
    }

    const raw = (await res.json()) as RawPlace;

    // Keep the public surface on Mako Logics, not the individual owner —
    // drop reviews that name the founder directly. Word-boundary match so
    // innocent substrings (if any) can't false-match.
    const ownerNameRe = /\b(russell|sailors)\b/i;

    const reviews: PlaceReview[] = (raw.reviews ?? [])
      .filter(
        (r) =>
          r.rating &&
          r.text?.text &&
          r.authorAttribution?.displayName &&
          !ownerNameRe.test(r.text.text) &&
          !ownerNameRe.test(r.originalText?.text ?? "")
      )
      .map((r) => ({
        rating: r.rating ?? 0,
        relativePublishTimeDescription: r.relativePublishTimeDescription ?? "",
        publishTime: r.publishTime ?? "",
        text: r.text?.text ?? r.originalText?.text ?? "",
        authorName: r.authorAttribution?.displayName ?? "",
        authorUri: r.authorAttribution?.uri,
        authorPhotoUri: r.authorAttribution?.photoUri
      }));

    return {
      rating: raw.rating ?? null,
      userRatingCount: raw.userRatingCount ?? null,
      reviews,
      name: raw.displayName?.text ?? null
    };
  } catch (err) {
    console.error("[places] fetch threw", err);
    return null;
  }
}
