import React, {useId} from "react";

function Select({options, label, className = "", ...props}, ref) {
  let id = useId();
  return (
    <div>
      {label && <label className="" htmlFor={id}></label>}
      <select ref={ref} id={id} className="">
        {options?.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export default React.forwardRef(Select);
