import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

function determinePagination(total: number, page: number, page_size: number) {
    if (total <= 0 || page <= 0) {
        // No pages available if total is 0 or negative or page number is invalid
        return { hasNextPage: false, hasPrevPage: false };
    }

    const totalPages = Math.ceil(total / page_size); // Total number of pages
    const hasPrevPage = page > 1 && page <= totalPages;
    const hasNextPage = page < totalPages;

    return { hasNextPage, hasPrevPage };
}
export { cn, determinePagination } 