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
  courses: AngularFireList<string>;
  indexes: AngularFireList<string>;
  constructor(private db:AngularFireDatabase){
    this.courses = db.list('/courses');
    this.coursesArr = this.courses.valueChanges();
    this.courses.snapshotChanges().subscribe(data=>{
      this.coursesIndexes = data;
      console.log(this.coursesIndexes);
    });
  }
  addCourse(courseVal:HTMLInputElement){
    this.courses.push(courseVal.value);
    courseVal.value = '';
  }
  updateCourse(courseCH){
    let chosenCourse = this.db.list('/courses').snapshotChanges()
    .subscribe(data=>{
      console.log(data[0]);
    });
    //this.db.object('/courses/'+key).set('New Updated course');
  }
}
