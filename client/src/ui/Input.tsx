import styled from 'styled-components';

const Input = styled.input`
  border: 1px solid var(--color-grey-700);
  background-color: transparent;
  border-radius: var(--border-radius-sm);
  padding: 0.5rem 0.9rem;
  min-width: 0;
  box-shadow: var(--shadow-sm);
  width: ${(props) => (props.width ? props.width : '15rem')};
`;

export default Input;
