import { OrganizationType } from "./organization";
import { RepositoryType } from "./repository";

export interface UserType {
  repositories?: RepositoryType[];
  organizations?: OrganizationType[];
  name?: string;
  login?: string;
  avatarUrl?: string;
  bio?: string;
  location?: string;
}
