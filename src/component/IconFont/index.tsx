import { Suspense, lazy } from "react";
import Icon, { createFromIconfontCN, setTwoToneColor } from "@ant-design/icons";
import * as antdIcons from "@ant-design/icons";

// 假设这是你的iconfont.cn项目的js地址
const FromIconFont = createFromIconfontCN({
  scriptUrl: "//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js", // 在 iconfont.cn 上生成
});

function IconFont(props) {
  const {
    type, // 内建图标的类型，例如 'StarOutlined'
    fontType, // Iconfont上的图标类型
    customSvg, // 自定义SVG图标的路径或React组件
    twoToneColor, // 双色图标的主要颜色
    className,
    style,
    spin,
    rotate,
    src, // 图片链接
  } = props;

  // 根据双色图标设置全局主题色
  if (twoToneColor) {
    setTwoToneColor(twoToneColor);
  }

  // 渲染不同类型的图标
  if (type) {
    // 动态加载内建图标
    const {
      createFromIconfontCN,
      setTwoToneColor,
      getTwoToneColor,
      IconProvider,
      ...restIcons
    } = antdIcons;

    delete restIcons.default;

    const IconType = restIcons[type] || restIcons["QuestionOutlined"]; // restIcons[type] 不存在时，设置为默认

    if (IconType) {
      return (
        <Suspense fallback={<span>Loading...</span>}>
          <IconType
            className={className}
            style={style}
            spin={spin}
            rotate={rotate}
          />
        </Suspense>
      );
    } else {
      console.error(`${IconType}不存在`);
      return (
        <IconType
          className={className}
          style={style}
          spin={spin}
          rotate={rotate}
        />
      );
    }
  } else if (customSvg) {
    // 如果是通过 Vite 或 Webpack 配置直接导入的 SVG 文件
    if (typeof customSvg === "string") {
      // 这里我们假设你已经在构建工具中配置好了 @svgr/webpack 或 vite-plugin-svgr 插件
      // 所以可以直接将 SVG 文件路径当作 React 组件导入
      return (
        <Icon
          component={customSvg}
          className={className}
          style={style}
          spin={spin}
        />
      );
    } else {
      // 如果是直接传入了一个 React 组件
      return (
        <Icon
          component={customSvg}
          className={className}
          style={style}
          spin={spin}
        />
      );
    }
  } else if (fontType) {
    // 渲染来自 iconfont 的图标
    return <FromIconFont type={fontType} className={className} style={style} />;
  } else if (src) {
    // 使用 img 标签渲染图片链接作为图标
    return (
      <img
        src={src}
        alt="icon"
        className={className}
        style={{ ...style, verticalAlign: "middle" }}
      />
    );
  }

  // 如果没有匹配到任何情况，返回 null 或者可以提供默认图标
  return null;
}

export { IconFont };

export default IconFont;
