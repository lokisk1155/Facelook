class TrieNode {
    constructor() {
      this.children = new Map();
      this.isEndOfWord = false;
    }
  }

class Trie {
    constructor() {
      this.root = new TrieNode();
    }
  
    insert(word) {
      let current = this.root;
      for (const letter of word) {
        if (!current.children.has(letter)) {
          current.children.set(letter, new TrieNode());
        }
        current = current.children.get(letter);
      }
      current.isEndOfWord = true;
    }
  
    search(word) {
      let current = this.root;
  
      for (const letter of word) {
        if (!current.children.has(letter)) {
          return false;
        }
        current = current.children.get(letter);
      }
      return current.isEndOfWord;
    }

    getMatchingUsers(query) {
      let current = this.root;
      let matchedPrefix = "";
      for (const letter of query) {
        if (!current.children.has(letter)) {
          return [];
        }
        current = current.children.get(letter);
        matchedPrefix += letter;
      }
      const words = [];
    }
  
    remove(word) {
      let current = this.root;
      for (const letter of word) {
        if (!current.children.has(letter)) {
          return false;
        }
        current = current.children.get(letter);
      }
    }
}  