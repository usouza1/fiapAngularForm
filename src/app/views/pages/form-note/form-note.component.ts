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

  checkoutForm: FormGroup;
  subscription: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private noteService: NoteService
  ) {
    this.checkoutForm = this.formBuilder.group({
      textNote: ['', [Validators.required, Validators.minLength(5)]],
    });
    this.subscription = this.noteService.editModeProvider.subscribe({
      next: (note: Note) => {
        // alert("chegou no set textNote... note.text: " + note.text);
        this.checkoutForm.controls["textNote"].setValue(note.text);
      },
      error: () => {}
    });
  }

  ngOnInit(): void { this.checkoutForm.controls["textNote"].setValue("")}

  sendNote() {
    // console.log(this.checkoutForm.get('textNote')?.errors);
    if (this.checkoutForm.valid) {
      this.noteService.postNotes(this.checkoutForm.value.textNote).subscribe({
        //next é chamado quando as coisas dão certo
        next: (note) => {
          this.checkoutForm.reset();
          this.noteService.notifyNewNoteAdded(note);
        },
        //error é chamado no caso de excessões
        error: (error) => alert("Algo errado na inserção! " + error)
      });
    }
  }
  
  get textNote() {
    return this.checkoutForm.get('textNote');
  }

}
