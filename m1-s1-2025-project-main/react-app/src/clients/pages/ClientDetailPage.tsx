import { ClientDetails } from '../components/ClientDetails'

interface ClientDetailPageProps {
  clientId: number
}

export function ClientDetailPage({ clientId }: ClientDetailPageProps) {
  return <ClientDetails clientId={clientId} />
}