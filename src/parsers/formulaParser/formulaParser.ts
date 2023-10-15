import { tag, take } from "../../parsers-tools/parser-factories";
import { Parser } from "../../parsers-tools/types";
import { or, repeat, seq } from "../../parsers-tools/parser-combinators";
import { number } from "../numberParser";

enum TokenType {
    Function = 'FUNCTION',
    String = 'STRING',
    Number = 'NUMBER',
    Ref = 'REF',
    Delimiter = 'DELIMITER',
    FormulaName = 'FORMULA_NAME',
    Operator = 'OPERATOR',
    BracketOpen = 'BRACKET_OPEN',
    BracketClose = 'BRACKET_CLOSE'
}

const names = [
    'SUM',
    'DIFF',
    'TEST',
    'BLA',
    'BAR'
];

const testFormulaStr = '= BLA(A1; B2; 45)';

const optSpace = take(' ', {min: 0});
const bracketOpen = tag('(', { token: TokenType.BracketOpen });
const bracketClose = tag(')', { token: TokenType.BracketClose });
const space = tag(' ');

const ref = seq(
    {
        token: TokenType.Ref,
        tokenValue(value) {
            return value.reduce((res, {value}) => res + value, '');
        }
    },
    take(/[A-Z]/, {max: 1}),
    take(/\d/),
    take(';', {min: 0})
);

function getFormulaNameParsers(formulaNames: string[]): Parser[] {
    return formulaNames.map((name) => {
        return tag(name, { token: TokenType.FormulaName})
    })
}

function getFormulaParser(formulaLength: number) {
    return seq(
        optSpace,
        tag('='),
        optSpace,
        or(getFormulaNameParsers(names)[0], ...getFormulaNameParsers(names)), //formulaName бурать костыль
        optSpace,
        bracketOpen,
        optSpace,
        repeat(
            or(space, ref, number),
            {max: formulaLength}
        ),
        optSpace,
        bracketClose

    );
}

console.dir([...getFormulaParser(testFormulaStr.length)(testFormulaStr)], {depth: null});
