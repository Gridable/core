/* eslint-disable @typescript-eslint/no-unused-vars */

enum TokenType {
  PLUS = 'PLUS',
  MINUS = 'MINUS',
  MULTIPLY = 'MULTIPLY',
  DIVIDE = 'DIVIDE',

  GT = 'GT',
  LT = 'LT',
  GE = 'GE',
  LE = 'LE',

  POW = 'POW',
}

// =10.12+20.21
const example1 = {
  type: 'PROGRAM',
  children: [
    {
      type: 'EXP',
      children: [
        {
          type: 'op',
          value: '+',
          children: [
            {
              type: 'NUMBER',
              value: '10.12',
            },
            {
              type: 'NUMBER',
              value: '20.21',
            },
          ],
        },
      ],
    },
  ],
};

// (1+2)*3
const example2 = {
  type: 'PROGRAM',
  children: [
    {
      type: 'EXP',
      children: [
        {
          type: 'op',
          value: '*',
          children: [
            {
              type: 'EXP',
              children: [
                {
                  type: 'op',
                  value: '+',
                  children: [
                    {
                      type: 'NUMBER',
                      value: '1',
                    },
                    {
                      type: 'NUMBER',
                      value: '2',
                    },
                  ],
                },
              ],
            },
            {
              type: 'NUMBER',
              value: '3',
            },
          ],
        },
      ],
    },
  ],
};

// =1
const example3 = {
  type: 'PROGRAM',
  children: [
    {
      type: 'NUMBER',
      value: '1',
    },
  ],
};

// 1+2+3
const example4 = {
  type: 'PROGRAM',
  children: [
    {
      type: 'EXP',
      children: [
        {
          type: 'op',
          value: '+',
          children: [
            {
              type: 'EXP',
              children: [
                {
                  type: 'op',
                  value: '+',
                  children: [
                    {
                      type: 'NUMBER',
                      value: '1',
                    },
                    {
                      type: 'NUMBER',
                      value: '2',
                    },
                  ],
                },
              ],
            },
            {
              type: 'NUMBER',
              value: '3',
            },
          ],
        },
      ],
    },
  ],
};

// (1+2)+3
const example5 = {
  type: 'PROGRAM',
  children: [
    {
      type: 'EXP',
      children: [
        {
          type: 'op',
          value: '+',
          children: [
            {
              type: 'EXP',
              children: [
                {
                  type: 'op',
                  value: '+',
                  children: [
                    {
                      type: 'NUMBER',
                      value: '1',
                    },
                    {
                      type: 'NUMBER',
                      value: '2',
                    },
                  ],
                },
              ],
            },
            {
              type: 'NUMBER',
              value: '3',
            },
          ],
        },
      ],
    },
  ],
};

// 1+(2+3)
const example6 = {
  type: 'PROGRAM',
  children: [
    {
      type: 'EXP',
      children: [
        {
          type: 'op',
          value: '+',
          children: [
            {
              type: 'EXP',
              children: [
                {
                  type: 'op',
                  value: '+',
                  children: [
                    {
                      type: 'NUMBER',
                      value: '2',
                    },
                    {
                      type: 'NUMBER',
                      value: '3',
                    },
                  ],
                },
              ],
            },
            {
              type: 'NUMBER',
              value: '1',
            },
          ],
        },
      ],
    },
  ],
};

// 1+2*3
const example7 = {
  type: 'PROGRAM',
  children: [
    {
      type: 'EXP',
      children: [
        {
          type: 'op',
          value: '+',
          children: [
            {
              type: 'EXP',
              children: [
                {
                  type: 'op',
                  value: '*',
                  children: [
                    {
                      type: 'NUMBER',
                      value: '2',
                    },
                    {
                      type: 'NUMBER',
                      value: '3',
                    },
                  ],
                },
              ],
            },
            {
              type: 'NUMBER',
              value: '1',
            },
          ],
        },
      ],
    },
  ],
};

// =
const stub = {
  type: 'PROGRAM',
  children: [
    {
      type: 'EXP',
      children: [],
    },
  ],
};

// =A1
// =1+A1
// =A1+A2
// =A1:A3
// =SUM(1;2)
// =SUM(A1;2)
// =SUM(A1;A2)
// =SUM(A1;A2;A3)
// =SUM(A1:A3)
// =SUM(A1:A3;A4)
// =SUM(A1:A3;A4;5)
// =SUM(A1:A3;A4;A4)
// =SUM(SUM(1;2);A1)
// =SUM(SUM(SUM(1;2);A1);3)
// =SUM()
// =
// =
//
//
//
//
//
//
//
//
//
//

enum FormulaArgumentType {
  STRING = 'string',
  NUMBER = 'number',
  BOOLEAN = 'boolean',
}

interface FormulaArgument {
  value: string;
  valueType: FormulaArgumentType;
}

interface BaseFormulaArgumentOptions {
  allowTypes: FormulaArgumentType[];
  name: string;
  description: string;
  optional?: boolean;
  repeatable?: boolean; // default: false
}

interface RangeUsableFormulaArgumentOptions extends BaseFormulaArgumentOptions {
  rangeUsable?: true; // default: false
  rangeOnly?: false;
}

interface RangeOnlyFormulaArgumentOptions extends BaseFormulaArgumentOptions {
  rangeUsable?: false;
  rangeOnly?: true; // default: false
}

type FormulaArgumentOptions = RangeUsableFormulaArgumentOptions | RangeOnlyFormulaArgumentOptions;

type FormulaCallbackReturnResult<T extends FormulaArgumentType> =
  T extends FormulaArgumentType.STRING
    ? string
    : T extends FormulaArgumentType.NUMBER
    ? number
    : T extends FormulaArgumentType.BOOLEAN
    ? boolean
    : never;

interface Formula<T extends FormulaArgumentType> {
  id: string;
  args: FormulaArgumentOptions | FormulaArgumentOptions[];
  typeResult: T;

  callback(...arguments_: FormulaArgument[]): FormulaCallbackReturnResult<T>;

  name?: string;
  description?: string;
}

class FormulaValueError extends Error {}

const sumFormula: Formula<FormulaArgumentType.NUMBER> = {
  id: 'SUM',
  args: {
    allowTypes: [FormulaArgumentType.NUMBER],
    name: 'number',
    description: 'write number',
    repeatable: true,
    rangeUsable: true,
  },

  typeResult: FormulaArgumentType.NUMBER,

  callback(...arguments_) {
    if (arguments_.some((argument) => argument.valueType !== FormulaArgumentType.NUMBER)) {
      throw new FormulaValueError();
    }

    return arguments_.reduce((a, b) => a + Number.parseFloat(b.value), 0);
  },
};

console.log(
  sumFormula.callback(
    {
      value: '1.2',
      valueType: FormulaArgumentType.NUMBER,
    },
    {
      value: '1.2',
      valueType: FormulaArgumentType.NUMBER,
    },
  ),
);
