import React from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";

const FormFieldWrapper = styled.div`
  position: relative;
  textarea {
    min-height: 150px;
  }
  input[type="color"] {
    padding-left: 56px;
  }
`;

const Label = styled.label``;

Label.Text = styled.span`
  color: #e5e5e5;
  height: 57px;
  position: absolute;
  top: 0;
  left: 16px;
  display: flex;
  align-items: center;
  transform-origin: 0% 0%;
  font-size: 18px;
  font-style: normal;
  font-weight: 300;
  transition: 0.1s ease-in-out;
`;

const Input = styled.input`
  background: #53585d;
  color: #f5f5f5;
  display: block;
  width: 100%;
  height: 57px;
  font-size: 18px;
  outline: 0;
  border: 0;
  border-top: 4px solid transparent;
  border-bottom: 4px solid #53585d;
  padding: 16px 16px;
  margin-bottom: 45px;
  resize: none;
  border-radius: 4px;
  transition: border-color 0.3s;

  &:focus {
    border-bottom-color: var(--primary);
  }
  &:focus:not([type="color"]) + span {
    transform: scale(0.6) translateY(-10px);
  }

  ${({ hasValue }) =>
    hasValue &&
    css`
      &:not([type="color"]) + span {
        transform: scale(0.6) translateY(-10px);
      }
    `}
`;

const Select = styled.select`
  background: #53585d;
  color: #f5f5f5;
  display: block;
  width: 100%;
  height: 59px;
  font-size: 18px;
  outline: 0;
  border: 0;
  border-top: 4px solid transparent;
  border-bottom: 4px solid #53585d;
  padding: 16px 40px 16px 16px;
  margin-bottom: 45px;
  border-radius: 4px;
  transition: border-color 0.3s;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;

  background-image: url("data:image/svg+xml;utf8,<svg fill='%23f5f5f5' height='20' viewBox='0 0 24 24' width='20' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/></svg>");
  background-repeat: no-repeat;
  background-position: right 12px center;
  background-size: 18px;

  &:focus {
    border-bottom-color: var(--primary);
  }

  ${({ hasValue }) =>
    hasValue &&
    css`
      + span {
        transform: scale(0.6) translateY(-10px);
      }
    `}
`;


function FormField({ label, type, name, value, onChange, suggestions }) {
  const fieldId = `id_${name}`;
  const hasValue = Boolean(value.length);

  return (
    <FormFieldWrapper>
      <Label htmlFor={fieldId}>
        {type === "select" ? (
          <Select
            id={fieldId}
            name={name}
            value={value}
            onChange={onChange}
            hasValue={hasValue}
          >
            {suggestions.map((suggestion) => (
              <option key={`option-${suggestion}`} value={suggestion}>
                {suggestion}
              </option>
            ))}
          </Select>
        ) : (
          <>
            <Input
              as={type === "textarea" ? "textarea" : "input"}
              id={fieldId}
              type={type}
              value={value}
              name={name}
              hasValue={hasValue}
              onChange={onChange}
              autoComplete={suggestions.length ? "off" : "on"}
              list={suggestions.length ? `suggestionFor_${fieldId}` : undefined}
            />
            {suggestions.length > 0 && (
              <datalist id={`suggestionFor_${fieldId}`}>
                {suggestions.map((suggestion) => (
                  <option value={suggestion} key={`suggestion-${suggestion}`} />
                ))}
              </datalist>
            )}
          </>
        )}
        <Label.Text>{label}:</Label.Text>
      </Label>
    </FormFieldWrapper>
  );
}

FormField.defaultProps = {
  type: "text",
  value: "",
  onChange: () => {},
  suggestions: [],
};

FormField.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func,
  suggestions: PropTypes.arrayOf(PropTypes.string),
};

export default FormField;
