import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Note } from './@types/note';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  private apiUrl: string;

  
  constructor(private http: HttpClient) {
    this.apiUrl = "https://fiap-notes-api.herokuapp.com";
  }
  
  private newNoteSource = new Subject<Note>();
  newNoteProvider = this.newNoteSource.asObservable();
  notifyNewNoteAdded(note: Note){
    this.newNoteSource.next(note);
    // this.newNoteSource.error("algum exception");
  }

  private editModeSource = new Subject<Note>();
  editModeProvider = this.editModeSource.asObservable();
  notifyEditMode(note: Note){
    this.editModeSource.next(note);
    // this.editModeSource.error("algum exception");
  }

  getNotes(){
    return this.http.get<Note[]>(`${this.apiUrl}/notes`);
  }

  removeNote(noteId: number){
    return this.http.delete(`${this.apiUrl}/notes/${noteId}`);
  }

  postNotes(textNote: string){
    return this.http.post<Note>(`${this.apiUrl}/notes`, {text: textNote});
  }

  getNoteById(noteId: number){
    return this.http.get<Note>(`${this.apiUrl}/notes/${noteId}`);
  }

  updateNote(noteId: number, textNote: string){
    return this.http.put<Note>(`${this.apiUrl}/note/${noteId}`, {text: textNote});
  }
  
}
