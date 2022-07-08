import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, NavigationStart, Router } from '@angular/router';
import { ApiService } from '../shared/api.service';
import { StudentModel } from './student-dashboard.model';
@Component({
  selector: 'app-student-dashboard',
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.css']
})
export class StudentDashboardComponent implements OnInit {
  formValue!: FormGroup;
  studentModelObj : StudentModel = new StudentModel();
  studentData !: any;
  viewonly:boolean = false;
  constructor(private formBuilder : FormBuilder, private api: ApiService, private route : Router) {
    this.route.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if(event.url == '/viewlist') {
          this.viewonly = true;
        };
      }
    });
  }

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      name:[''],
      pages:[''],
      author:[''],
      email:[''],
      mobile:[''],
      genre:['']
    })
    this.getStudentDetails()
  }

  postStudentDetails(){
    this.studentModelObj.name = this.formValue.value.name;
    this.studentModelObj.pages = this.formValue.value.pages;
    this.studentModelObj.author = this.formValue.value.author;
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
      this.studentData = res;
    })
  }



  deleteStudentDetails(student:any){    // Delete Api Done
    this.api.deleteStudents(student.id).subscribe(res=>{
      alert("Student Detail Record Deleted")
      this.getStudentDetails()
    })
  }

  onUpdate(student:any){
    this.studentModelObj.id = student.id;
    this.formValue.controls['name'].setValue(student.name);
    this.formValue.controls['pages'].setValue(student.pages);
    this.formValue.controls['author'].setValue(student.author);
    this.formValue.controls['email'].setValue(student.email);
    this.formValue.controls['mobile'].setValue(student.mobile);
    this.formValue.controls['genre'].setValue(student.genre);
  }

  updateStudentDetails(){
    this.studentModelObj.name = this.formValue.value.name;
    this.studentModelObj.pages = this.formValue.value.pages;
    this.studentModelObj.author = this.formValue.value.author;
    this.studentModelObj.email = this.formValue.value.email;
    this.studentModelObj.mobile = this.formValue.value.mobile;
    this.studentModelObj.genre = this.formValue.value.genre;

    this.api.updateStudents(this.studentModelObj, this.studentModelObj.id).subscribe(res=>{
      alert("Student Detail Record Updated")
      let ref = document.getElementById('cancel')
      ref?.click();
      this.formValue.reset();
      // this.getStudentDetails()
    })
  }



  addtowishlist(student:StudentModel){
    student.wishlist = !student.wishlist;
    this.api.updateStudents(student, student.id).subscribe(res=>{
      alert("Book Detail Record Updated")

      this.getStudentDetails()
    })
  }
  loggout(){
    localStorage.removeItem('user')
  }
}
