import Icon, { createFromIconfontCN } from "@ant-design/icons";
import * as antdIcons from "@ant-design/icons";

const IconFontOnline = createFromIconfontCN({
  scriptUrl: ["//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js"],
});

const IconFont = (props) => {
  const { type, component, icon, ...rest } = props;
  const { createFromIconfontCN, ...restIcons } = antdIcons;
  const IconShow = restIcons[icon];
  return (
    <>
      {component && <Icon component={component} {...rest} />}
      {type && <IconFontOnline type={type} {...rest} />}
      {icon && <IconShow {...rest} />}
    </>
  );
};

export { IconFont };
export default IconFont;
