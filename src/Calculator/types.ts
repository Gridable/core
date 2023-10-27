export enum TokenType {
    PROGRAM = 'PROGRAM',
    EXP = 'EXP',
    FORMULA = 'FORMULA',
    OP = 'OP',
    NUMBER = 'NUMBER',
    CELL = 'CELL',
}

export interface ParsedExp {
    type: string;
    value?: string;
    children?: ParsedExp[]
}
