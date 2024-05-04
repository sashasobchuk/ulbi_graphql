import './App.css';
import {useEffect, useState} from "react";
import {useMutation, useQuery} from "@apollo/client";
import {GET_ALL_USERS, GET_ONE_USER} from "./query/user";
import {CREATE_USER} from "./mutation/user";

function App() {

    const [username, setUsername] = useState('')
    const [age, setAge] = useState(0)
    const {data, loading, error, refetch,} = useQuery(GET_ALL_USERS, {
        // pollInterval:500

    })
    const {data: oneUser, loading: userLoading, error: userError, refetch: userRefetch} =
        useQuery(GET_ONE_USER, {
            variables: {
                id: 1
            }
        })
    console.log(oneUser)
    const [newUser] = useMutation(CREATE_USER)
    console.log(data)
    useEffect(() => {
        if (!loading) {
            setUsers(data.getAllUsers)
        }
    }, [data])

    const getAll = (e) => {
        e.preventDefault()
        refetch()
    }
    const [users, setUsers] = useState([])
    if (loading) {
        return <h1>loading</h1>
    }

    const createUser = (e) => {

        e.preventDefault()
        newUser({
            variables: {
                input: {
                    username, age: +age
                }
            }
        })
            .then(({data}) => {
                setUsers([...users, data.createUser])
                console.log(111, data.createUser)
                setUsername('')
                setAge(0)
            })
            .catch(e => {

                console.log(e)
            })
    }
    return (
        <div>
            <form>
                <input type="text" value={username} placeholder={'username'}
                       onChange={e => setUsername(e.target.value)}/>
                <input type="number" value={age} placeholder={'age'} onChange={e => setAge(e.target.value)}/>
                <div>
                    <button onClick={e => createUser(e)}>Create</button>
                    <button onClick={e => getAll(e)}>get</button>
                </div>
            </form>
            {users.map((user) => {
                return (
                    <div key={user.id}>
                        {user.id} {'  '}
                        {user.username}
                    </div>
                )
            })}
        </div>
    );
}

export default App;
