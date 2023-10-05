import { opt, or, seq } from "../../parsers-tools/parser-combinators";
import { tag, take } from "../../parsers-tools/parser-factories";

const sing = take(/[\-+]/, {min: 0, max: 1});

const exp = seq(
    tag([/e/i]),
    take(/[\-+]/, {min: 0, max: 1, token: 'EXP_SING'}),
    take(/\d/, {token: 'EXP_VALUE'})
);

const fractional = seq(
    tag('.'),
    take(/\d/, {token: 'FRACTIONAL_VALUE'})
)

export const number = seq(
    //sing,

    seq(
        or(
            seq( tag('0', {token: 'NUMBER'}), fractional ),

            seq(
                seq(
                    {
                        token: 'NUMBER',
                        tokenValue(value) {
                            return value.reduce((res, {value}) => res + value, '');
                        }
                    },

                    take(/[\-+]/, {min: 0, max: 1}),
                    tag([/[1-9]/]),
                    take(/\d/, {min: 0})
                ),

                opt(fractional)
            ),

            opt(exp)
        )
    )
)
