import TextField from '@mui/material/TextField';
import './InputComp.css'
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import ListComp from '../list/listComp';
import { useState,useEffect } from 'react';
import Button from '@mui/material/Button';
function InputComp()
{
    const [inputValue,setInputValue]=useState('');
    const [todoList, setTodoList] = useState([]);


    const getData = async () => {
        const userId=localStorage.getItem('userId');
        const userList=await fetch(`list/user/${userId}`)      
        const responseData=await userList.json()                                             //get List data
        setTodoList(responseData);
      };
    
      useEffect(() => {
        getData();
      },[]);
    
    
    const addNewItem=async()=>{
        const id=localStorage.getItem("userId");
        if(inputValue!==''){
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body:JSON.stringify({ item:inputValue,user:id })
            };
            await fetch('list',requestOptions);
            getData();
            setInputValue('');
        }
        else alert("Please Enter a Value")
    }

    const userName=localStorage.getItem("userName");

    return(
        <div className='container'>
            <h1>Welcome {userName}</h1>
            <div className='inputBox'>
                 <TextField value={inputValue} onChange={(e)=>setInputValue(e.target.value)} id="outlined-basic" label="Add new item" variant="outlined" />
                 <Button contained sx={{marginTop:"10px"}}onClick={addNewItem}  variant="outlined"><AddCircleOutlinedIcon/></Button>
            </div>
            <div>
                <ListComp getData={getData} todoList={todoList}/>
            </div>
        </div>
    )
}

export default InputComp;