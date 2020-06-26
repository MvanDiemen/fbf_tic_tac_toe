import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { get, set } from '@ember/object';


export default class TicTacToeComponent extends Component {
  @tracked userIcon = 'X';
  @tracked computerIcon = 'O';
  @tracked userPlayed = [];
  @tracked computerPlayed = [];
  @tracked showReset = false;
  @tracked result = null;

  @tracked one = null;
  @tracked two = null;
  @tracked three = null;

  @tracked four = null;
  @tracked five = null;
  @tracked six = null;

  @tracked seven = null;
  @tracked eight = null;
  @tracked nine = null;

  @tracked board = { 1: 'one', 2: 'two', 3: 'three', 4: 'four', 5: 'five', 6: 'six', 7: 'seven', 8: 'eight', 9: 'nine' };
  @tracked boardMap = { 'one': 1, 'two': 2, 'three': 3, 'four': 4, 'five': 5, 'six': 6, 'seven': 7, 'eight': 8, 'nine': 9 };
  @tracked winningCombos = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 5, 9],
    [3, 5, 7],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9]
  ]

  @action
  tagField (symbol, box) {
    if (get(this, box) == null) {
      set(this, box, symbol);
      this.userPlayed.pushObject(this.boardMap[box])

      if (this.checkWinningCombo(this.userPlayed) == true) {
        this.result = 'player';
        this.showReset = true;
      } else {
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
    let board = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    board.removeObjects(this.userPlayed)
    board.removeObjects(this.computerPlayed)


    if (board.length !== 0) {
      let random = Math.floor(Math.random() * board.length);
      let computerChoice = board[random];
      this.computerPlayed.pushObject(computerChoice)

      let box = this.board[computerChoice]
      set(this, box, this.computerIcon)

      if (this.checkWinningCombo(this.computerPlayed) == true) {
        this.result = 'computer';
        this.showReset = true;
      }
    } else {
      this.result = 'draw';
      this.showReset = true;
    }
  }

  @action
  resetGame () {
    this.result = null;
    this.showReset = false;
    this.computerPlayed = [];
    this.userPlayed = [];
    this.one = null;
    this.two = null;
    this.three = null;
    this.four = null;
    this.five = null;
    this.six = null;
    this.seven = null;
    this.eight = null;
    this.nine = null;
  }
}
