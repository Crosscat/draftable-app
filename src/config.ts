import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root',
})
export class Config {
  serviceUrl = 'http://localhost:3000';
}
