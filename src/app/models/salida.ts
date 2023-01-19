import { Colaborador } from "./colaborador";
import { Patrimonio } from "./patrimonio";


export class Salida {
    id : number;
    fecha : Date;
    fechaSReno : Date;
    fechaTReno :Date
    cantidad : number;
    tipo : string;
    patrimonioSalida : Patrimonio;
    colaborador : Colaborador;
}
