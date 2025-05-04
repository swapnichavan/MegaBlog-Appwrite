import React from "react";
import {Editor} from "@tinymce/tinymce-react";
import {Controller} from "react-hook-form";

function RTE({name, control, label, defaultValue = ""}) {
  return (
    <div>
      {label && <label className="">{label}</label>}
      <Controller
        name={name || "content"}
        control={control}
        render={({field: {onChange}}) => (
          <Editor
            apiKey="y7nuh6pf71kw8k94gv0pvq39acnjw9yl1qh90s4hvh1ob8on"
            initialValue={defaultValue}
            init={{
              initialValue: defaultValue,
              branding: false,
              height: 500,
              menubar: false,
              plugins: "link image code",
              toolbar:
                "undo redo | styleselect | bold italic | link image | code",
            }}
            onEditorChange={onChange}
          />
        )}
      />
    </div>
  );
}

export default RTE;
