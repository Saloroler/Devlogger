import { Injectable } from '@angular/core';
import { of } from "rxjs/observable/of";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
//Models
import { Log } from "../modules/Log";
import { Project } from "../modules/Project";
import {Observable} from "rxjs/Observable";

@Injectable()
export class ProjectsService {

    projects: Project[];
    selectedProject: Project;


    private logSource = new BehaviorSubject<Log>( {
      id: null,
      text: null,
      date: null
    });
    selectedLog = this.logSource.asObservable();

    private stateSource = new BehaviorSubject<boolean>(true);
    stateClear = this.stateSource.asObservable();

  constructor() {
    this.projects = JSON.parse(localStorage.getItem('projects')) || [];
  }
  getAllProjects(): Observable<Project[]> {
    return of(this.projects);
  }
  getProject(id) {
    this.projects.forEach( (current, i) =>{
      if (current.projectId === id) {
        this.selectedProject = current;
      }
    } );
    return of(this.selectedProject);
  }
  addProject(project) {
    this.projects.unshift(project);
    localStorage.setItem('projects', JSON.stringify(this.projects));
  }
  addLog(log: Log, projectId) {

    this.projects.forEach( project=>{
      if ( project.projectId === projectId ) {
        project.logs.unshift(log);
      }
    })
  //Add to localstorage
    localStorage.setItem('projects', JSON.stringify(this.projects));
  }

  updateLog(log: Log, projectId) {
    this.projects.forEach( project => {
      //search project bby projectId
      if( project.projectId === projectId ){
        project.logs.forEach((value, i) => {
          //search log by log.id
          if(value.id === log.id){
            //delete olg log
            project.logs.splice(i, 1);
          }
        });
        //add update log
        project.logs.unshift(log);

      }
    } );
    //Add to localstorage
    localStorage.setItem('projects', JSON.stringify(this.projects));
  }

  setFormLog(log: Log){
    this.logSource.next(log);
  }
  clearState(){
    this.stateSource.next(true);
    this.logSource.next({
      id: null,
      text: null,
      date: null
    } )
  }
  setFormProject(project: Project){
    console.log(project);
  }

}
