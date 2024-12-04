export function findDuplexWordCount(word: string, searchField: Array<string>) {
  const reversed = word.split('').reverse().join('');
  const [count, countReverse] = [findWordCount(word, searchField), findWordCount(reversed, searchField)];
  return count + countReverse;
}

export function findWordCount(word: string, searchField: Array<string>) {
  let count = 0;
  let wordRegex = new RegExp(word, 'g');
  for (const line of searchField) {
    wordRegex.lastIndex = 0;
    for (;;) {
      const result = wordRegex.exec(line);
      if (!result) break;
      count++;
    }
  }

  return count;
}

export function pivot(searchField: Array<string>): Array<string> {
  const pivotedSearchField: Array<string> = [];
  for (let i = 0; i < searchField[0].length; i++) {
    pivotedSearchField.push(searchField.map(line => line.charAt(i)).join(''));
  }

  return pivotedSearchField;
}

export function diagonalDown(searchField: Array<string>): Array<string> {
  const diagonal: Array<string> = [];
  for (let i = searchField[0].length - 1; i >= 0; i--) {
    diagonal.push(
      searchField
        .map((line, idx) => line.charAt(i + idx))
        .filter(Boolean)
        .join('')
    );
  }
  for (let j = 1; j < searchField.length; j++) {
    diagonal.push(
      searchField
        .map((line, idx) => (idx > 0 ? line.charAt(idx - j) : undefined))
        .filter(Boolean)
        .join('')
    );
  }

  return diagonal;
}

export function diagonalUp(searchField: Array<string>): Array<string> {
  const diagonal: Array<string> = [];
  const width = searchField[0].length;
  for (let j = 0; j < width; j++) {
    diagonal.push(
      searchField
        .map((line, idx) => line.charAt(j - idx))
        .filter(Boolean)
        .reverse()
        .join('')
    );
  }
  for (let j = 1; j < searchField.length; j++) {
    diagonal.push(
      searchField
        .map((line, idx) => (idx > 0 ? line.charAt(width - 1 + j - idx) : undefined))
        .filter(Boolean)
        .reverse()
        .join('')
    );
  }

  return diagonal;
}

export function findXMas(searchField: Array<string>): number {
  let count = 0;
  for (let i = 1; i < searchField.length - 1; i++) {
    for (let j = 1; j < searchField[0].length - 1; j++) {
      if (searchField[i].charAt(j) !== 'A') continue;

      if (isXMas(searchField, i, j)) count++;
    }
  }

  return count;
}

function isXMas(searchField: Array<string>, i: number, j: number): boolean {
  return (
    searchField[i].charAt(j) === 'A' &&
    ((searchField[i - 1].charAt(j - 1) === 'M' && searchField[i + 1].charAt(j + 1) === 'S') ||
      (searchField[i + 1].charAt(j + 1) === 'M' && searchField[i - 1].charAt(j - 1) === 'S')) &&
    ((searchField[i - 1].charAt(j + 1) === 'M' && searchField[i + 1].charAt(j - 1) === 'S') ||
      (searchField[i + 1].charAt(j - 1) === 'M' && searchField[i - 1].charAt(j + 1) === 'S'))
  );
}
