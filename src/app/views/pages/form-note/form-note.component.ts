import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule } from '@angular/forms';
import { Note } from 'src/app/services/@types/note';
import { NoteService } from 'src/app/services/note.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-form-note',
  templateUrl: './form-note.component.html',
  styleUrls: ['./form-note.component.css'],
})
export class FormNoteComponent implements OnInit {
  title = 'FIAP NOTES';
  logoImage = '/assets/logo.png';
  note = {} as Note;

  checkoutForm: FormGroup;
  subscription: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private noteService: NoteService
  ) {
    this.checkoutForm = this.formBuilder.group({
      textNote: ['', [Validators.required, Validators.minLength(5)]],
      info: {value: 'Adicionar nota', disabled: true},
    });
    this.subscription = this.noteService.editModeProvider.subscribe({
      next: (note: Note) => {
        // alert("chegou no set textNote... note.text: " + note.text);
        this.note = note;
        this.checkoutForm.controls["info"].setValue("Editar nota id: " + note.id);
        this.checkoutForm.controls["textNote"].setValue(note.text);
      },
      error: () => {}
    });
  }

  ngOnInit(): void {}

  sendNote() {
    // console.log(this.checkoutForm.get('textNote')?.errors);
    if (this.checkoutForm.valid) {
      if (this.note.id != null) {
        this.noteService.updateNote(this.note.id, this.checkoutForm.value.textNote).subscribe({
          //next é chamado quando as coisas dão certo
          next: (note) => {
            // this.noteService.notifyNoteUpdated(this.note);
            this.note.text = this.checkoutForm.value.textNote;
            this.resetForm();
          },
          //error é chamado no caso de excessões
          error: (error) => alert("Algo errado na inserção! " + error)
        });
      } else {
        this.noteService.postNotes(this.checkoutForm.value.textNote).subscribe({
          //next é chamado quando as coisas dão certo
          next: (note) => {
            this.noteService.notifyNewNoteAdded(note);
            this.resetForm();
          },
          //error é chamado no caso de excessões
          error: (error) => alert("Algo errado na inserção! " + error)
        });
      }
    }
  }
  
  resetForm(){
    this.checkoutForm.reset({info: 'Adicionar nota'});
    this.note = {} as Note;
  }

  get textNote() {
    return this.checkoutForm.get('textNote');
  }

}
