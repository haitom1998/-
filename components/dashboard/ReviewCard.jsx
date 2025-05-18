import React, { useState } from 'react';
import { Card, Typography } from 'antd';
import styled from 'styled-components';

const { Title } = Typography;

const StyledCard = styled(Card)`
  width: 246px;
  height: 586px;
  border-radius: 12px;
  background: #fff;
  border: 1px solid rgba(17, 25, 37, 0.15);
  
  .ant-card-body {
    padding: 0;
  }

  .card-title {
    font-size: 14px;
    font-weight: 600;
    color: #111925;
    margin: 16px 0 0 12px;
  }

  .perspective-title {
    font-size: 14px;
    font-weight: 600;
    color: #111925;
    margin: 36px 0 16px 12px;
  }
`;

const DividerWrapper = styled.div`
  padding: 0 12px;
  margin: 24px 0;
`;

const Divider = styled.div`
  height: 1px;
  width: 100%;
  background: rgba(17, 25, 37, 0.07);
`;

const DonutChart = styled.div`
  position: relative;
  width: 182px;
  height: 182px;
  margin: 24px auto;
  
  .segment {
    position: absolute;
    width: 100%;
    height: 100%;
    clip-path: path('M 91 91 L 91 0 A 91 91 0 0 1 182 91 Z');
    transition: transform 0.3s ease;
    border-radius: 4px;
    
    &:hover {
      transform: scale(1.03);
    }
  }

  .inner-circle {
    position: absolute;
    width: 126px;
    height: 126px;
    background: white;
    border-radius: 50%;
    top: 28px;
    left: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }

  .score {
    font-size: 24px;
    font-weight: 600;
    color: #111925;
  }

  .label {
    font-size: 14px;
    color: rgba(17, 25, 37, 0.65);
    margin-top: 4px;
  }
`;

const BarWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 0 12px;
  gap: 8px;
  margin-bottom: 26px;
  
  &:last-child {
    margin-bottom: 0;
  }

  .age-range {
    font-size: 14px;
    color: #111925;
    white-space: nowrap;
  }

  .score-value {
    font-size: 14px;
    color: #111925;
    white-space: nowrap;
  }
`;

const StackedBar = styled.div`
  margin: 7px 0;
  height: 10px;
  flex: 1;
  border-radius: 1px;
  display: flex;
  gap: 1px;
  background: rgba(17, 25, 37, 0.05);
  overflow: visible;
  position: relative;

  .bar-segment {
    height: 100%;
    transition: all 0.3s ease;
    position: relative;
    cursor: pointer;

    &:hover {
      transform: scale(1.03);
      z-index: 1;
    }
  }

  .tooltip {
    position: absolute;
    background: rgba(0, 0, 0, 0.75);
    color: white;
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 12px;
    white-space: nowrap;
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.2s;
    z-index: 2;
    transform: translateY(-100%);
    top: -8px;
  }

  .tooltip.visible {
    opacity: 1;
  }
`;

const ReviewCard = () => {
  const [score] = useState(4.2);
  const [tooltipContent, setTooltipContent] = useState('');
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [distribution] = useState({
    5: 45,
    4: 30,
    3: 15,
    2: 7,
    1: 3
  });

  const getSegmentColor = (rating) => {
    switch(rating) {
      case 5: return '#ffd100';
      case 4: return '#ffef8a';
      case 3: return 'rgba(17, 25, 37, 0.15)';
      case 2: return 'rgba(17, 25, 37, 0.45)';
      case 1: return '#111925';
      default: return '#111925';
    }
  };

  return (
    <StyledCard>
      <Title className="card-title">客户评价</Title>
      
      <DonutChart>
        {Object.entries(distribution).map(([rating, percentage], index) => (
          <div
            key={rating}
            className="segment"
            style={{
              background: getSegmentColor(Number(rating)),
              transform: `rotate(${index * 72}deg)`,
              clipPath: `path('M 91 91 L 91 0 A 91 91 0 0 1 ${91 + 91 * Math.cos(72 * Math.PI / 180)} ${91 - 91 * Math.sin(72 * Math.PI / 180)} Z')`
            }}
          />
        ))}
        <div className="inner-circle">
          <span className="score">{score}</span>
          <span className="label">总体评分</span>
        </div>
      </DonutChart>

      <DividerWrapper>
        <Divider />
      </DividerWrapper>

      <Title className="perspective-title">分层透视</Title>
      {[
        { range: '0-18岁', score: 3.12 },
        { range: '18-30岁', score: 4.31 },
        { range: '30-45岁', score: 3.08 },
        { range: '45-60岁', score: 3.12 },
        { range: '60岁以上', score: 2.88 }
      ].map(item => (
        <BarWrapper key={item.range}>
          <span className="age-range">{item.range}</span>
          <StackedBar>
            {Object.entries(distribution).reverse().map(([rating, percentage]) => (
              <div
                key={rating}
                className="bar-segment"
                style={{
                  width: `${percentage}%`,
                  background: getSegmentColor(Number(rating))
                }}
                onMouseEnter={(e) => {
                  const rect = e.target.getBoundingClientRect();
                  setTooltipContent(`${rating}分: ${percentage}%`);
                  setTooltipPosition({
                    x: rect.left + (rect.width / 2),
                    y: rect.top
                  });
                  setTooltipVisible(true);
                }}
                onMouseLeave={() => {
                  setTooltipVisible(false);
                }}
              />
            ))}
            <div 
              className={`tooltip ${tooltipVisible ? 'visible' : ''}`}
              style={{
                left: tooltipPosition.x - 50,
                top: tooltipPosition.y - 30
              }}
            >
              {tooltipContent}
            </div>
          </StackedBar>
          <span className="score-value">{item.score}</span>
        </BarWrapper>
      ))}
    </StyledCard>
  );
};

export default ReviewCard; 