import Component from '@glimmer/component';
import { inject as service } from '@ember/service'
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class SelectUserComponent extends Component {
  @service store;
  @tracked playerList = [];

  constructor() {
    super(...arguments);
    this.playerList = this.store.findAll('player');
  }

  @action
  async select (id) {
    await this.args.select(id);
  }
}
