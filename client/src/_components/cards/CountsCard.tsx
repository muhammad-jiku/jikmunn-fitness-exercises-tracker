import { ReactNode } from 'react';
import styled from 'styled-components';

interface IconProps {
  color: string;
  bg: string;
}

interface SpanProps {
  positive?: boolean;
}

const Card = styled.div`
  flex: 1;
  min-width: 200px;
  padding: 24px;
  border: 1px solid ${({ theme }) => theme.text_primary + 20};
  border-radius: 14px;
  display: flex;
  gap: 6px;
  box-shadow: 1px 6px 20px 0px ${({ theme }) => theme.primary + 15};
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
  @media (max-width: 600px) {
    gap: 6px;
  }
`;

const Title = styled.div`
  font-weight: 600;
  font-size: 16px;
  color: ${({ theme }) => theme.primary};
  @media (max-width: 600px) {
    font-size: 14px;
  }
`;

const Value = styled.div`
  font-weight: 600;
  font-size: 32px;
  display: flex;
  align-items: end;
  gap: 8px;
  color: ${({ theme }) => theme.text_primary};
  @media (max-width: 600px) {
    font-size: 22px;
  }
`;

const Unit = styled.div`
  font-size: 14px;
  margin-bottom: 8px;
`;

const SpanStyled = styled.div<SpanProps>`
  margin-bottom: 8px;
  font-weight: 500;
  font-size: 16px;
  @media (max-width: 600px) {
    font-size: 12px;
  }
  ${({ positive, theme }) =>
    positive ? `color: ${theme.green};` : `color: ${theme.red};`}
`;

const Icon = styled.div<IconProps>`
  height: fit-content;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  background: ${({ bg }) => bg};
  color: ${({ color }) => color};
`;

const Desc = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.text_secondary + 90};
  margin-bottom: 6px;
  @media (max-width: 600px) {
    font-size: 12px;
  }
`;

// Define an interface for the item object.
// Note: Using "dataKey" instead of "key" might avoid conflicts with React's reserved "key" prop.
interface CountsCardItem {
  name: string;
  key: string;
  unit: string;
  desc: string;
  color: string;
  lightColor: string;
  icon: ReactNode;
}

interface CountsCardProps {
  item: CountsCardItem;
  data?: { [key: string]: number };
}

const CountsCard: React.FC<CountsCardProps> = ({ item, data }) => {
  console.log('counts item', item);
  console.log('counts data', data);
  console.log('data and item testing', data && data[item.key]);
  // console.log('data and item info', data[item.key].toFixed(2));
  return (
    <Card>
      <Left>
        <Title>{item.name}</Title>
        <Value>
          {data && data[item.key] !== undefined
            ? data[item.key].toFixed(2)
            : '0.00'}
          <Unit>{item.unit}</Unit>
          <SpanStyled positive>(+10%)</SpanStyled>
        </Value>
        <Desc>{item.desc}</Desc>
      </Left>
      <Icon color={item.color} bg={item.lightColor}>
        {item.icon}
      </Icon>
    </Card>
  );
};

export default CountsCard;
