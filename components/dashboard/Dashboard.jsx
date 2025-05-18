import React from 'react';
import styled from 'styled-components';
import { MoneyCollectOutlined, HomeOutlined, DollarOutlined } from '@ant-design/icons';
import MainCard from './MainCard';
import MetricCard from './MetricCard';
import ReviewCard from './ReviewCard';

const DashboardContainer = styled.div`
  padding: 24px;
  position: relative;
`;

const CardContainer = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
`;

const Dashboard = () => {
  const metrics = [
    {
      title: '总营收',
      value: '128.5',
      change: 5.2,
      icon: MoneyCollectOutlined,
      suffix: '万',
    },
    {
      title: '入住率',
      value: '85.3',
      change: -2.1,
      icon: HomeOutlined,
      suffix: '%',
    },
    {
      title: '平均房价',
      value: '688',
      change: 3.8,
      icon: DollarOutlined,
      suffix: '元',
    },
  ];

  return (
    <DashboardContainer>
      <CardContainer>
        <MainCard />
        {metrics.map((metric, index) => (
          <MetricCard key={index} {...metric} />
        ))}
      </CardContainer>
      <ReviewCard />
    </DashboardContainer>
  );
};

export default Dashboard; 