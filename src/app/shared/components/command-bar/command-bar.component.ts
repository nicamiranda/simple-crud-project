import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { Blog } from 'src/app/blog/models/blog';


@Component({
  selector: 'app-command-bar',
  templateUrl: './command-bar.component.html',
  styleUrls: ['./command-bar.component.scss']
})
export class CommandBarComponent implements OnInit {
  @Input() componentTitle : string | undefined;
  @Output() deleteAllEmitter = new EventEmitter<any>();
  @Output() addEmitter = new EventEmitter<string>();

  constructor(private router: Router,
    private activatedroute: ActivatedRoute) {}

  ngOnInit(): void {}

  goToPage($myParam: string = ''): void {
    let s = this.router.url;
    const navigationDetails: string[] = [s]; 
    if($myParam.length) {
      navigationDetails.push($myParam);
    }
    this.router.navigate(navigationDetails);
  }

addNewItem() {
  this.addEmitter.emit();
}

deleteAll () {
  this.deleteAllEmitter.emit();
}

}