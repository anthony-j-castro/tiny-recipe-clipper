import styled from "styled-components";

export const AppContainer = styled.div`
  padding: 8px;
`;

export const TopRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
`;

export const IconButtonsRow = styled.div`
  display: flex;
  margin-right: 32px;

  & > :not(:first-child) {
    margin-left: 4px;
  }
`;

export const Card = styled.div`
  padding: 8px;
  border: 1px solid #dbdce0;
  border-radius: 4px;
`;

export const Text = styled.div`
  line-height: 1.25em;
  margin-bottom: 12px;
`;
