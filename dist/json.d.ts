import { Algorithm } from "./algorithm";
export interface AlgorithmJSON {
    type: string;
    nestedAlg?: AlgorithmJSON;
    nestedAlgs?: AlgorithmJSON[];
    family?: string;
    amount?: number;
    A?: AlgorithmJSON;
    B?: AlgorithmJSON;
    comment?: string;
}
export declare function fromJSON(json: AlgorithmJSON): Algorithm;
