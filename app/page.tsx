'use client'

import { McLaren } from 'next/font/google'
import { useEffect, useState } from 'react';
import { MdNoteAdd, MdDelete, MdEdit } from "react-icons/md";
import { CiMenuKebab } from "react-icons/ci";
import { title } from 'process';

const mclaren = McLaren({
    weight: '400',
    subsets: ['latin'],
})

export default function Home() {
  const [notes, setNotes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [action, setAction] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [editID, setEditID] = useState(null)
  const [editNotes, setEditNotes] = useState({title: '', note: ''})

//Get Notes
const fetchNotes = async ()=>{
  const res = await fetch('http://localhost:3000/api/notes')
  if(!res.ok){
    setError(true)
  }
  const {getNotes} = await res.json()

  setNotes(getNotes)
  setLoading(false)
}

useEffect(()=>{
  fetchNotes()
},[])

//Post Note
const showAddNoteForm = ()=>{
  setShowForm(true)
}

const hideAddNoteForm = ()=>{
  setShowForm(false)
}

const addNote = async (e: React.FormEvent<HTMLFormElement>)=>{
  e.preventDefault();
  const formData = new FormData(e.currentTarget);
  const body = Object.fromEntries(formData);

  const add = await fetch('http://localhost:3000/api/notes',{
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(body)
  })

  if(!add.ok){
    alert('Failed to add note')
    return
  }
  fetchNotes()
  setShowForm(false)
}

//Delete
  const showActionBtn = ()=>{
    setAction(true)
  }

  const deleteNote = async(id: any)=>{
    const del = await fetch(`http://localhost:3000/api/${id}`,{
      method: 'DELETE',
    })
    if(!del.ok){
      alert('Failed to delete')
      return
    }
    fetchNotes()
    setAction(false)
  }

//Edit
const editNote = (note: any)=>{
  setEditID(note.id)
  setEditNotes({title: note.title, note: note.note})
  setAction(false)
}

const cancelEdit = ()=>{
  setEditID(null)
  setEditNotes({title: '', note: ''})
}

const saveEdit = async (id: any)=>{
  const edit = await fetch(`http://localhost:3000/api/${id}`,{
    method: 'PUT',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(editNotes)
  })
  if(!edit.ok){
    alert('Failed to save note')
    return
  }
  fetchNotes()
  cancelEdit()
}

  if(loading) return <h1>Loading...</h1>
  if(error) return <h1>Error fetching data...</h1>

  return (
    <>
    <header className={`${mclaren.className} bg-[#f5ba13] shadow-md py-10`}>
      <div className='w-[90%] mx-auto flex justify-between items-center'>
        <h1 className='text-4xl text-white'>Keeper</h1>
        <MdNoteAdd onClick={showAddNoteForm} className='text-3xl text-white cursor-pointer' />
      </div>
    </header>
    <div className='w-[90%] mx-auto grid grid-cols-4 gap-5 py-10'>
      {notes.map((note:any)=>(
        <div key={note.id} className='h-fit shadow-md bg-white rounded relative p-4'>
          {editID === note.id ? (
            <>
              <input className='w-full focus:outline-none text-lg font-bold mb-2' onChange={(e)=> setEditNotes({...editNotes, title: e.currentTarget.value})} value={editNotes.title} type="text" />
              <textarea className='w-full focus:outline-none text-lg mb-3' onChange={(e)=> setEditNotes({...editNotes, note: e.currentTarget.value})} value={editNotes.note} rows={5}></textarea>

              <div className='w-[60%] mx-auto grid grid-cols-2 gap-5'>
                <button onClick={()=> saveEdit(note.id)} className='bg-green-500 text-white font-bold rounded py-1'>Save</button>
                <button onClick={cancelEdit} className='bg-red-500 text-white font-bold rounded py-1'>Cancel</button>
              </div>
            </>
          ) : (
            <>
              <h2 className='text-lg font-bold mb-2'>{note.title}</h2>
              <p className='text-lg mb-3'>{note.note}</p>
            </>
          )}
          <CiMenuKebab onClick={showActionBtn} className='text-black-500 absolute bottom-2 right-2' />
          {action && (  
          <div className='bg-gray-300 absolute bottom-0 right-0 rounded flex space-x-2 px-2 py-1'>
            <MdEdit onClick={()=> editNote(note)} className='text-gray-600' />
            <MdDelete onClick={()=> deleteNote(note.id)} className='text-gray-600' />
          </div>
          )}
        </div>
      ))}
    </div>
    {showForm && (
    <div className='w-[20%] absolute top-[15%] right-[5%] bg-white shadow-md rounded p-4'>
      <form onSubmit={addNote} className="grid gap-5">
        <input className='focus:outline-none border border-gray-300 rounded p-2' type="text" name='title' placeholder='title' />
        <textarea className='focus:outline-none border border-gray-300 rounded p-2' name='note' rows={5} placeholder='notes' ></textarea>
        <div className='grid grid-cols-2 gap-5'>
          <button className='bg-green-500 hover:bg-green-600 text-white font-bold rounded p-2'>Add</button>
          <button onClick={hideAddNoteForm} className='bg-red-500 hover:bg-red-700 text-white font-bold rounded p-2'>Cancel</button>
        </div>
      </form>
    </div>
    )}
    </>
  );
}
