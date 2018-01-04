import { Component, Input } from '@angular/core';

@Component({
  selector: 'timeline',
  templateUrl: 'timeline.html'
})
export class TimelineComponent {
  @Input('prevision') prevision: string;
  itemPrevision;  
  constructor() {}
  ngOnInit() {
    this.itemPrevision = {
      title: this.prevision,
      subtitle: 'Previsão de Entrega'
    }

  }
}

@Component({
  selector: 'timeline-item',
  template: '<ng-content></ng-content>'
})
export class TimelineItemComponent{
  constructor() { }
}

@Component({
  selector:'timeline-time',
  template: '<span>{{time.title}}</span> <span>{{time.subtitle}}</span>'
})
export class TimelineTimeComponent{
  @Input('time') time: { title?: string, subtitle?: string} = {};
  constructor() { }
}
