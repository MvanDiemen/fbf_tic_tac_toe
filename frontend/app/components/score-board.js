import Component from '@glimmer/component';
import { inject as service } from '@ember/service'
import { tracked } from '@glimmer/tracking';

export default class ScoreBoardComponent extends Component {
  @service store;
  @tracked playerList = [];

  constructor() {
    super(...arguments);
    this.playerList = this.store.findAll('player');
  }
}
