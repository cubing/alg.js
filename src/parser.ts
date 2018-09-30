import {Sequence} from "./algorithm"
import {fromJSON} from "./json"
import {parse as jison_parse} from "./jison_parser";
import {Validator, validateSiGNAlg} from "./validation"

export type ParseOptions = {
  validators?: Validator[]
}

// TODO: Include token location info.
// TODO: Take validators in a way that allows optimizing parsing.
export function parse(s: string, options: ParseOptions = {validators: []}): Sequence {
  options.validators = options.validators || [];

  const algo = fromJSON(jison_parse(s));
  for (const validate of options.validators) {
    validate(algo);
  }
  return algo;
}

export function parseSiGN(s: string): Sequence {
  return parse(s, {validators: [validateSiGNAlg]});
}
