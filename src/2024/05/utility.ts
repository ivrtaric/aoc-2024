import { ReadStream } from 'fs';

import { parseFile } from '../common/utilities';
import type { Rule, Update } from './types';
import { Section } from './types';

export const parseInputFile = async (puzzleInputFile: ReadStream) => {
  const rules: Array<Rule> = [];
  const updates: Array<Update> = [];
  let section: Section = Section.RULES;

  await parseFile(puzzleInputFile, line => {
    if (line === '') {
      section = Section.UPDATES;
      return;
    }

    switch (section) {
      case Section.RULES:
        rules.push(parseAsRule(line));
        break;
      case Section.UPDATES:
        updates.push(parseAsUpdate(line));
        break;
      default:
        throw new Error(`Unexpected section: ${section}`);
    }
  });

  return { rules, updates };
};

const RULE_REGEX = /(?<first>\d+)\|(?<second>\d+)/;
const parseAsRule = (line: string): Rule => {
  const result = RULE_REGEX.exec(line);
  if (!result?.groups) throw new Error(`Unable to parse "${line}" as an ordering rule`);

  return [parseInt(result.groups.first, 10), parseInt(result.groups.second, 10)];
};

const parseAsUpdate = (line: string): Update => {
  const strUpdatePages = line.split(',');
  return strUpdatePages.map(s => parseInt(s, 10));
};

export const arePagesPresent = (update: Update, page1: Rule[0], page2: Rule[1]): boolean =>
  update.indexOf(page1) !== -1 && update.indexOf(page2) !== -1;
export const isRuleObserved = (update: Update, rule: Rule): boolean =>
  update.indexOf(rule[0]) < update.indexOf(rule[1]);

export const isUpdateValid = (update: Update, rules: Array<Rule>): boolean => {
  const applicableRules = rules.filter(rule => arePagesPresent(update, rule[0], rule[1]));
  for (const rule of applicableRules) {
    if (!isRuleObserved(update, rule)) {
      return false;
    }
  }

  return true;
};

export const getMiddlePage = (update: Update): number => update[Math.floor(update.length / 2.0)];

export const sortByRules = (update: Update, rules: Array<Rule>) => {
  const applicableRules = rules.filter(rule => arePagesPresent(update, rule[0], rule[1]));
  for (;;) {
    for (const rule of applicableRules) {
      if (!isRuleObserved(update, rule)) {
        applyRule(update, rule);
      }
    }

    if (isUpdateValid(update, applicableRules)) break;
  }
};

const applyRule = (update: Update, rule: Rule) => {
  const indexA = update.indexOf(rule[0]);
  const indexB = update.indexOf(rule[1]);
  update[indexA] = rule[1];
  update[indexB] = rule[0];
};
