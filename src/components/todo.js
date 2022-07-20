import React, { useState, useEffect } from 'react'
import "./style.css"

const getLocalData = () => {
    const lists = localStorage.getItem("MyTodoList");
    if (lists) {
        return JSON.parse(lists);
    }
    else {
        return [];
    }
};

const Todo = () => {
    const [inputdata, setInputData] = useState("");
    const [items, setItems] = useState(getLocalData());
    const [isEditItem, setIsEditItem] = useState("");
    const [toogleButton, setToogleButton] = useState(false);
    const addItem = () => {
        if (!inputdata) {
            alert("Please fill the data");
        }
        else if (inputdata && toogleButton) {
            setItems(items.map((curElem) => {
                if (curElem.id === isEditItem) {
                    return { ...curElem, name: inputdata };
                }
                return curElem;
            }));

            setInputData([]);
            setIsEditItem(null);
            setToogleButton(false);
        }
        else {
            const myNewInputData = {
                id: new Date().getTime().toString(),
                name: inputdata,
            }
            setItems([...items, myNewInputData]);
            setInputData("");
        }
    };


    const editItems = (index) => {
        const item_todo_edited = items.find((curElem) => {
            return curElem.id === index;
        });
        setInputData(item_todo_edited.name);
        setIsEditItem(index);
        setToogleButton(true);
    };

    const deleteItem = (index) => {
        const updatedItems = items.filter((curElem) => {
            return curElem.id !== index;
        });
        setItems(updatedItems);
    };

    const removeAll = () => {
        setItems([]);
    };


    useEffect(() => {
        localStorage.setItem("MyTodoList", JSON.stringify(items));
    }, [items])
    return (
        <>
            <div className='main-div'>
                <div className='child-div'>
                    <figure>
                        <img src="https://img.freepik.com/free-icon/todo-list_318-10185.jpg" alt='todologo'></img>
                        <figcaption>Add your list here</figcaption>
                    </figure>
                    <div className='addItems'>
                        <input type="text"
                            placeholder="✍️ Add Items"
                            className="form-control"
                            value={inputdata}
                            onChange={(event) => setInputData(event.target.value)} />
                        {toogleButton ? <i className="far fa-edit  add-btn" onClick={addItem}></i> : <i className="fa fa-plus add-btn" onClick={addItem}></i>}

                    </div>

                    <div className='showItems'>
                        {items.map((curElem) => {
                            return (
                                <div className='eachItem' key={curElem.id}>
                                    <h3>{curElem.name}</h3>
                                    <div className='todo-btn'>
                                        <i className="far fa-edit add-btn" onClick={() => editItems(curElem.id)}></i>
                                        <i className="far fa-trash-alt add-btn" onClick={() => deleteItem(curElem.id)}></i>
                                    </div>
                                </div>
                            )
                        })}

                    </div>
                    <div className='showItems'>
                        <button className='btn effect04' data-sm-link-text="Remove All" onClick={removeAll}>
                            <span>Chceck List</span>
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Todo
