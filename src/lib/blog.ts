import fs from 'fs';
import path from 'path';

const contentDirectory = path.join(process.cwd(), 'content/blog');

export interface BlogPost {
    slug: string;
    title: string;
    date: string;
    excerpt: string;
    content: string;
    type?: 'blog' | 'wiki' | 'faq' | 'case-study';
    scientific_name?: string;
    danger_level?: string;
    neighborhood?: string;
}

export function getBlogPosts(): BlogPost[] {
    if (!fs.existsSync(contentDirectory)) return [];

    const fileNames = fs.readdirSync(contentDirectory);
    const allPostsData = fileNames.map((fileName) => {
        const slug = fileName.replace(/\.md$/, '');
        const fullPath = path.join(contentDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');

        // Simple manual parsing to avoid heavy dependencies for this demo
        // Assumes format:
        // ---
        // title: ...
        // description: ...
        // dates: ...
        // ---
        // Content...

        const titleMatch = fileContents.match(/title: (.*)/);
        const dateMatch = fileContents.match(/dates: (.*)/);
        const descMatch = fileContents.match(/description: (.*)/);

        // Remove frontmatter
        const content = fileContents.replace(/---[\s\S]*?---/, '').trim();

        return {
            slug,
            title: titleMatch ? titleMatch[1] : slug,
            date: dateMatch ? dateMatch[1] : new Date().toISOString(),
            excerpt: descMatch ? descMatch[1] : content.substring(0, 150) + '...',
            content
        };
    });

    return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getBlogPost(slug: string): BlogPost | null {
    try {
        const fullPath = path.join(contentDirectory, `${slug}.md`);
        const fileContents = fs.readFileSync(fullPath, 'utf8');

        const titleMatch = fileContents.match(/title: (.*)/);
        const dateMatch = fileContents.match(/dates: (.*)/);
        const descMatch = fileContents.match(/description: (.*)/);
        const typeMatch = fileContents.match(/type: (.*)/);
        const scientificMatch = fileContents.match(/scientific_name: (.*)/);
        const dangerMatch = fileContents.match(/danger_level: (.*)/);
        const neighborhoodMatch = fileContents.match(/neighborhood: (.*)/);

        const content = fileContents.replace(/---[\s\S]*?---/, '').trim();

        return {
            slug,
            title: titleMatch ? titleMatch[1] : slug,
            date: dateMatch ? dateMatch[1] : new Date().toISOString(),
            excerpt: descMatch ? descMatch[1] : '',
            type: typeMatch ? typeMatch[1] : 'blog',
            scientific_name: scientificMatch ? scientificMatch[1] : null,
            danger_level: dangerMatch ? dangerMatch[1] : null,
            neighborhood: neighborhoodMatch ? neighborhoodMatch[1] : null,
            content
        };
    } catch (err) {
        return null;
    }
}
