import React, { useContext,useEffect,useRef,useState } from 'react'
import noteContext from "../context/notes/noteContext"
import NoteItem from './Noteitem'
import Addnote from './Addnote';
import alertContext from '../context/alertContext';
import {  useNavigate,useLocation } from 'react-router-dom';

const Notes = () => {
  const location = useLocation();
  let navigate=useNavigate();
    const context=useContext(noteContext);
    const aContext=useContext(alertContext);
    const {showAlert}=aContext;
    const {notes,getNote,editNote}=context;
    const  nav=()=>{
      navigate('/login')
    }
    useEffect(()=>{
      if(!localStorage.getItem('token')&& location.pathname !== '/login'){nav();showAlert("Please Login First","danger")}
      else{getNote()}
      
      }
      // eslint-disable-next-line
      ,[]
      )
const ref=useRef(null);
const refClose=useRef(null);
const updateNote=(currentNote)=>{
  ref.current.click();
  setNote({id:currentNote._id,etitle:currentNote.title,edescription:currentNote.description,etag:currentNote.tag});
}
const [note,setNote]=useState({id:"",etitle:"",edescription:"",etag:""})
const handleOnClick=()=>{
  editNote(note.id,note.etitle,note.edescription,note.etag)
    refClose.current.click();
    showAlert("Deleted note succesfully","success")
}
const onChange=(e)=>{
  // setNote({...note,[e.target.name]:e.target.value}) cwh
  //Angela Yu
  const {name,value}=e.target;
  setNote((prevaval)=>{
    return{
    ...prevaval,
    [name]:value
    }
  }
  )
    
} 
  return (
    <>
    <Addnote/>
    {/* <!-- Button trigger modal --> */}
<button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
  Launch demo modal
</button>

{/* <!-- Modal --> */}
<div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog" role="document">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Edit note</h5>
        <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">
      <form className='my-3'>
  <div className="mb-3">
    <label htmlFor="etitle" className="form-label">Title</label>
    <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} onChange={onChange}  required/>
  </div>
  <div className="mb-3">
    <label htmlFor="edescription" className="form-label">description</label>
    <input type="text" className="form-control" id="edescription" name="edescription" onChange={onChange} value={note.edescription} required/>
  </div>
  <div className="mb-3">
    <label htmlFor="etag" className="form-label">Tag</label>
    <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={onChange} required/>
  </div>

</form>
      </div>
      <div className="modal-footer">
        <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button onClick={handleOnClick} disabled={note.etitle.length<5 || note.edescription.length<5}type="button" className="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>
    <div className='container row my-3'>
      <h2>Your Notes</h2>
      <div className='container'>
      {notes.length===0 && "No notes to display"}</div>
      {notes.map((note)=>{
    return <NoteItem key={note._id} updateNote={updateNote}  note={note}/>})}
    </div>
  </>

  )
}

export default Notes



