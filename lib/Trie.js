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

    let makeSuggestion = (currentNode, suggestWord) => {
      // if(!currentNode) {
      //   return [];
      // }
      let nextKeys = Object.keys(currentNode.next);

      if(currentNode.isCompleted) {
        suggestArr.push({
          string: suggestWord, 
          rating: this.findNode(suggestWord).timesSelected
        });
      }
      nextKeys.forEach( key => {
        let nextNode = currentNode.next[key]

        makeSuggestion(nextNode, suggestWord + key);
      })
      return suggestArr;
    }

    makeSuggestion(currentNode, data);

      // console.log(suggestArr)
    if(suggestArr.length) {
      suggestArr = this.sortArr(suggestArr);
    }
    return suggestArr;
  }

  sortArr(suggestArr) {
    let sortedArrOfObjects = suggestArr.sort((a, b) => {
      return b.rating - a.rating;
    })

    return sortedArrOfObjects.map( object => {
      return object.string;
    })

    console.log(suggestArr)
  }

  findNode(data) {
    let letters = data.split('');
    let currentNode = this.root.next[letters[0]];

    for(let i = 0; i < letters.length - 1; i++) {
      // if(currentNode.data !== letters[i]) {
      // if(!currentNode) {

      //   return false;
      // }
        currentNode = currentNode.next[letters[i+1]]
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

    currentNode.timesSelected++;
  }
}