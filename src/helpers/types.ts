import { Tail } from "../models/Tail";

export type TCell = {
    x:number;
    y:number;
    value:number;
    cellTails:Tail[];
}