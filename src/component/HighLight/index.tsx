import { useState, useEffect } from "react";

import { ReadOutlined } from "@ant-design/icons";

import useStore from "@/store/index";
import hljs from "highlight.js/lib/core";
import javascript from "highlight.js/lib/languages/javascript";
import python from "highlight.js/lib/languages/python";

hljs.registerLanguage("javascript", javascript);
hljs.registerLanguage("python", python);

const { BASE_URL } = import.meta.env;

const HighLight = ({ language = "js", code }) => {
  const antdThemeMode = useStore((state) => state.themeMode);

  useEffect(() => {
    let linkTarget = document.getElementById("hljs");
    let github = "github";
    if (antdThemeMode === "dark") {
      github = "github-dark";
    }

    if (linkTarget) {
      document.head.removeChild(linkTarget);
    }

    const linkElement = document.createElement("link");
    linkElement.id = "hljs";
    linkElement.rel = "stylesheet";
    linkElement.href = `${BASE_URL}css/${github}.min.css`;
    document.head.appendChild(linkElement);

    hljs.highlightAll();
    onListen();
  }, [antdThemeMode]);

  const onListen = () => {
    requestAnimationFrame(() => {
      Array.from(document.querySelectorAll("pre code")).forEach((block) => {
        console.log({ block });
        hljs.highlightBlock(block);
      });
    });
  };

  return (
    <pre>
      <code className={`language-${language}`}>{code}</code>
    </pre>
  );
};

export default HighLight;
