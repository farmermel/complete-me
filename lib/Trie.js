import Node from '../lib/Node';

export default class Trie {
  constructor() {
    this.root = new Node();
  }

  insert(data) {
    let letters = data.split('');
    let previousNode;
    let currentNode = this.root;

    recurse(letters, 0);

    function recurse(letters, index) {
      let letter = letters[index];

      if(!letter) {
        currentNode.isCompleted = true
        return;
      }

      if(!currentNode[letter]) {
        currentNode[letter] = new Node(letter);
      }

      previousNode = currentNode[letter];
      index++;
      currentNode = currentNode[letter];

      recurse(letters, index)
    }
  }
}