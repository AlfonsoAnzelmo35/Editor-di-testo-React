import React, { useEffect, useState } from "react" ;
import { Editor } from "./Editor" ;
import Split from 'react-split' ;
import { Sidebar } from "./Siderbar" ;
import "./../css/App.css" ;

import { addDoc, deleteDoc, onSnapshot, doc, setDoc} from "firebase/firestore";
import { notesCollection, notesDB} from "../firebaseConfig";


function App(){
    let [notes,setNotes] = useState([])

    let [currentNote,setCurrentNote] = useState(notes[0]) ;//->all'inizio è undefined

    //alla fine del solo primo render, viene eseguito useEffect 
    useEffect(()=>{
        let newNotes = [] ;
        
        //accade un cambiamento qualsiasi a quella collection! 
        const unsubscribe = onSnapshot(notesCollection,(snapshot)=>{
            //viene creata una promise, restituisce il valore dello snapshot
            let promise = new Promise(function(myResolve,myReject){
                newNotes = snapshot.docs.map((document)=>{
                        const obj = {
                            ...document.data(),
                            id:document.id,
                        }
                        return obj ;
                    })
                //i dati sono caricati e quindo invoca la funzione del successo!
                if(newNotes.length > 0)
                    myResolve(newNotes,unsubscribe) ;
                else myReject("non è più lungo di 0") ;
                }) ;
                //prima di uscire da onSnapshot aggiorna lo state !
                promise.then(function(newNotes,unsubscribe){
                    setCurrentNote(newNotes[0]);
                    setNotes(newNotes) ;
                    return unsubscribe ;
                },
                function(errore){
                    console.log(errore)
                }
            );            
        });//fine onSnapShot

        
    },[]) ;//fine useEffect    
 
   console.log(notes,currentNote) ;


    async function createNewNote(){
        const newNote = {
            title:"nota",
            body:"questa e' una nota"
        }
        const refDocNewNote = await addDoc(notesCollection,newNote) ;
        setCurrentNote(refDocNewNote) ;
    }
 
    async function updateNote(testo){
        const newObj = {
            title:testo.split("\n")[0],
            body:testo
        }
        await setDoc(doc(notesDB, "notes", currentNote.id), newObj) ; 
        
        setCurrentNote((prev)=>{
            console.log("currentNote.id",currentNote.id)
            console.log("prev.id",prev.id)
           
            const obj = {
                    id:currentNote.id,
                    title:newObj.title,
                    body:newObj.body
                }
            return obj ;
        });
        
    }
    
    async function deleteCurrentNote(id){
        const docNoteRef = doc(notesDB,"notes",id) ;
        await deleteDoc(docNoteRef) ;
        setCurrentNote(notes[0]) ;
    }
    return (
        <div>
            {notes.length > 0 ?
            <Split
                sizes={[30, 70]}
                direction="horizontal"
                className="split"
                >
                <Sidebar 
                    handleDeleteCurrentNote = {deleteCurrentNote}
                    handleCreateNewNote = {createNewNote}
                    notes = {notes}
                    currentNote = {currentNote}
                    handleSetCurrentNote = {setCurrentNote}
                    />
                <Editor
                    handleUpdateNote = {updateNote}
                    currentNote = {currentNote}
                    />
            </Split>
    :
    <button onClick={createNewNote}>crea nota</button>
    }
    </div>

    );
}

export {App}