import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
import { Layout, Menu } from 'antd'

export const Route = createRootRoute({
  component: () => (
    <Layout style={{ minHeight: '100vh' }}>
      <Layout.Header>
        <Menu theme="dark" mode="horizontal">
          <Menu.Item key="1"><Link to="/">Accueil</Link></Menu.Item>
          <Menu.Item key="2"><Link to="/customers">Clients</Link></Menu.Item>
        </Menu>
      </Layout.Header>
      <Layout.Content style={{ padding: '24px' }}>
        <Outlet /> {/* Les pages s'affichent ici */}
      </Layout.Content>
    </Layout>
  ),
})