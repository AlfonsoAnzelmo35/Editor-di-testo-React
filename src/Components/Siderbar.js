import React from "react" ;

import "../css/Sidebar.css" ;
function Sidebar(props){

    let listNotes = props.notes.map((item, index)=>{
        return (
            <div key={index}>
                {
                    props.currentNote.id === item.id?
                    <h3
                        data-selected="selected" 
                        onClick={()=>props.handleSetCurrentNote(item)} >
                        {item.title}
                        <img 
                            onClick={props.handleDeleteCurrentNote}
                            className = "cestino" 
                            src={require("./../images/cestino.png")}
                            alt="cestino"
                        />

                    </h3>
                    :     
                    <h3 
                        onClick={()=>props.handleSetCurrentNote(item)} >
                        {item.title}
                        <img 
                            onClick={props.handleDeleteCurrentNote}
                            className = "cestino"
                            src={require("./../images/cestino.png")} 
                            alt="cestino"
                        />
                    </h3>
                }
            </div>
        )
    })
    return (
        <div className="sidebar">
            <div className = "sidebar-header">
                <span>Notes</span>
                <button onClick={props.handleCreateNewNote}>+</button>
            </div>
            {listNotes}
            
        </div>
    );  
}

export {Sidebar} ;