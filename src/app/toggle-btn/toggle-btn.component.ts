import { Input, Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-toggle-btn',
  templateUrl: './toggle-btn.component.html',
  styleUrls: ['./toggle-btn.component.less']
})
export class ToggleBtnComponent {

  @Input() StateOne: string = '';
  @Input() StateTwo: string = '';

  @Output() actualState = new EventEmitter<string>();
  
  toggleState: boolean = false;
  title: string = '';

  ngOnInit() {
    this.title = this.StateOne;
  }

  changeState() {
    this.toggleState = !this.toggleState
    this.title = this.toggleState ? this.StateTwo : this.StateOne;
    this.actualState.emit(this.title);
    // emit new state to parent
  }
}
