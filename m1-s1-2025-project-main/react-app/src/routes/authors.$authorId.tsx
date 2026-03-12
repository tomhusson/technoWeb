import { createFileRoute } from '@tanstack/react-router'
import { AuthorDetailPage } from '../authors/pages/AuthorDetailPage'

export const Route = createFileRoute('/authors/$authorId')({
  component: function AuthorDetailRoute() {
    const { authorId } = Route.useParams()
    return <AuthorDetailPage authorId={authorId} />
  },
})