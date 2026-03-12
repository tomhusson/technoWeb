import { AuthorDetails } from '../components/AuthorDetails'

interface AuthorDetailPageProps {
  authorId: string
}

export function AuthorDetailPage({ authorId }: AuthorDetailPageProps) {
  return <AuthorDetails authorId={authorId} />
}