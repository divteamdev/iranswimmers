export interface Category {
  id: number
  name: string
  slug: string
  children: Category[]
  description?: string
  posts_count?: number
  image?: string | null
} 