enum JabbaBotCommands {
  Commands = "/commands",
  Hello = "/hello",
  Friends = "/myfriends",
  Enemy = "/myenemies",
}

const prefixPillow = (message: string) => `*muffling in pillow* ${message}`;

const listOfCommands = Object.values(JabbaBotCommands).join(", ");

const JabbaBot: { [commands: string]: string | Function } = {
  name: "Jabba🖱️",
  prefixPillow,
  [JabbaBotCommands.Commands]: prefixPillow(`My commands: ${listOfCommands}`),
  [JabbaBotCommands.Hello]: prefixPillow("Greetings human."),
  [JabbaBotCommands.Friends]: prefixPillow(
    "My best friends are Tricia, Brandon, Squirtle, Black bear, Mini Squirtle, Big Squirtle, and Medium Squirtle."
  ),
  [JabbaBotCommands.Enemy]: prefixPillow(
    "My arch nemesis is Patchy Pillowee, the first born in our line of pillows."
  ),
};

export default JabbaBot;
