import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class GameOverModalComponent extends Component {
  get showTitle () {
    if (this.args.title === 'player') {
      return `You won!`;
    } else if (this.args.title === 'computer') {
      return `Computer won :O`;
    } else if (this.args.title === 'draw') {
      return `It's a draw...`;
    }
  }

  @action
  async reset () {
    await this.args.reset();
  }
}
