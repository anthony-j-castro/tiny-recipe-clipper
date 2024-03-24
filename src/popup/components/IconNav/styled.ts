import styled from "styled-components";

export const Container = styled.div`
  display: flex;

  & > :not(:first-child) {
    margin-left: 4px;
  }
`;
