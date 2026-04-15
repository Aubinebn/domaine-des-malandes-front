export function getImageUrl(path: string): string 
{
        const baseUrl = import.meta.env.VITE_PUBLIC_URL;
        return `${baseUrl}${path}`;
}
