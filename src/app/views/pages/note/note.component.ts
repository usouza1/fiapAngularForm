import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Note } from 'src/app/services/@types/note';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent implements OnInit {

  // note = {
  //   id: 1,
  //   date: new Date(),
  //   text: "Um texto qualquer",
  //   urgert: false
  // }
  
  @Input()
  noteProp = {} as Note;

  @Input()
  titleProp: any;

  @Output()
  notify = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  confirmRemove(){
    if(confirm("Deseja realmente apagar?"))
      this.notify.emit("remove");
  }

  edit(){
    this.notify.emit("edit");
  }

  // Recurso de cores nas notas
  // Cria um controle e listas com combinações de cores de fundo e de fonte para a nota
  noteColors = ["#f04d82", "#e0e476", "#94d97b", "#ddd", "#8acce6", "#555252", "#f48047", "#9e59ce"];
  noteFtColors = ["#ddd", "#373030", "#373030", "#373030", "#373030", "#ddd", "#ddd", "#ddd"];
  noteColorControl = Math.floor(Math.random() * (this.noteColors.length + 1));
  
  // Seta as cores iniciais da nota
  noteColor = this.noteColors[this.noteColorControl];
  noteFtColor = this.noteFtColors[this.noteColorControl];

  // Alterna a cor da nota entre as cores disponíveis
  setColor(){
    if(this.noteColorControl < this.noteColors.length ){
      this.noteColorControl++;
    } else {
      this.noteColorControl = 0;
    }
    this.noteColor = this.noteColors[this.noteColorControl];
    this.noteFtColor = this.noteFtColors[this.noteColorControl];
  }

}
