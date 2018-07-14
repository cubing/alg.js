import {Sequence} from "./algorithm"
import {fromJSON} from "./json"
import {parse as jison_parse} from "./jison_parser";

// TODO: Include token location info.
export function parse(s: string): Sequence {
  return fromJSON(jison_parse(s));
}
