import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import PlayerColumn, {
  PlayerColumnProps,
} from "src/components/WingspanCalculatorContainer/ScoreColumn";

export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: "Demos/WingspanChat",
  component: PlayerColumn,
} as ComponentMeta<typeof PlayerColumn>;

//👇 We create a “template” of how args map to rendering
const Template: ComponentStory<typeof PlayerColumn> = (
  args: PlayerColumnProps
) => <PlayerColumn {...args} />;

export const Example = Template.bind({});

Example.args = {};
