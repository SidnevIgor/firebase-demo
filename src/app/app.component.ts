import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  coursesArr;
  coursesIndexes;
  coursesFinal;
  courses: AngularFireList<string>;
  constructor(private db:AngularFireDatabase){
    this.courses = db.list('/courses');
    this.courses.valueChanges()
    .subscribe(data=>{
      this.coursesArr = data;
      this.courses.snapshotChanges()
      .subscribe(data=>{
        this.coursesIndexes = data;
        for(let i=0; i< this.coursesArr.length; i++){
          this.coursesIndexes[i].value = this.coursesArr[i];
        }
        console.log(this.coursesIndexes);
      });
    });
  }
  addCourse(courseVal:HTMLInputElement){
    this.courses.push(courseVal.value);
    courseVal.value = '';
  }
  updateCourse(course){
    this.db.object('/courses/'+course.key).set('New Updated course');
  }
  deleteCourse(course){
    this.db.object('/courses/'+course.key).remove();
  }
}
