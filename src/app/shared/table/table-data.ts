import { PipeTransform } from "@angular/core";

export class TableData {
  displayName!: string;
  key!: string;
  pipe?: PipeTransform;
  class?: string;
  style?: string;
}
