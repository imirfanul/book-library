export interface Font {
  id: string;
  name: string;
  filename: string;
  uploadedAt: Date;
}

export interface FontGroup {
  id: string;
  name: string;
  fonts: Font[];
  createdAt: Date;
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