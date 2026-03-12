import { Link, useRouterState } from '@tanstack/react-router'
import { Layout as AntLayout, Menu, type MenuProps } from 'antd'
import {
  BookOutlined,
  HomeOutlined,
  UserOutlined,
  TeamOutlined,
} from '@ant-design/icons'

interface LayoutProps {
  children: React.ReactNode
}

export function Layout({ children }: LayoutProps) {
  const routerState = useRouterState()
  const currentPath = routerState.location.pathname

  const selectedKey = currentPath.startsWith('/books')
    ? 'books'
    : currentPath.startsWith('/authors')
      ? 'authors'
      : currentPath.startsWith('/clients')
        ? 'clients'
        : 'home'

  const items: Required<MenuProps>['items'] = [
    {
      label: <Link to="/">Home</Link>,
      key: 'home',
      icon: <HomeOutlined />,
    },
    {
      label: <Link to="/books">Books</Link>,
      key: 'books',
      icon: <BookOutlined />,
    },
    {
      label: <Link to="/authors">Authors</Link>,
      key: 'authors',
      icon: <UserOutlined />,
    },
    {
      label: <Link to="/clients">Clients</Link>,
      key: 'clients',
      icon: <TeamOutlined />,
    },
  ]

  return (
    <AntLayout style={{ minHeight: '100vh' }}>
      <AntLayout.Header style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
        <h2 style={{ color: 'white', margin: 0 }}>Babel&apos;s Library</h2>
        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={[selectedKey]}
          items={items}
          style={{ flex: 1 }}
        />
      </AntLayout.Header>
      <AntLayout.Content style={{ padding: '24px' }}>
        {children}
      </AntLayout.Content>
    </AntLayout>
  )
}