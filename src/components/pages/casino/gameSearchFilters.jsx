import React, { useState } from 'react';
import { Input, Space, Tag } from 'antd';
import {
  FireOutlined,
  RocketOutlined,
  CrownOutlined,
  DollarOutlined,
  ThunderboltOutlined,
} from '@ant-design/icons';

const baseCategories = [
  { label: 'Lobby', icon: null }, // No icon for Lobby when inactive, only label
  { label: 'Popular', icon: <FireOutlined /> },
  { label: 'Drops and Wins', icon: <DollarOutlined /> },
  { label: 'Slots', icon: <CrownOutlined /> },
  { label: 'Hot', icon: <ThunderboltOutlined /> },
  { label: 'Crash Games', icon: <RocketOutlined /> },
  { label: 'Live Roulette', icon: null },
  { label: 'Live Blackjack', icon: null },
  { label: 'Live Games', icon: null },
  { label: 'New Games', icon: null },
];

const GameSearchFilters = ({ onSearch, onFilterChange }) => {
  const [activeCategory, setActiveCategory] = useState('Lobby');

  const handleCategoryClick = (label) => {
    setActiveCategory(label);
    onFilterChange(label);
  };

  return (
    <div className="search-filter-section" style={{ marginBottom: '1.5rem' }}>
      <Input.Search
        placeholder="Search your game"
        onSearch={onSearch}
        style={{ marginBottom: '1rem' }}
        allowClear
      />
      <Space wrap>
        {baseCategories.map((cat) => {
          const isActive = activeCategory === cat.label;

          return (
            <Tag
              key={cat.label}
              style={{
                cursor: 'pointer',
                fontWeight: 500,
                padding: '6px 12px',
                borderRadius: '20px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
              onClick={() => handleCategoryClick(cat.label)}
            >
              {isActive ? (
                <>
                  {/* Active: show green Tag with label */}
                  <Tag color="success">{cat.label}</Tag>
                  {/* Also show label next to it */}
                  <span>{cat.label}</span>
                </>
              ) : (
                <>
                  {/* Inactive: show icon (if any) then label */}
                  {cat.icon && <span>{cat.icon}</span>}
                  <span>{cat.label}</span>
                </>
              )}
            </Tag>
          );
        })}
      </Space>
    </div>
  );
};

export default GameSearchFilters;
