import React, { useState, useEffect } from 'react';
import { MoreOutlined } from '@ant-design/icons';
import { Card, Typography, Button, Dropdown } from 'antd';
import styled from 'styled-components';

const { Title, Text } = Typography;

const StyledCard = styled(Card)`
  width: 306px;
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
`;

const MainCard = () => {
  const [greeting, setGreeting] = useState('');
  
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) {
      setGreeting('早上好');
    } else if (hour < 18) {
      setGreeting('下午好');
    } else {
      setGreeting('晚上好');
    }
  }, []);

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
      <Title level={4}>{greeting}，管理员</Title>
      <div style={{ marginTop: 16 }}>
        <Text>酒店名称：星月大酒店</Text>
        <br />
        <Text>城市排名：第 <DigitalText>3</DigitalText> 名</Text>
      </div>
    </StyledCard>
  );
};

export default MainCard; 