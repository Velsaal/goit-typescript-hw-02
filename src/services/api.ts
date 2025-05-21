export interface Image {
  id: string;
  urls: {
    regular: string;
    small: string;
  };
  alt_description: string;
  description: string | null;
  likes: number;
  user: {
    name: string;
    location: string | null;
  };
}

export interface ApiResponse {
  total: number;
  total_pages: number;
  results: Image[];
}

const API_KEY = '6bdyTACu13hKOvccWzcTY5x1LvHrgyATCRjaJdkvb0o';
const BASE_URL = 'https://api.unsplash.com/search/photos';

export async function fetchImages(query: string, page: number): Promise<ApiResponse> {
  const params = new URLSearchParams({
    query,
    page: page.toString(),
    per_page: '12',
    client_id: API_KEY,
  });

  const response = await fetch(`${BASE_URL}?${params}`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch images');
  }

  return response.json();
} 