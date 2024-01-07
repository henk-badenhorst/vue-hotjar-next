import type { Config } from '@jest/types';
export default async (): Promise<Config.InitialOptions> => {
  return {
    roots: ['./src'],
    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
    moduleFileExtensions: ['ts', 'js'],
    transform: {
      '^.+\\.ts?$': 'ts-jest'
    },
    verbose: true
  };
};
