import { createRootRoute, Outlet } from '@tanstack/react-router'
import { Layout } from '../Layout'

export const Route = createRootRoute({
  component: () => (
    <Layout>
      <Outlet />
    </Layout>
  ),
})