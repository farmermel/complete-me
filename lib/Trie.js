import Node from '../lib/Node';

export default class Trie {
  constructor() {
    this.root = new Node();
    this.count = 0;
  }

  insert(data) {
    let letters = data.split('');
    let previousNode;
    let currentNode = this.root;

    this.count++;

    recurse(letters, 0);

    function recurse(letters, index) {
      let letter = letters[index];

      if(!letter) {
        currentNode.isCompleted = true
        return;
      }

      if(!currentNode.next[letter]) {
        currentNode.next[letter] = new Node(letter);
      }

      previousNode = currentNode.next[letter];
      index++;
      currentNode = currentNode.next[letter];

      recurse(letters, index)
    }
  }

  suggest(data) {
    if(!data) {
      return [];
    }
    let currentNode = this.findNode(data);
    let suggestArr = [];

    function makeSuggestion(currentNode, suggestWord) {
      if(!currentNode) {
        return [];
      }
      let nextKeys = Object.keys(currentNode.next);

      if(currentNode.isCompleted) {
        suggestArr.push(suggestWord);
      }
      nextKeys.forEach( key => {
        let nextNode = currentNode.next[key]

        makeSuggestion(nextNode, suggestWord + key);
      })
      return suggestArr;
    }
    return makeSuggestion(currentNode, data);
  }

  findNode(data) {
    let letters = data.split('');
    let currentNode = this.root.next[letters[0]];

    for(let i = 0; i < letters.length - 1; i++) {
      // if(currentNode.data !== letters[i]) {
      if(!currentNode) {

        return false;
      }
      currentNode = currentNode.next[letters[i+1]]
    }

    return currentNode;
  }

  populate(data) {
    data.forEach((word)=>{
      this.insert(word);
    });
  }
}