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
      if (isDigit(line.charAt(lineLength - (i + 1))) && rightDigit === null) {
        rightDigit = line.charAt(lineLength - (i + 1));
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
