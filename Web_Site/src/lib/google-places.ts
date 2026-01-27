import { unstable_cache } from "next/cache";

export interface GoogleReview {
  author_name: string;
  author_url?: string;
  profile_photo_url?: string;
  rating: number;
  relative_time_description: string;
  text: string;
  time: number;
}

export interface PlaceDetails {
  name: string;
  rating: number;
  user_ratings_total: number;
  reviews: GoogleReview[];
  url: string;
}

interface PlacesAPIResponse {
  result?: {
    name: string;
    rating: number;
    user_ratings_total: number;
    reviews?: GoogleReview[];
    url: string;
  };
  status: string;
  error_message?: string;
}

async function fetchPlaceDetails(): Promise<PlaceDetails | null> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;

  if (!apiKey || !placeId) {
    console.warn("Google Places API key or Place ID not configured");
    return null;
  }

  const url = new URL("https://maps.googleapis.com/maps/api/place/details/json");
  url.searchParams.set("place_id", placeId);
  url.searchParams.set("fields", "name,rating,user_ratings_total,reviews,url");
  url.searchParams.set("reviews_sort", "newest");
  url.searchParams.set("key", apiKey);

  try {
    const response = await fetch(url.toString(), {
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    const data: PlacesAPIResponse = await response.json();

    if (data.status !== "OK") {
      throw new Error(data.error_message || `API error: ${data.status}`);
    }

    if (!data.result) {
      return null;
    }

    return {
      name: data.result.name,
      rating: data.result.rating,
      user_ratings_total: data.result.user_ratings_total,
      reviews: data.result.reviews || [],
      url: data.result.url,
    };
  } catch (error) {
    console.error("Failed to fetch Google Places data:", error);
    return null;
  }
}

export const getGoogleReviews = unstable_cache(
  async () => fetchPlaceDetails(),
  ["google-reviews"],
  { revalidate: 3600, tags: ["google-reviews"] }
);
