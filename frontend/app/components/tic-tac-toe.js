import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service'

export default class TicTacToeComponent extends Component {
  @service store;
  @tracked selectedPlayer = 1;
  @tracked userIcon = 'X';
  @tracked opponentIcon = 'O';
  @tracked userPlayed = [];
  @tracked opponentPlayed = [];
  @tracked showReset = false;
  @tracked result = null;

  @tracked board = [null, null, null, null, null, null, null, null, null];

  @tracked winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 4, 8],
    [2, 4, 6],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8]
  ]

  @action
  tagField (icon, index) {
    if (this.board[index] == null) {
      this.board.replace(index, 1, [icon])
      this.userPlayed.pushObject(index)

      if (this.checkWinningCombo(this.userPlayed) == true) {
        this.result = 'player';
        this.addWinToPlayer();
        this.showReset = true;
      }
      else {
        this.makeComputerMove();
      }
    }
  }

  checkWinningCombo (played_fields) {
    for (var i = 0; i < this.winningCombos.length; i++) {
      var count = 0;
      for (var j = 0; j < played_fields.length; j++) {
        if (this.winningCombos[i].includes(played_fields[j])) {
          count += 1;
        }
      }

      if (count === 3) {
        return true;
      }
    }
    return false;
  }

  makeComputerMove () {
    let board = [0, 1, 2, 3, 4, 5, 6, 7, 8];

    board.removeObjects(this.userPlayed)
    board.removeObjects(this.opponentPlayed)

    if (board.length !== 0) {
      let random = Math.floor(Math.random() * board.length);
      let computerChoice = board[random];
      this.opponentPlayed.pushObject(computerChoice)
      this.board.replace(computerChoice, 1, [this.opponentIcon])


      if (this.checkWinningCombo(this.opponentPlayed) == true) {
        this.result = 'computer';
        // this.computerWins = this.computerWins + 1;
        this.showReset = true;
      }
    } else {
      this.result = 'draw';
      this.showReset = true;
    }
  }

  addWinToPlayer () {
    let player = this.store.findRecord('player', this.selectedPlayer).then(function (player) {
      player.wins = player.wins + 1;
      player.save();
    });
  }

  @action
  resetGame () {
    this.result = null;
    this.showReset = false;
    this.opponentPlayed.clear();
    this.userPlayed.clear();
    this.board = [null, null, null, null, null, null, null, null, null];
  }
}
