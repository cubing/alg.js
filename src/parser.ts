import {Algorithm} from "./algorithm"
import {fromJSON} from "./json"
import {parse as jison_parse} from "./jison_parser";

// TODO: Include token location info.
export function parse(s: string): Algorithm {
  // console.log(JSON.stringify(jison_parse(s), null, "  "))
  return fromJSON(jison_parse(s));
}
