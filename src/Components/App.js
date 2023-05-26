import React, { useEffect, useState } from "react";
import { Editor } from "./Editor";
import Split from 'react-split' ;
import { Sidebar } from "./Siderbar";
import { infoNotes } from "../dati";
import "./../css/App.css"
function App(){
    let localStorage = window.localStorage ;
    //per il lazy inzialization utilizziamo la funzione
    //siccome localStorage setitem prende una stringa ne dobbiamo fare il parse quando voglioamo l'oggetto
    let [notes,setNotes] = useState(
        ()=>JSON.parse(localStorage.getItem("notes")) == null 
        ?infoNotes
        :JSON.parse(localStorage.getItem("notes")))

    let [currentNote,setCurrentNote] = useState(notes[0]) ;
    //ogni volta che notes cambia, quindi viene ricaricata la componente(perchè viene settato lo stato)
    //viene invocato useEffect solo alla fine di ogni render
    useEffect(()=>{
        localStorage.setItem("notes",JSON.stringify(notes))
    },[notes]) ;    

    function createNewNote(){
        setNotes((prevNotes)=>
            [...prevNotes,
            {
                id:prevNotes[prevNotes.length - 1].id + 1,
                title : "nota",
                body : "questa è una nota questa è una nota"
            }]
        );
       
    }
 
    function updateNote(testo){
        setNotes(prev => prev.map(item =>{
                return item.id === currentNote.id 
                ?{...item,body:testo}
                :item
            }));
        setCurrentNote((prev)=> {return {...prev, body:testo}}) ;
    }
   

    return (
        <Split
            sizes={[30, 70]}
            direction="horizontal"
            className="split"
            >
            <Sidebar 
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
    

    );
    //    <Sidebar/>
    //<Editor/>
        
}

export {App}