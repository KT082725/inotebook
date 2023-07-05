import { useState } from "react";
import NoteContext from "./noteContext";
// import { useState } from "react";
const NoteState=(props)=>{
    const notesInitial=[
        {
          "_id": "64a00e0159cc7bbf606c1371",
          "user": "649dd26b14674d2a31019104",
          "title": "My title",
          "description": "Please Wake Up Early",
          "tag": "personal",
          "date": "2023-07-01T11:29:05.651Z",
          "__v": 0
        },
        {
          "_id": "64a00e54c6babdd333da996a",
          "user": "649dd26b14674d2a31019104",
          "title": "My title",
          "description": "Please Wake Up Early",
          "tag": "personal",
          "date": "2023-07-01T11:30:28.914Z",
          "__v": 0
        }]

        const [notes,setNotes]=useState(notesInitial)
      
    return(
        <NoteContext.Provider value={{notes,setNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;