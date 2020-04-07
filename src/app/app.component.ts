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
  courses: AngularFireList<string>;
  course;
  constructor(db:AngularFireDatabase){
    this.courses = db.list('/courses');
    this.coursesArr = this.courses.valueChanges();
    this.course = db.object('/courses/1').valueChanges();
  }
  addCourse(courseVal:HTMLInputElement){
    this.courses.push(courseVal.value);
    courseVal.value = '';
  }
}
