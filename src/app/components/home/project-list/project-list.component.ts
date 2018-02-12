import { Component, OnInit, Input } from '@angular/core';

//Services
import { ProjectsService } from "../../../services/projects.service";
//Model
import { Log } from "../../../modules/Log";
import { Project } from "../../../modules/Project";

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {
  @Input() projects: Project[];
  @Input() logs: Log[];


  constructor(
    public projectsService: ProjectsService
  ) { }

  ngOnInit() {



  }
  onSelectProject(project: Project) {
    this.projectsService.setFormProject(project);
  }

}
