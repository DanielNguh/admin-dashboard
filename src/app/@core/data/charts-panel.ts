import { Observable } from 'rxjs';
import { SystemResourceChart } from './resources-chart';


export abstract class ChartsPanelData {
  abstract getResourcesChartData(): Observable<SystemResourceChart>;
}
