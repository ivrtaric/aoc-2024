import { reindeerMaze } from './part2';
import { getFixtureStream } from '../common/utilities';

reindeerMaze(getFixtureStream('2024-16-test3.txt')).then(result => console.log(result));
