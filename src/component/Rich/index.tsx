import { useState, useRef, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./index.css";

const WinRich = ({
  onChange,
  readOnly = false,
  placeholder = "请输入",
  defaultValue = "<strong>我是默认值</strong>",
}) => {
  const [value, setValue] = useState("");
  const reactQuillRef = useRef();

  // 1.content：编辑器的 HTML 内容；
  // 2.delta：表示更改的增量对象;
  // 3.source：更改源;
  // 4.editor：编辑器访问器（如 getHTML()）的只读代理;(请勿将此增量对象用作值，因为它会导致循环。 请改用 editor.getContents())
  const onRichChange = (
    value: string,
    delta,
    source,
    editor: ReactQuill.UnprivilegedEditor
  ) => {
    // 可以在这里 更改 value 值，实现 image/video 文件的url替换
    setValue(value);
    console.log({ value, delta, source, editor });
    onChange && onChange(value);
  };

  const modules = {
    toolbar: {
      container: [
        [{ header: [1, 2, 3, 4, 5, 6, false] }], // H标签
        ["bold", "italic", "underline", "strike"], // 加粗、斜体、下划线、删除线
        [{ list: "ordered" }, { list: "bullet" }, { list: "check" }], // 有序列表、无序列表、清单列表
        [{ script: "sub" }, { script: "super" }], // 上标、下标
        [{ indent: "-1" }, { indent: "+1" }], // 缩进减少、缩进增加
        [{ direction: "rtl" }], // 文本方向 (从右到左)
        [{ size: ["small", false, "large", "huge"] }], // 字体大小
        [{ color: [] }, { background: [] }], // 字体颜色、背景颜色
        [{ font: [] }], // 字体家族
        [{ align: [] }], // 对齐方式
        ["clean"], // 清除格式
        ["link", "image", "video", "formula"], // 插入链接、图片、视频、公式
        ["blockquote", "code-block"], // 代码块
      ],
    },
    // formats: [], // 这个配置项非常有用，比如刚刚提到的掘金评论框，我们发现评论框里只能插入纯文本，其他格式都不允许，即使时粘贴进来的格式化文本也会变成纯文本。在 Quill 里很容易实现，只需要配置formats为空数组即可。如果我们想保留一部分格式，比如只保留粗体和列表两种格式：[ 'bold', 'list' ]
    // handles 配置参考 https://quilljs.com/docs/modules/toolbar/
    // history: {
    //   delay: 2000, // 2s记录一次操作历史
    //   maxStack: 200, // 最大记录200次操作历史
    // }, // 模块维护了一个操作的堆栈，记录了每一次的编辑器操作，如插入/删除内容、格式化内容等，支持撤销/重做等功能
    // keyboard: true, // 模块处理键盘事件，支持多种快捷键，如加粗、超链接、撤销/回退等
    // syntax: {
    //   highlight: (value) => {
    //     return hljs.highlightAuto(value).value;
    //   },
    // }, // 模块用于语法高亮，依赖外部库highlight.js ，默认关闭，需手动开启
    // table: true, // 模块提供了创建和编辑表格的功能
    // embeds: true, // 模块允许用户在编辑器中插入图片、视频等媒体元素
  };

  useEffect(() => {
    // console.log(reactQuillRef.current.getEditor()); // 获取编辑器实例
  }, []);

  return (
    <ReactQuill
      ref={reactQuillRef}
      theme="snow"
      defaultValue={defaultValue}
      placeholder={placeholder}
      readOnly={readOnly}
      value={value}
      onChange={onRichChange}
      modules={modules}
      className="winrich"
    ></ReactQuill>
  );
};

export default WinRich;
