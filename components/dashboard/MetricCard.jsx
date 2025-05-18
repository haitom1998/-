import React from 'react';
import { Card, Typography, Button, Dropdown } from 'antd';
import { MoreOutlined, ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import styled from 'styled-components';

const { Title, Text } = Typography;

const StyledCard = styled(Card)`
  width: 200px;
  height: 192px;
  border-radius: 12px;
  background: #fff;
  box-shadow: 0 1px 2px rgba(17, 25, 37, 0.15);
  
  .ant-card-body {
    padding: 20px;
  }
`;

const DigitalText = styled(Text)`
  font-family: 'mtnewdigital', sans-serif;
  font-size: 24px;
  margin-right: 4px;
`;

const ChangeText = styled(Text)`
  color: ${props => props.isPositive ? '#009f5a' : '#d90000'};
  display: flex;
  align-items: center;
  gap: 4px;
`;

const MetricCard = ({ title, value, change, icon: Icon, suffix = '' }) => {
  const isPositive = change >= 0;
  
  const moreMenu = [
    {
      key: '1',
      label: '查看详情',
    },
    {
      key: '2',
      label: '导出数据',
    },
  ];

  return (
    <StyledCard
      extra={
        <Dropdown menu={{ items: moreMenu }} placement="bottomRight">
          <Button type="text" icon={<MoreOutlined />} />
        </Dropdown>
      }
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
        {Icon && <Icon style={{ fontSize: 20 }} />}
        <Text>{title}</Text>
      </div>
      
      <div style={{ marginBottom: 8 }}>
        <DigitalText>{value}</DigitalText>
        <Text>{suffix}</Text>
      </div>
      
      <ChangeText isPositive={isPositive}>
        {isPositive ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
        {Math.abs(change)}%
      </ChangeText>
    </StyledCard>
  );
};

export default MetricCard; 