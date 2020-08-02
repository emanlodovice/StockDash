import { Component, OnInit, Output, EventEmitter, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';


@Component({
  selector: 'app-stock-form-dialog',
  templateUrl: './form-dialog.html',
  styleUrls: ['./stock-graph-form.component.css'],
})
export class StockFormDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<StockFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string) {}
  
  onSubmit(): void {
    this.dialogRef.close(this.data);
  }
}


@Component({
  selector: 'app-stock-graph-form',
  templateUrl: './stock-graph-form.component.html',
  styleUrls: ['./stock-graph-form.component.css']
})
export class StockGraphFormComponent implements OnInit {
  @Output() addStock: EventEmitter<any> = new EventEmitter();

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(StockFormDialogComponent, {
      width: '255px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.trim()) {
        this.addStock.emit(result.trim().toUpperCase());
      }
    });
  }
}
