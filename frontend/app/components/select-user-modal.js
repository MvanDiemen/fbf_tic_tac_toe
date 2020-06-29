import Component from '@glimmer/component';
import { inject as service } from '@ember/service'
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class SelectUserComponent extends Component {
  @service store;
  @tracked playerList = [];
  @tracked userName = null;

  constructor() {
    super(...arguments);
    this.playerList = this.store.findAll('player');
  }

  @action
  addUser () {
    let newUser = this.store.createRecord('player', { name: this.userName, wins: 0 });

    var onSuccess = function (user) {
      this.args.select(user.id);
    };

    var onFail = function (user) {
      alert(`cannot create ${user.name}`);
    };

    newUser.save().then(onSuccess, onFail);
  }

  @action
  async select (id) {
    await this.args.select(id);
  }
}
