import { ApiService } from './services/api.service';
import { DialogComponent } from './dialog/dialog.component';

import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {AfterViewInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit{
  title = 'Crud';
  displayedColumns: string[] = ['name','email',  'gender','status',];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(public dialog: MatDialog,private api:ApiService) {}
  ngOnInit(): void {
    this.getAllData()
  }
  openDialog() {
    // Here we are resuing the dialog component
    this.dialog.open(DialogComponent, {
      width:'30%',
      
     
    }).afterClosed().subscribe(val=>{
      if(val==='save'){
        this.getAllData()
        // After the dialog box closes we are checking if val==save so that the value comes automatically and we dont have to refresh to get value
      }
    })
    this.ngOnInit()
  }



 
  getAllData(){
    this.api.getUserData().subscribe({
      next:(res)=>{
       this.dataSource= new MatTableDataSource(res);
       this.dataSource.paginator=this.paginator
       this.dataSource.sort=this.sort
       
      },
      error:(err)=>{
alert("error while fetching data")
      }
    })
  }
  editUser(row : any){
    this.dialog.open(DialogComponent,{
      width:'30%',
      data:row
    })
    
    
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
