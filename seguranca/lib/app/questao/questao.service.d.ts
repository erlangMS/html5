import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Router } from "@angular/router";
import { Questao } from "./questao";
export declare class QuestaoService {
    private http;
    private route;
    questao: Questao;
    constructor(http: Http, route: Router);
    insert(questao: Questao): Observable<Questao>;
    findByIdPessoa(idPessoa: number): Observable<any>;
}
