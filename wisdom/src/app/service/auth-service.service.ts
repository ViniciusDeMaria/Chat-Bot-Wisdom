import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // private userSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  // public user$: Observable<any> =this.userSubject.asObservable();

  // constructor(private afAuth: AngularFireAuth) {
  //   this.afAuth.authState.subscribe((user: any) =>{
  //     this.userSubject.next(user);
  //   })
  //  }

  //  signUp(email: string, password: string): Observable<any> {
  //   return new Observable((observer)=> {
  //    this.afAuth.
  //     createUserWithEmailAndPassword(email, password)
  //     .then((userCredential) => {
  //       observer.next(userCredential.user);
  //       observer.complete();
  //     }).catch((error)=> {
  //       observer.error(error.message);
  //     })
  //   });
  // }

  // login(email: string, password: string): Observable<any> {
  //   return new Observable((observer)=> {
  //    this.afAuth.
  //     signInWithEmailAndPassword(email, password)
  //     .then((userCredential)=>{
  //       observer.next(userCredential.user);
  //       observer.complete();
  //     }).catch((error)=> {
  //       observer.error(error.message);
  //     })
  //   });
  // }

  // logout(): void {
  //   this.afAuth.signOut();
  // }

  // getCurrentUser(): Observable<User | null> {
  //   return this.user$;
  // }
}
