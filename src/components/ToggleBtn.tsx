import React from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { isDarkAtom } from "../atom";

interface IThemeToggleProps {
  toggle: () => void;
}

function ThemeToggle({ toggle }: IThemeToggleProps) {
  const mode = useRecoilValue<boolean>(isDarkAtom);
  return <ToggleWrapper onClick={toggle}>{mode ? "🌚" : "🌝"}</ToggleWrapper>;
}

export default ThemeToggle;

const ToggleWrapper = styled.button`
  position: absolute;
  z-index: 10;
  right: 0;
  background-color: ${(props) => props.theme.bgColor};
  font-size: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 96px;
  height: 48px;
  border-radius: 30px;
  border: 1px solid ${(props) => props.theme.textColor};
  transition: all 0.3s ease-in-out;
`;
