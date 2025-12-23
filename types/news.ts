
export interface NewsArticle {
    id: string;
    title: string;
    description?: string;
    image: string;
    tags: string[];
    readTime: string;
    date: string; // ISO date for sorting
    author?: {
        name: string;
        avatar: string;
    };
    publishedAt?: string; // Formatted date string
}
