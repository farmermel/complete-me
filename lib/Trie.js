import Node from '../lib/Node';

export default class Trie {
  constructor() {
    this.root = new Node();
    this.count = 0;
  }

  insert(data) {
    if (typeof data !== 'string') {
      return null;
    }
    let letters = data.toLowerCase().split('');
    let currentNode = this.root;

    let buildTrie = (index) => {
      let letter = letters[index];

      if (!letter) {
        if(!currentNode.isCompleted) {
          this.count++;
        }
        currentNode.isCompleted = true;
        return;
      }
      if (!currentNode.next[letter]) {
        currentNode.next[letter] = new Node(letter);
      }
      index++;
      currentNode = currentNode.next[letter];
      buildTrie(index);
    }
    buildTrie(0);
  }

  suggest(data) {
    if (!data) {
      return [];
    }
    let currentNode = this.findNode(data.toLowerCase());
    let suggestArr = [];
    let makeSuggestion = (currentNode, suggestWord) => {
      if (!currentNode.next) {
        return null;
      }

      let nextKeys = Object.keys(currentNode.next);

      if (currentNode.isCompleted) {
        suggestArr.push({
          string: suggestWord, 
          rating: currentNode.rating
        });
      }
      nextKeys.forEach( key => {
        let nextNode = currentNode.next[key];

        makeSuggestion(nextNode, suggestWord + key);
      });
      return suggestArr;
    };
    makeSuggestion(currentNode, data);
    return this.sortArr(suggestArr);
  }

  sortArr(suggestArr) {
    let sortedArrOfObjects = suggestArr.sort((a, b) => {
      return b.rating - a.rating;
    });

    return sortedArrOfObjects.map( object => {
      return object.string;
    });
  }

  findNode(data) {
    let letters = data.toLowerCase().split('');
    let currentNode = this.root.next[letters[0]];

    for (let i = 0; i < letters.length - 1; i++) {
      if (!currentNode) {
        return [];
      }
      currentNode = currentNode.next[letters[i + 1]];
    }
    return currentNode;
  }

  populate(data) {
    data.forEach((word)=>{
      this.insert(word);
    });
  }

  select(data) {
    let currentNode = this.findNode(data);

    currentNode.rating++;
  }

  delete(data) {
    let currentNode = this.findNode(data);

    currentNode.isCompleted = false;
  }
}