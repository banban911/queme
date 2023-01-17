export interface LanguageNode {
    color?: string;
    name?: string;
}

export interface LanguageEdge {
    size?: string | number
}

export interface FollowerNode {
    id?: string;
    login?: string
}

export interface FollowingNode {
    id?: string;
    login?: string
}

export interface RepositoryTopicNode {
    topic: {
        name: string;
    },
    url: string
}

export interface OrganizationNode {
    avatarUrl?: string;
    name?: string;
}

export interface LanguageType {
    nodes?: LanguageNode[];
    edges?: LanguageEdge[];
    totalCount?: number;
    totalSize?: number
}

export interface RepositoryNode {
    owner?: {
        login?: string
    },
    nameWithOwner?: string;
    name?: string;
    description?: string;
    homepageUrl?: string;
    url?: string;
    isPrivate?: boolean;
    createdAt?: string;
    updatedAt?: string;
    stargazerCount?: number;
    repositoryTopics?: {
        nodes: RepositoryTopicNode[]
    }
    languages?: LanguageType
}


export interface UserType {
    repositories?: {
        totalCount?: number;
        pageInfo: {
            endCursor?: string;
            startCursor?: string;
            hasNextPage?: boolean;
            hasPreviousPage?: boolean;
        }
        nodes?: RepositoryNode[]
    };
    organizations?: {
        nodes: OrganizationNode[];
    }

    followers?: {
        nodes?: FollowerNode[]
    };
    following?: FollowingNode[]
    name?: string;
    login?: string;
    avatarUrl?: string;
    bio?: string;
    location?: string;
}
