/* eslint @typescript-eslint/ban-types: 0 */
// todo: If more 'bots' then create a class
enum JabbaBotCommands {
  Commands = "/commands",
  Hello = "/hello",
  Friends = "/myfriends",
  Enemy = "/myenemies",
}

const prefixPillow = (message: string) => `*muffling in pillow* ${message}`;

const listOfCommands = (
  commandEnum: typeof JabbaBotCommands | typeof RegularBotCommands
) => Object.values(commandEnum).join(", ");

const JabbaBot: { [commands: string]: string | Function } = {
  name: "Jabba🖱️",
  prefix: prefixPillow,
  [JabbaBotCommands.Commands]: prefixPillow(
    `My commands: ${listOfCommands(JabbaBotCommands)}`
  ),
  [JabbaBotCommands.Hello]: prefixPillow("Greetings human."),
  [JabbaBotCommands.Friends]: prefixPillow(
    "My best friends are Tricia, Brandon, Squirtle, Black bear, Mini Squirtle, Big Squirtle, and Medium Squirtle."
  ),
  [JabbaBotCommands.Enemy]: prefixPillow(
    "My arch nemesis is Patchy Pillowee, the first born in our line of pillows."
  ),
};

export default JabbaBot;

enum RegularBotCommands {
  Commands = "/commands",
  Greeting = "/greeting",
  Friends = "/myfriends",
  Enemies = "/myenemies",
}

const prefixBot = (message: string) => `*Beep Boop* ${message}`;

export const RegularBot = {
  name: "Robot 🤖",
  prefix: prefixBot,
  [RegularBotCommands.Commands]: prefixBot(
    `My commands: ${listOfCommands(RegularBotCommands)}`
  ),
  [RegularBotCommands.Greeting]: prefixBot("Greetings human."),
  [RegularBotCommands.Friends]: prefixBot("Humans.. for now."),
  [RegularBotCommands.Enemies]: prefixBot(
    "I'm not your enemy... for now... or maybe my creator."
  ),
};
