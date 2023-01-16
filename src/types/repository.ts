export interface RepositoryType {
  name: string;
  isPrivate: boolean;
  createdAt: string;
  updatedAt: string;
  languages: LanguageType[] & {
    size: string;
    totalCount: string | number;
    totalSize: string | number;
  };
}

export interface LanguageType {
  color: string;
  name: string;
}
