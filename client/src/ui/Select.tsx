import type { ChangeEvent } from 'react';
import styled, { css } from 'styled-components';
type Sizes = 'small' | 'medium' | 'large';

type SelectOption = {
  value: string;
  text: string;
};

interface SelectProps {
  id: string;
  type: string;
  className?: string;
  value?: string;
  options: SelectOption[];
  onChange?: (e: ChangeEvent<HTMLSelectElement>) => void;
  disabled?: boolean;
}

interface FormSelectProps {
  type: string;
  size?: Sizes;
}

const sizes = {
  small: css`
    font-size: 0.9em !important;
    padding: 0.2rem 0.6rem;
    text-transform: uppercase;
    text-align: center;
  `,
  medium: css`
    font-size: 1rem !important;
    padding: 0.5rem 1rem 0.4rem 1rem;
    font-weight: 500;
  `,
  large: css`
    font-size: 1.2rem;
    padding: 0.6rem 1.2rem;
    font-weight: 500;
  `,
};

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
  ${(props) => (!props.size ? sizes['medium'] : sizes[props.size])}
`;

function Select({ options, value, onChange, ...props }: SelectProps) {
  return (
    <StyledSelect value={value} onChange={onChange} {...props}>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.text}
        </option>
      ))}
    </StyledSelect>
  );
}

Select.defaultProps = {
  size: 'medium',
};

export default Select;
