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
      style={{ background: '#fff' }}
    >
      <div className="logo" />
      <SimpleBar style={{ height: '100%' }}>
        <Menu
          mode="inline"
          defaultOpenKeys={['sports']}
          style={{ height: '100%' }}
        >
          <SubMenu key="sports" title="Sports">
            <Menu.Item key="1" icon={<FileTextOutlined />}>
              <a href="/my-bets">My Bets</a>
            </Menu.Item>
            <Menu.Item key="2" icon={<FireOutlined />}>
              <a href="/boosted-odds">Boosted Odds</a>
            </Menu.Item>
            <Menu.Item key="3" icon={<UserOutlined />}>
              <a href="/player-to-score">Player to Score</a>
            </Menu.Item>
            <Menu.Item key="4" icon={<PlayCircleOutlined />}>
              <a href="/sports">Sports</a>
            </Menu.Item>
            <Menu.Item key="5" icon={<VideoCameraOutlined />}>
              <a href="/sports/live">Live Games</a>
            </Menu.Item>
          </SubMenu>
        </Menu>
      </SimpleBar>
    </Sider>
  );
};

export default Sidebar;
