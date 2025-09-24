import type { ChangeEvent } from 'react';
import styled from 'styled-components';

type SelectOption = {
  value: string;
  text: string;
};

interface SelectProps {
  id: string;
  type: string;
  value?: string;
  options: SelectOption[];
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  disabled?: boolean;
}

interface FormSelectProps {
  type: string;
}

const StyledSelect = styled.select<FormSelectProps>`
  padding: 0.6rem 0.5rem;
  border: 1px solid
    ${(props) =>
      props.type === 'white'
        ? 'var(--color-grey-100)'
        : 'var(--color-grey-700)'};
  color: black;
  border-radius: var(--border-radius-sm);
  background-color: transparent;
  font-weight: 500;
  width: 15rem;
  box-shadow: var(--shadow-sm);
`;

function Select({ options, value, onChange, ...props }: SelectProps) {
  return (
    <StyledSelect value={value} onChange={onChange} {...props}>
      {options.map((option) => (
        <option
          key={option.value}
          value={option.value}
          style={{ backgroundColor: 'var(--color-gray-900)' }}
        >
          {option.text}
        </option>
      ))}
    </StyledSelect>
  );
}

export default Select;
