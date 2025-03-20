import React from "react";
import { Label, TextInput } from "flowbite-react";

export default function TextInputWithHeaderFB({id, nameLabel, nameInput, type, placeholder, value, onChange}) {
  return (
    <div>
      <Label
        htmlFor={id}
        className="block text-sm font-semibold text-gray-700"
      >
        {nameLabel}
      </Label>
      <TextInput
        id={id}
        name={nameInput}
        type={type}
        className="w-full pb-3"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required
      />
    </div>
  );
}