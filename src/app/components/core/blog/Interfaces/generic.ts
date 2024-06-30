export class GlobalResponse<T>{
  success!:boolean;
  message!:string;
  data!:T;
  total!:number;
  pagesNumber!:number;
}
