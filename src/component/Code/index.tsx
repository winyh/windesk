import { useEffect, useRef } from "react";
import ace from "ace-builds";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/theme-tomorrow";
import "ace-builds/src-noconflict/mode-sql";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/ext-language_tools";
import "./index.css";

const Code = ({
  mode = "javascript",
  initialValue,
  onChange,
  options,
  theme,
}) => {
  const editorRef = useRef(null);

  useEffect(() => {
    if (editorRef.current) {
      const editor = ace.edit(editorRef.current);

      if (theme === "dark") {
        editor.setTheme("ace/theme/monokai");
      } else {
        editor.setTheme("ace/theme/tomorrow");
      }

      if (!["javascript", "json", "sql"].includes(mode)) {
        throw new Error("ace editor mode need oneof javascript | json | sql ");
      } else {
        editor.session.setMode(`ace/mode/${mode}`);
      }

      // 设置其他编辑器选项
      editor.setOptions({
        enableBasicAutocompletion: true,
        enableLiveAutocompletion: true,
        showLineNumbers: true,
        tabSize: 2,
        ...options,
      });

      editor.setValue(initialValue, -1); // -1 表示不触发 change 事件

      // 添加事件监听器等
      editor.on("change", (delta) => {
        const content = editor.getValue();
        onChange && onChange(delta, content);
      });
    }
  }, [theme]);

  return (
    <div
      ref={editorRef}
      style={{ width: "100%", height: "100%", minHeight: "500px" }}
    ></div>
  );
};

export default Code;
