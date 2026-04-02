import React, { useState } from 'react'
import Data from './Data.json'

const TodoList = () => {
    const [tododata, settododata] = useState(Data)
    const [id, setid] = useState(0)
    const [firstname, setfirstname] = useState("")
    const [lastname, setlastname] = useState("")

    const handleEdit = (id) => {
        const dt = tododata.find(item => item.id === id)
        setfirstname(dt.firstname)
        setlastname(dt.lastname)
        setid(id)
    }
    const handleDelete = (id) => {
        if (id > 0) {
            const dt = tododata.filter(item => item.id !== id)
            settododata(dt)
        }
    }
    const handleSave = (e) => {
        e.preventDefault()
        const dt = [...tododata];
        const newobj = {
            "id": tododata.length > 0 ? Math.max(...tododata.map(i => i.id)) + 1 : 1,
            "firstname": firstname,
            "lastname": lastname
        }
        dt.push(newobj)
        settododata(dt)
        handleClear()
        if (!firstname.trim() || !lastname.trim()) {
            alert("Add complete Data");
            return;
        }
    }

    const handleUpdate = () => {
        const index = tododata.map((item) => {
            return item.id
        }).indexOf(id)
        const dt = [...tododata];
        dt[index] = {
            ...dt[index],
            firstname: firstname,
            lastname: lastname
        };
        settododata(dt)
        handleClear()

    }
    const handleClear = () => {
        setid(0)
        setfirstname('')
        setlastname('')
    }


    return (
        <>
            <div>
                <input type="text" placeholder='enter name' onChange={(e) => setfirstname(e.target.value)} value={firstname} />
                <input type="text" placeholder='enter lastname' onChange={(e) => setlastname(e.target.value)} value={lastname} />
                <button onClick={handleSave} disabled={id !== 0}>save</button>
                <button onClick={handleClear}>clear</button>
                <button onClick={handleUpdate} disabled={id === 0}>update</button>
            </div>
            <table className="border-collapse border border-gray-400 w-full">
                <thead className="bg-gray-200">
                    <tr>
                        <th>Sr.no</th>
                        <th>ID</th>
                        <th>Firstname</th>
                        <th>Lastname</th>
                    </tr>
                </thead>
                <tbody>
                    {tododata.map((item, index) => (
                        <tr key={item.id} className="hover:bg-gray-100">
                            <td>{index + 1}</td>
                            <td>{item.id}</td>
                            <td>{item.firstname}</td>
                            <td>{item.lastname}</td>
                            <td><button onClick={() => handleEdit(item.id)}>edit</button>
                                <button onClick={() => handleDelete(item.id)}>delete</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}

export default TodoList