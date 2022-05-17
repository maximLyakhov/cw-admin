import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewEncapsulation
} from '@angular/core';
import {Observable, of, tap} from "rxjs";
import {LocalDataSource} from "ng2-smart-table";
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";

@UntilDestroy()
@Component({
  selector: 'cwb-smart-table',
  templateUrl: './smart-table.component.html',
  styleUrls: ['./smart-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
  encapsulation: ViewEncapsulation.None
})
export class SmartTableComponent implements OnInit {
  @Input() public source: Observable<Array<any>> = of([])
  @Input() public columns: any = {}
  @Output() public rowClicked = new EventEmitter()
  public dataSource!: LocalDataSource

  constructor(private cdr: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.source
        .pipe(
            untilDestroyed(this),
            tap((source) => this.dataSource = new LocalDataSource(source)),
            tap(() => this.dataSource.refresh()),
            tap(() => this.cdr.detectChanges())
        )
        .subscribe()
  }
}
