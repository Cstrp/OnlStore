export interface RootObject {
  pagination: Pagination;
  data: Datum[];
}

export interface Datum {
  end_date: number;
  start_date: number;
  image_url: any;
  mal_id: number;
  url: string;
  images: Images;
  title: string;
  title_english?: string;
  title_japanese: string;
  title_synonyms: string[];
  type: string;
  chapters?: number;
  volumes?: number;
  status: string;
  publishing: boolean;
  published: Published;
  score: number;
  scored: number;
  scored_by: number;
  rank: number;
  popularity: number;
  members: number;
  favorites: number;
  synopsis: string;
  background: string;
  authors: Author[];
  serializations: Author[];
  genres: Author[];
  explicit_genres: any[];
  themes: Author[];
  demographics: Author[];
}

export interface Author {
  mal_id: number;
  type: string;
  name: string;
  url: string;
}

export interface Published {
  from: string;
  to?: string;
  prop: Prop;
  string: string;
}

export interface Prop {
  from: From;
  to: To;
}

export interface To {
  day?: number;
  month?: number;
  year?: number;
}

export interface From {
  day: number;
  month: number;
  year: number;
}

export interface Images {
  jpg: Jpg;
  webp: Jpg;
}

export interface Jpg {
  image_url: string;
  small_image_url: string;
  large_image_url: string;
}

export interface Pagination {
  last_visible_page: number;
  has_next_page: boolean;
  current_page: number;
  items: Items;
}

export interface Items {
  count: number;
  total: number;
  per_page: number;
}
