import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  margin-right: 32px;

  & > :not(:first-child) {
    margin-left: 4px;
  }
`;
