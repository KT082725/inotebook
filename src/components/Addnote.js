import React, { useState,useContext } from 'react'
import noteContext from "../context/notes/noteContext"

  
const Addnote = (props) => {
    const context=useContext(noteContext);
    const {addNote}=context;
    const [note,setNote]=useState({title:"",desc:"",tag:"default"})
const handleOnClick=(element)=>{
    addNote(note.title,note.desc,note.tag);
    element.preventDefault();
    setNote({title:"",desc:"",tag:""});
    props.showAlert("Added note succesfully","success")
}
const onChange=(e)=>{
    setNote({...note,[e.target.name]:e.target.value})
} 
  return (
    <div>
       <div className='my-3'>
      <h1>Add a Note</h1>
      <form className='my-3'>
  <div className="mb-3">
    <label htmlFor="title" className="form-label">Title</label>
    <input type="text" className="form-control" id="title" name="title" value={note.title}onChange={onChange} required/>
  </div>
  <div className="mb-3">
    <label htmlFor="desc" className="form-label">Description</label>
    <input type="text" className="form-control" id="desc" name="desc" value={note.desc}onChange={onChange} required/>
  </div>
  <div className="mb-3">
    <label htmlFor="tag" className="form-label">Tag</label>
    <input type="text" className="form-control" id="tag" name="tag" onChange={onChange} value={note.tag} required/>
  </div>

  <button type="submit" disabled={note.title.length<5 || note.desc.length<5}className="btn btn-primary" onClick={handleOnClick}>Add Note</button>
</form>
    </div>
    </div>
  )
}

export default Addnote
