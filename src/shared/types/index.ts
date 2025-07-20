export interface Font {
  id: string;
  name: string;
  filename: string;
  file_path?: string;
  file_size?: number;
  uploaded_at: string;
  created_at: string;
  updated_at: string;
}

export interface FontGroup {
  id: string;
  name: string;
  description?: string;
  fonts: Font[];
  created_at: string;
  updated_at: string;
}

export interface Author {
  name: string;
  birth_year: number | null;
  death_year: number | null;
}

export interface Book {
  id: number;
  title: string;
  authors: Author[];
  subjects: string[];
  languages: string[];
  download_count: number;
  formats: Record<string, string>;
}