import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import WingspanChat, {
  WingspanChatProps,
} from "../../components/WingspanCalculatorContainer/WingspanChat";

export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: "Demos/WingspanChat",
  component: WingspanChat,
} as ComponentMeta<typeof WingspanChat>;

//👇 We create a “template” of how args map to rendering
const Template: ComponentStory<typeof WingspanChat> = (
  args: WingspanChatProps
) => <WingspanChat {...args} />;

export const Example = Template.bind({});

Example.args = {};
