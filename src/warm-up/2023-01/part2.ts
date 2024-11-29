import { ReadStream } from 'fs';
import * as readline from 'readline';

export async function trebuchet(calibrationFile: ReadStream): Promise<number> {
  const lineReader = readline.createInterface({
    input: calibrationFile,
    crlfDelay: Infinity
  });

  const lineNumbers: Array<number> = [];
  for await (const line of lineReader) {
    let leftDigit: string | null = null;
    let rightDigit: string | null = null;

    const lineLength = line.length;
    for (let i = 0; i < lineLength; i++) {
      if (isDigit(line.charAt(i)) && leftDigit === null) {
        leftDigit = line.charAt(i);
      }
      if (leftDigit === null) {
        leftDigit = getDigitString(line.substring(0, i + 1));
      }

      const rightIndex = lineLength - (i + 1);
      if (isDigit(line.charAt(rightIndex)) && rightDigit === null) {
        rightDigit = line.charAt(rightIndex);
      }
      if (rightDigit === null) {
        rightDigit = getDigitString(line.substring(rightIndex, lineLength));
      }

      if (leftDigit !== null && rightDigit !== null) {
        break;
      }
    }

    lineNumbers.push(parseInt(`${leftDigit ?? '0'}${rightDigit ?? '0'}`, 10));
  }

  return lineNumbers.reduce((acc, curr) => acc + curr, 0);
}

const isDigit = (char: string): boolean => '0123456789'.includes(char);

const DIGIT_WORD_REGEX = /one|two|three|four|five|six|seven|eight|nine/;
const getDigitString = (char: string): string | null => {
  const results = DIGIT_WORD_REGEX.exec(char);
  return results?.length ? MAP_WORD_TO_DIGIT[results[0]] : null;
};
const MAP_WORD_TO_DIGIT: Record<string, string> = {
  one: '1',
  two: '2',
  three: '3',
  four: '4',
  five: '5',
  six: '6',
  seven: '7',
  eight: '8',
  nine: '9'
};
