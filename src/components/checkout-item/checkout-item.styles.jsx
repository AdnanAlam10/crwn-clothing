import styled from "styled-components";

export const CheckoutItemContainer = styled.div`
  display: flex;
  min-height: 100px;
  border-bottom: 1px solid darkgrey;
  padding: 10px 0;
  font-size: 20px;
  align-items: center;
`;

export const ImageContainer = styled.div`
  width: 23%;
  padding-right: 15px;

  img {
    width: 100%;
    height: 100%;
  }
`;

export const BaseSpan = styled.span`
  width: 21%;
`;

export const Quantity = styled(BaseSpan)`
  display: flex;
  padding-left: 8px;
`;

export const Arrow = styled.div`
  cursor: pointer;
`;

export const Value = styled.span`
  margin: 0 10px;
`;

export const RemoveButton = styled.div`
  cursor: pointer;
  padding-right: 80px;
`;
