import { Colaborador } from "./colaborador";
import { Patrimonio } from "./patrimonio";

export class Entrada {
    id : number;
    fechaEntrada : string;
    cantidadEntrada  : number;
    patrimonioEntrada : Patrimonio;
}
