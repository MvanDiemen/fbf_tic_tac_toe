import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class GameOverModalComponent extends Component {
  showTitle (title) {
    if (title === 'player') {
      return `You won!`;
    } else if (title === 'computer') {
      return `Computer won :O`;
    } else if (title === 'draw') {
      return `It's a draw...`;
    }
  }

  @action
  async reset () {
    await this.args.reset();
  }
}
