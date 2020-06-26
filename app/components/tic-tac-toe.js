import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { get, set } from '@ember/object';


function isNull (value) { value == null }

export default class TicTacToeComponent extends Component {
  @tracked userIcon = 'X';
  @tracked computerIcon = 'O';
  @tracked userPlayed = [];
  @tracked computerPlayed = [];
  @tracked showReset = false;
  @tracked result = null;
  @tracked playerList = [];
  @tracked playerWins = 0;
  @tracked computerWins = 0;

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
        this.playerWins = this.playerWins + 1;
        this.showReset = true;
        this.updatePlayerList();
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
    board.removeObjects(this.computerPlayed)

    if (board.length !== 0) {
      let random = Math.floor(Math.random() * board.length);
      let computerChoice = board[random];
      this.computerPlayed.pushObject(computerChoice)
      this.board.replace(computerChoice, 1, [this.computerIcon])


      if (this.checkWinningCombo(this.computerPlayed) == true) {
        this.result = 'computer';
        this.computerWins = this.computerWins + 1;
        this.showReset = true;

        this.updatePlayerList();
      }
    } else {
      this.result = 'draw';
      this.showReset = true;
    }
  }

  updatePlayerList () {
    this.playerList = [{ name: `Player`, wins: this.playerWins }, { name: `Computer`, wins: this.computerWins }];
  }

  @action
  resetGame () {
    this.result = null;
    this.showReset = false;
    this.computerPlayed.clear();
    this.userPlayed.clear();
    this.board = [null, null, null, null, null, null, null, null, null];
  }
}
