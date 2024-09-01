import React, { ChangeEvent, useState } from "react";
import { Col, Form } from "react-bootstrap";
import { Controller } from "react-hook-form";

type FormCheckProps = {
  label?: string;
  checked?: boolean;
  onChecked?: (event: ChangeEvent) => void;
  className?: string;
  normal?: boolean;
  radioType?: boolean;
  name: string;
  control?: any;
};

const SwitchCase: React.FC<FormCheckProps> = ({
  normal = true,
  label,
  name,
  checked,
  onChecked,
  className,
  control,
  radioType = false,
}) => {
  return (
    <>
      {radioType ? (
        <Col className=" d-flex align-items-end">
          <label className="">{label} </label>
          <Form.Check
            type="radio"
            aria-label="radio 1"
            checked={checked}
            onChange={onChecked}
          />
        </Col>
      ) : (
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <>
              <Col className=" d-flex align-items-end">
                <Form.Check
                  className={`d-flex justify-content-center mb-1 cursorPointer ${className}`}
                  color="#00000"
                  width={400}
                  {...field}
                  id={name}
                  type="checkbox"
                  checked={field.value}
                  onChange={(e) => field.onChange(e.target.checked)} // custom onChange handler
                />
                <label htmlFor={name} className="px-2">
                  {label}
                </label>
              </Col>
            </>
          )}
        />
      )}
    </>
  );
};

export default SwitchCase;
