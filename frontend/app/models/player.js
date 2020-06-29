import Model, { attr } from '@ember-data/model';

export default class PlayerModel extends Model {
  @attr name;
  @attr wins;
}
