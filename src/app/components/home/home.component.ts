import { Component, OnInit } from '@angular/core';
import { ProjectsService } from "../../services/projects.service";
//Models
import { Log } from "../../modules/Log";
import { Project } from "../../modules/Project";
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  projects: Project[];

  constructor(
    public projectsService: ProjectsService
  ) { }

  ngOnInit() {
    this.projectsService.getAllProjects().subscribe( projects => {
      this.projects = projects;
    }, error => {
      console.log(error);
    });
  }

}
