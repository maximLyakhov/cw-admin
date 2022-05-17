import {ChangeDetectionStrategy, Component, Inject, OnInit} from '@angular/core';
import {BillingService} from "@services/billing.service";
import {Observable} from "rxjs";
import {IBillingDetails} from "@interfaces/billing.interfaces";
import {columnsConfig} from "./billing-view.table.config";
import {DIALOG_DATA, DialogRef} from "@services/dialog.service";
import {Select} from "@ngxs/store";
import {BillingsState} from "@store/billings.state";
import {Dispatch} from "@ngxs-labs/dispatch-decorator";
import {ClearBillingDetails} from "@store/billings.actions";

@Component({
  selector: 'cwb-billings-view',
  templateUrl: './billing-view.component.html',
  styleUrls: ['./billing-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
  providers: [BillingService]
})
export class BillingViewComponent implements OnInit {
  @Select(BillingsState.billing) public billing$!: Observable<IBillingDetails>
  public tableConfig = columnsConfig

  constructor(
      private service: BillingService,
      private dialogRef: DialogRef,
      @Inject(DIALOG_DATA) private billingResultId: number
  ) {
  }

  @Dispatch()
  ngOnInit() {
    this.load()
    return new ClearBillingDetails()
  }

  public load() {
    this.service.billing$(this.billingResultId)
  }

  public close() {
    this.dialogRef.close()
  }
}
