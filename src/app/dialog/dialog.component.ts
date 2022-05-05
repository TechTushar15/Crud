import { ApiService } from './../services/api.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements OnInit {
  genderList = ['Male', 'Female'];
  userForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private api: ApiService,
    private dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public editData: any
  ) {}

  ngOnInit(): void {
    // initialization of form
    this.userForm = this.formBuilder.group({
      // making input field mandatory using validators
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      gender: ['', Validators.required],
      status: ['', Validators.required],
    });
  }
//  We are now adding user by using post method
  addUser() {
    if (this.userForm.valid) {
      // if the form is valid then only it would subscribe as per given validation
      this.api.postUserData(this.userForm.value).subscribe({
        next: (res) => {
          alert('User Added SuccessFully');
          this.userForm.reset();

          this.dialogRef.close('save');
        },
        error: () => {
          alert('Eroor while adding User');
        },
      });
    }
  }
}
