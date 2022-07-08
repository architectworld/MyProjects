import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import {StudentModel} from './wishlist.model'
@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {
  formValue!: FormGroup;
  studentModelObj : StudentModel = new StudentModel();
  studentdata !: any;
  viewonly:boolean = false;
  constructor(private formBuilder : FormBuilder, private api : ApiService) { }

  ngOnInit(): void {
    this.getStudentDetails();
  }


  postStudentDetails(){
    this.studentModelObj.name = this.formValue.value.name;
    this.studentModelObj.roll = this.formValue.value.roll;
    this.studentModelObj.email = this.formValue.value.email;
    this.studentModelObj.mobile = this.formValue.value.mobile;
    this.studentModelObj.genre = this.formValue.value.genre;

    this.api.postStudents(this.studentModelObj).subscribe(res=>{
      console.log(res);
      alert("Students Record Added Successfully")

      let ref = document.getElementById('cancel')
      ref?.click();
      this.formValue.reset();
      this.getStudentDetails()    // for update data
      // this.addtowishlist();
    },
    err=>{
      alert("Something went wrong, Please Check Again Carefully")
    })
  }


  getStudentDetails(){      // get Api Done
    this.api.getStudents().subscribe(res=>{
      this.studentdata = res;
      
    })
  }

  onUpdate(student:any){
    this.studentModelObj.id = student.id;
    this.formValue.controls['name'].setValue(student.name);
    this.formValue.controls['roll'].setValue(student.roll);
    this.formValue.controls['email'].setValue(student.email);
    this.formValue.controls['mobile'].setValue(student.mobile);
    this.formValue.controls['genre'].setValue(student.genre);
  }

  updateStudentDetails(){
    this.studentModelObj.name = this.formValue.value.name;
    this.studentModelObj.roll = this.formValue.value.roll;
    this.studentModelObj.email = this.formValue.value.email;
    this.studentModelObj.mobile = this.formValue.value.mobile;
    this.studentModelObj.genre = this.formValue.value.genre;

    this.api.updateStudents(this.studentModelObj, this.studentModelObj.id).subscribe(res=>{
      alert("Student Detail Record Updated")
      let ref = document.getElementById('cancel')
      ref?.click();
      this.formValue.reset();
      this.getStudentDetails()
    })

  }
  addtowishlist(){
    this.studentModelObj.name = this.formValue.value.name;
    this.studentModelObj.roll = this.formValue.value.roll;
    this.studentModelObj.email = this.formValue.value.email;
    this.studentModelObj.mobile = this.formValue.value.mobile;
    this.studentModelObj.genre = this.formValue.value.genre;

    this.api.wishlistDetails().subscribe(res=>{
      alert("Student Detail Record Updated")
      let ref = document.getElementById('cancel')
      ref?.click();
      this.formValue.reset();
      this.getStudentDetails()
    })
  }
  

}
