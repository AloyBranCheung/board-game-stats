import { PlayerColumnObj } from "src/@types/playerColumns";

const playerColumnState = (
  username: string,
  socketId: string
): PlayerColumnObj => ({
  username,
  socketId,
  birds: 0,
  bonusCards: 0,
  endOfRoundGoals: 0,
  eggs: 0,
  foodOnCards: 0,
  tuckedCards: 0,
});

export default playerColumnState;
