export default class Player {
  id: number;
  name: string;
  score: number;
  inPlay: boolean;
  static count: number = 10;
  constructor(name: string) {
    this.id = Player.count++;
    this.name = name;
    this.score = 0;
    this.inPlay = false;
  }
}
