import React, { useEffect, useState } from "react" ;
import { Editor } from "./Editor" ;
import Split from 'react-split' ;
import { Sidebar } from "./Siderbar" ;
import { infoNotes } from "../dati" ;
import "./../css/App.css" ;

function App(){
    let localStorage = window.localStorage ;
    //per il lazy inzialization utilizziamo la funzione
    //siccome localStorage setitem prende una stringa ne dobbiamo fare il parse quando voglioamo l'oggetto
    let [notes,setNotes] = useState(
        JSON.parse(localStorage.getItem("notes")).length === 0
        ?infoNotes
        :()=>JSON.parse(localStorage.getItem("notes"))
    );

    let [currentNote,setCurrentNote] = useState(notes[0]) ;
    //ogni volta che notes cambia, quindi viene ricaricata la componente(perchè viene settato lo stato)
    //viene invocato useEffect solo alla fine di ogni render
    useEffect(()=>{
        localStorage.setItem("notes",JSON.stringify(notes))
    },[notes]) ;    
    
    
    function createNewNote(){
        setNotes((prevNotes)=>{
            if(prevNotes.length === 0){
                return infoNotes
            }
            else{
                return [...prevNotes,
                {
                    id:prevNotes[prevNotes.length - 1].id + 1,
                    title : "nota",
                    body : "questa è una nota questa è una nota"
                }
            ]
        }});
       
    }
 
    function updateNote(testo){
        //in modo che la nota che si sta modificando finisce al primo posto
        let newArray = [] ;
        for(let i = 0; i < notes.length ; i++){
            if(notes[i].id === currentNote.id)
                newArray.unshift(
                    {
                        ...notes[i],
                        title:testo.split("\n")[0],
                        body:testo
                    }
                ) ;
            else newArray.push(notes[i]) ;
        }
        setNotes(newArray) ;
        /*setNotes(prev => prev.map(item =>{
                return item.id === currentNote.id 
                ?{...item,
                    title:testo.split("\n")[0] ,
                    body:testo
                }
                :item
            }));*/
        setCurrentNote((prev)=> {
            return {
                ...prev,
                body:testo
            }
        }) ;
    }
   
    function deleteCurrentNote(){
        setNotes(prev => prev.filter((item)=>{
                return item !== currentNote
            })
        );
        setCurrentNote(notes[0]) ;
    }
    return (
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
    

    );
}

export {App}