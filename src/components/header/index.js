import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.header`
  background: #fff;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 8px 0px;
`;

const Title = styled.h1`
  padding: 20px;
  margin: 0px;
  text-align: center;
`;

const Header = () => {
  return (
    <Wrapper>
      <Title>Welcome to Todo</Title>
    </Wrapper>
  );
};

export default Header;
