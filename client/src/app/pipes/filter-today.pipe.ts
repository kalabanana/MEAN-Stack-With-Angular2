import {Pipe, PipeTransform} from "@angular/core"
import {el} from "@angular/platform-browser/testing/src/browser_util";
@Pipe({name: 'today', pure: false})
export class FilterTodayPipe implements PipeTransform {
  transform(value: any[], argus:String){
    if(!value){
      return value;
    }else {
      if(!argus){
        return value;
      }else {
        //return value.filter();
      }
    }
  }
}
