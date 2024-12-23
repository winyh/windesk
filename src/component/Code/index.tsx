import { useEffect, forwardRef, useImperativeHandle, useRef } from "react";
import ace from "ace-builds";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/theme-tomorrow";
import "ace-builds/src-noconflict/mode-sql";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/mode-prisma";
import "ace-builds/src-noconflict/ext-language_tools";
import "./index.css";

import useStore from "@/store/index";
const Code = forwardRef(
  ({ mode = "javascript", initialValue, onChange, options }, ref) => {
    const editorRef = useRef(null);
    const antdThemeMode = useStore((state) => state.themeMode);

    // 使用useImperativeHandle将incrementCount函数暴露给父组件
    useImperativeHandle(ref, () => ({
      getCode,
      setCode,
    }));

    useEffect(() => {
      if (editorRef.current) {
        const editor = ace.edit(editorRef.current);

        editorRef.current = ace.edit(editorRef.current);

        if (antdThemeMode === "dark") {
          editor.setTheme("ace/theme/monokai");
        } else {
          editor.setTheme("ace/theme/tomorrow");
        }

        if (!["javascript", "json", "sql", "prisma"].includes(mode)) {
          throw new Error(
            "ace editor mode need oneof javascript | json | sql "
          );
        } else {
          editor.session.setMode(`ace/mode/${mode}`);
        }

        // 设置其他编辑器选项
        editor.setOptions({
          useWorker: false, // fix Failed to execute 'importScripts' on 'WorkerGlobalScope'
          enableBasicAutocompletion: true,
          enableLiveAutocompletion: true,
          showLineNumbers: true,
          tabSize: 2,
          ...options,
        });

        editor.setValue(initialValue, -1); // -1 表示不触发 change 事件

        // 封装定位到某一行的函数
        const gotoLine = (row: number, column: number = 0) => {
          editor.gotoLine(row + 1, column, true); // 第三个参数true表示滚动到视图中心
        };

        // 定位到第2行（行索引从0开始）
        var targetRow = options.targetRow; // 第2行
        var targetColumn = 0; // 列可以从0开始

        // 调用封装的函数定位到第2行
        gotoLine(targetRow, targetColumn);
        // 添加事件监听器等
        editor.on("change", (delta) => {
          const content = editor.getValue();
          onChange && onChange(delta, content);
        });
      }
    }, [antdThemeMode, initialValue, options.targetRow]);

    const getCode = () => {
      return editorRef.current.getValue();
    };

    const setCode = (content) => {
      return editorRef.current.setValue(content, -1); // -1 表示不触发 change 事件
    };

    return (
      <div
        ref={editorRef}
        style={{
          width: "100%",
          height: "100%",
          minHeight: options?.minHeight || 500,
        }}
      ></div>
    );
  }
);

export default Code;
