import React, { useState } from 'react';
import { Row, Col, Grid } from 'antd';
import GamesSection from './gamesSection';
import MustPlaySection from './mustPlaySection';
import HorizontalScroller from './horizontalScroller';
import { data } from './data';

const { useBreakpoint } = Grid;

const LandingPage = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const screens = useBreakpoint();
  const isMobile = !screens.md;

  const handleCategoryClick = (categoryId) => {
    setActiveCategory(categoryId);
  };

  return (
    <div >
          <HorizontalScroller
            categories={data.categories}
            activeCategory={activeCategory}
            onCategoryClick={handleCategoryClick}
          />

          <div style={{ marginTop: 24 }}>
            <GamesSection games={data.games} />
          </div>

          <div style={{ marginTop: 40 }}>
            <MustPlaySection must_play={data.must_play} />
          </div>
    </div>
  );
};

export default LandingPage;
