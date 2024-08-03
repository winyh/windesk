import { useState, useRef, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./index.css";

const WinRich = ({ onChange }) => {
  const [value, setValue] = useState("");
  const reactQuillRef = useRef();

  const onRichChange = (
    value: string,
    delta,
    source,
    editor: ReactQuill.UnprivilegedEditor
  ) => {
    setValue(value);
    console.log({ value, delta, source, editor });
    onChange && onChange(value);
  };

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }], // H标签
      ["bold", "italic", "underline", "strike"], // 加粗、斜体、下划线、删除线
      [{ list: "ordered" }, { list: "bullet" }], // 有序列表、无序列表
      [{ script: "sub" }, { script: "super" }], // 上标、下标
      [{ indent: "-1" }, { indent: "+1" }], // 缩进减少、缩进增加
      [{ direction: "rtl" }], // 文本方向 (从右到左)
      [{ size: ["small", false, "large", "huge"] }], // 字体大小
      [{ color: [] }, { background: [] }], // 字体颜色、背景颜色
      [{ font: [] }], // 字体家族
      [{ align: [] }], // 对齐方式
      ["clean"], // 清除格式
      ["link", "image", "video"], // 插入链接、图片、视频
      ["code-block"], // 代码块
      ["formula"], // 公式
    ],
  };

  useEffect(() => {
    console.log(reactQuillRef.current);
  }, []);

  return (
    <ReactQuill
      ref={reactQuillRef}
      theme="snow"
      value={value}
      onChange={onRichChange}
      modules={modules}
    ></ReactQuill>
  );
};

export default WinRich;
