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
                newNotes = snapshot.docs.map((document)=>{
                        const obj = {
                            ...document.data(),
                            id:document.id,
                        }
                        return obj ;
                    })
                    setNotes(newNotes) ;
                    return unsubscribe ;
                          
        });//fine onSnapShot        
    },[]) ;//fine useEffect    
 
    useEffect(()=>{
        setCurrentNote((prev)=>{
            if(prev !== undefined)
                return {...prev,id:prev.id}
            else return notes[0];
        });
    },[notes]);
  

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
            {notes.length > 0 && currentNote != undefined?
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