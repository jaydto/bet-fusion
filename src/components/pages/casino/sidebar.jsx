import React from 'react';
import { Layout, Menu } from 'antd';
import {
  FileTextOutlined,
  FireOutlined,
  UserOutlined,
  PlayCircleOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';

const { Sider } = Layout;
const { SubMenu } = Menu;

const Sidebar = () => {
  return (
    <Sider
      width={300}
      style={{
        background: 'var(--jaza-bets-body-bg)',
        color: 'var(--light)',
        // height: '100vh',
      }}
    >
      {/* <div className="logo" /> */}
      <SimpleBar style={{ height: '100%', background: 'var(--jaza-bets-body-bg)', color: 'var(--light)' }}>
        <Menu
          mode="inline"
          defaultOpenKeys={['sports']}
          // style={{  background: 'var(--jaza-bets-body-bg)', color: 'var(--light)' }}
          theme="dark" // Optional: use "dark" for better built-in contrast
        >
          <SubMenu key="sports" title="Sports" style={{ color: 'var(--light)' }}>
            <Menu.Item key="1" icon={<FileTextOutlined />} style={{ color: 'var(--light)' }}>
              <a href="/my-bets" style={{ color: 'var(--light)' }}>My Bets</a>
            </Menu.Item>
            <Menu.Item key="2" icon={<FireOutlined />} style={{ color: 'var(--light)' }}>
              <a href="/boosted-odds" style={{ color: 'var(--light)' }}>Boosted Odds</a>
            </Menu.Item>
            <Menu.Item key="3" icon={<UserOutlined />} style={{ color: 'var(--light)' }}>
              <a href="/player-to-score" style={{ color: 'var(--light)' }}>Player to Score</a>
            </Menu.Item>
            <Menu.Item key="4" icon={<PlayCircleOutlined />} style={{ color: 'var(--light)' }}>
              <a href="/sports" style={{ color: 'var(--light)' }}>Sports</a>
            </Menu.Item>
            <Menu.Item key="5" icon={<VideoCameraOutlined />} style={{ color: 'var(--light)' }}>
              <a href="/sports/live" style={{ color: 'var(--light)' }}>Live Games</a>
            </Menu.Item>
          </SubMenu>
        </Menu>
      </SimpleBar>
    </Sider>
  );
};

export default Sidebar;
