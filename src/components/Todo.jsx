import { useState, useEffect } from "react";
export default function Todo() {
    const [todo, setTodo] = useState([]);
    const [load, setLoad] = useState(false);
    const [err, setErr] = useState(false);
    const [page, setPage] = useState(1);

    const getdata = (api) => {
        return fetch(api).then((res) => res.json());
    };
    const handlePage = (val) => {
        const newPage = val + page;

        setPage(newPage);
    };

    useEffect(() => {
        console.log(1);
        fetchandGetTodo(page);
    }, [page]);

    const fetchandGetTodo = async (page) => {
        try {
            setLoad(true);
            const data = await getdata(`https://jsonplaceholder.typicode.com/todos?_limit=10&_page=${page}`);
            setTodo(data);
            setLoad(false)
        } catch (error) {
            setLoad(false);
            setErr(true);
            console.log(error);
        }
    };

    if (load) {
        return <h1>Loading...</h1>
    }
    if (err) {
        return <h1>Something went wrong // ...</h1>
    }

    return (
        <>
            <h1 style={{color:"teal"}}>Welcome to todo App With Paging</h1>
            <hr />
            {todo.map((el) => (
                <div key={el.id} style={{ borderRadius:"20px", border: "1px solid black", margin: "20px", padding: "8px" ,background:"yellow",boxShadow:"8px 8px 10px "}}>
                    <h3>Id:{el.id}</h3>
                    <h4>Title:{el.title}</h4>
                    <h5>Status:{el.completed ? "Yes" : "No"}</h5>
                    <h6>UserId:{el.userId}</h6>
                </div>
            ))}

            <button  style={{background:"teal",color:"white",padding:"5px", borderRadius:"8px" ,margin:"3px",cursor:"pointer"}} onClick={() => handlePage(-1)} disabled={page == 1} >Previous </button>
            <button style={{background:"teal",color:"white",padding:"5px", borderRadius:"8px" ,margin:"3px"}} >{page}</button>
            <button  style={{background:"teal",color:"white",padding:"5px", borderRadius:"8px" ,margin:"3px",cursor:"pointer"}} onClick={() => handlePage(1)}>Next</button>
        </>
    )

}