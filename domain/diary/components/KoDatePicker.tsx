"use client";

import { Datepicker } from "flowbite-react";
import React from "react";

interface KoDatepickerProps {
  className?: string;
  onChange?: (date: Date | null) => void;
}

const KoDatepicker: React.FC<KoDatepickerProps> = ({ className, onChange }) => {
  return (
    <Datepicker
      className="z-50"
      onChange={onChange}
      autoHide={true}
      language="korea"
      weekStart={1}
    />
  );
};

export default KoDatepicker;
