import Node from '../lib/Node';

export default class Trie {
  constructor() {
    this.root = new Node();
  }

  insert(data) {
    let letters = data.split('');
    let previousNode;
    let currentNode = this.root;
    let index = 0;
    recurse(letters, 0);

    function recurse(letters, index) {
      let letter = letters[index];

      if(!letter) {
        return '#';
      }
      if(!currentNode[letter]) {
        console.log(letter)
        currentNode[letter] = new Node(letter);
        console.log(currentNode)
      }

      previousNode = currentNode[letter];
      index++;
      currentNode = currentNode[letter];
      console.log('arrived')
      recurse(letters, index)
    }

    // letters.forEach(function(letter) {
    //   if(!this[letter]) {
    //     this[letter] = letter;
    //   }
    // })
  }
}