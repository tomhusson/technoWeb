import { createFileRoute } from '@tanstack/react-router'
import { ClientDetailPage } from '../clients/pages/ClientDetailPage'

export const Route = createFileRoute('/clients/$clientId')({
  component: function ClientDetailRoute() {
    const { clientId } = Route.useParams()
    return <ClientDetailPage clientId={Number(clientId)} />
  },
})