import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {Task} from '../../Task'
import {UiService} from "../../services/ui.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent {
  @Output() onAddTask: EventEmitter<Task> = new EventEmitter();
  text: string | any;
  day: string | any;
  reminder: boolean = false;
  showAddTask: boolean = false;
  subscription: Subscription = new Subscription();
  constructor(private uiService: UiService) {
    this.subscription = this.uiService.onToggle().subscribe(value => (this.showAddTask = value));
  }

  ngOnInit(): void{
  }

  onSubmit() {
    if(!this.text){
      alert("Please add a text");
      return;
    }

    if(!this.day){
      alert("Please add day");
      return;
    }

    const newTask = {
      text: this.text,
      day: this.day,
      reminder: this.reminder
    }

    //emit
    this.onAddTask.emit(newTask);

    this.text = '';
    this.day = '';
    this.reminder = false;
  }
}
