import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'unsymbol'
})
export class TitlePipe implements PipeTransform {

  transform(data: string): string {
    data = data.replace(/[&\/\\#,+()!@$~%.'":*?<>{}]/g, '');
    return data;
  }
}
