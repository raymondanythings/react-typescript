import React, { useState } from "react";
import styled, { keyframes } from "styled-components";

interface IPriceCheckProps {
  title: string;
  price: number | string;
  index: number;
}

interface IPriceProps {
  value: number;
}

const OpacityAnimation = keyframes`
  0%{
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const Price = styled.span<IPriceProps>`
  color: ${(props) =>
    props.value === -1
      ? props.theme.textColor
      : props.value === 0
      ? "green"
      : "red"};
`;

const Wrapper = styled.div<{ index: number }>`
  display: flex;
  justify-content: space-between;
  padding: 15px 0px;
  opacity: 0;
  border-bottom: 1px solid ${(props) => props.theme.borderColor};
  animation: ${OpacityAnimation} 0.5s ease-in-out forwards;
  animation-delay: ${(props) => `0.${props.index}`}s;
`;

const PriceCheck = ({ title, price, index }: IPriceCheckProps) => {
  const checkValue = (price: IPriceCheckProps["price"]) => {
    if (typeof price === "string") {
      return -1;
    }
    return price >= 0 ? 0 : 1;
  };
  const value = useState(checkValue(price))[0];
  const checkString = typeof price === "string";
  return checkString ? (
    <Wrapper index={index}>
      <h1>{title}</h1>
      <Price value={value}>$ {price}</Price>
    </Wrapper>
  ) : (
    <Wrapper index={index}>
      <h1>{title}</h1>
      <Price value={value}>
        {value === 0 ? "▲" : "▼"}
        {price}%
      </Price>
    </Wrapper>
  );
};

export default PriceCheck;
