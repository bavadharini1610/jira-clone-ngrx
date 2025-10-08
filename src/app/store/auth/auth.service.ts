import { inject, Injectable } from "@angular/core";
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "@angular/fire/auth";
import { doc, Firestore, setDoc } from "@angular/fire/firestore";
import { from } from "rxjs";

@Injectable({providedIn:'root'})
export class AuthService{
    private auth: Auth = inject(Auth);
    private fireStore:Firestore= inject(Firestore)


    //login
    login(email:any, password:any){
        return from(signInWithEmailAndPassword(this.auth,email,password));
    }

    //register
    register(email:any, password:any){
        return from(createUserWithEmailAndPassword(this.auth,email,password));
    }

    //logout
    logout(){
        return from(signOut(this.auth));
    }

    //creates user collection(document)
    createUserDocument(uid:string, email:string, name:string){
        const userDocRef = doc(this.fireStore,`users/${uid}`);
        const userData = {uid,email,name};
        return from(setDoc(userDocRef,userData));
    }
}