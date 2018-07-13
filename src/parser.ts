import {Algorithm} from "./algorithm"
import {fromJSON} from "./json"
import parser from "./alg_parser";

// TODO: Include token location info.
export function parse(s: string): Algorithm {
  // console.log(JSON.stringify(jison_parse(s), null, "  "))
  return fromJSON(parser.parse(s));
}
