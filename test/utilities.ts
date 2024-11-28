import { createReadStream, existsSync, ReadStream } from 'fs';
import * as path from 'path';

const FIXTURE_FOLDER = path.join(__dirname, 'fixtures');

export function getFixtureStream(fileName: string): ReadStream {
  const fullPath = path.join(FIXTURE_FOLDER, fileName);
  if (!existsSync(fullPath)) {
    throw new Error(`Cannot find file ${fileName} (full path: ${fullPath})`);
  }

  return createReadStream(fullPath, { encoding: 'utf8' });
}
