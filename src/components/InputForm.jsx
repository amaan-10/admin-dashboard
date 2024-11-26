import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Component for the skeleton of radio buttions of sidebar
const InputForm = ({
  htmlFor,
  icon,
  type,
  name,
  value,
  placeholder,
  handleChange,
}) => {
  return (
    <>
      <div className="form-group">
        <label
          className="block text-sm font-medium text-gray-700"
          htmlFor={htmlFor}
        >
          <FontAwesomeIcon icon={icon} /> <span className="p-1">{htmlFor}</span>
        </label>
        <input
          type={type}
          name={name}
          value={value}
          placeholder={placeholder}
          onChange={handleChange}
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md text-gray-900 focus:ring-blue-500 focus:border-blue-500"
          required
        />
      </div>
    </>
  );
};

export default InputForm;
