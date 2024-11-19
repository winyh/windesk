import Icon, { createFromIconfontCN } from "@ant-design/icons";
import * as antdIcons from "@ant-design/icons";

const IconFontOnline = createFromIconfontCN({
  scriptUrl: ["//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js"],
});

const IconFont = (props) => {
  const { type, component, icon, style } = props;
  const { createFromIconfontCN, ...restIcons } = antdIcons;
  const IconShow = restIcons[icon];
  return (
    <>
      {component && <Icon component={component} style={style} />}
      {type && <IconFontOnline type={type} style={style} />}
      {icon && <IconShow style={style} />}
    </>
  );
};

export { IconFont };
export default IconFont;
