import { useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Box from "@mui/material/Box";
import EditIcon from "@mui/icons-material/Edit";
import TextField from "@mui/material/TextField";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";


function ListComp({getData,todoList}) {
  
  const [editText, setEditText] = useState("");
  const [showIndex, setShowIndex] = useState(-1);
  const [deleteFlag, setDeleteFlag] = useState(false);


  const deleteItem = async (index) => {
    const requestOptions = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },                            //delete item
      body: JSON.stringify({ id: index }),
    };
    await fetch(`list/${index}`, requestOptions);
    getData();
  };

  const editItem = (index) => {
    setShowIndex(index);
    setDeleteFlag(true);
  };

  const editItemClicked = async (id, item) => {                                   //edit an item                                               
    setTimeout(() => {
      setShowIndex(-1);
    },800);
    
    let value;
    if(editText.length===0)
    {
      value=item; 
    }
    else
    {
      value=editText;
    }

    const requestOptions = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ item: value })
    };
    await fetch(`list/edit/${id}`, requestOptions);
    setEditText("");
    setDeleteFlag(false);
    getData();
  };

  const navigate = useNavigate();

  const redirectHome = () => {
    localStorage.clear();
    navigate("/");
  };

  

  return (
    <div className="list"> 
      <Button
        onClick={redirectHome}
        variant="outlined"
        sx={{ left: "40vh", marginBottom: "2%" }}
      >
        Logout
      </Button>
      <div
        className="container"
        style={{
          width: "752px",
          marginLeft: "25%",
          border: "2px solid black",
          backgroundColor: "aliceBlue",
          textAlign: "center",
        }}
      >
        <div style={{ textAlign: "center", display: "block" }}>
          <h1>TODO</h1>
        </div>
        {todoList.map((item, index) => (
          
          <div className="card" key={index}>
            <Box sx={{ flexGrow: 1, maxWidth: 752 }}>
              <List>
                {
                  <ListItem
                    secondaryAction={
                      <>
                        <IconButton
                          onClick={() => editItem(index,item.item)}
                          edge="end"
                          aria-label="delete"
                          >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          disabled={deleteFlag}
                          onClick={() => deleteItem(item.id)}
                          edge="end"
                          aria-label="delete"
                        >
                          <DeleteIcon />
                        </IconButton>
                      </>
                    }
                    >
                    <span style={{ marginRight: "1%" }}>{index + 1}.</span>
                    {showIndex === index && (
                      <>
                        <TextField
                          size="small"
                          onChange={(e) => setEditText(e.target.value)}
                          label="Edit"
                          defaultValue={item.item}
                          variant="filled"
                          autoFocus
                          />
                        <CheckCircleIcon
                          onClick={() => editItemClicked(item.id, item.item)}
                          />
                      </>
                    )}
                    {(showIndex === index ? false : true) && (
                      <ListItemText id={index} primary={item.item} />
                      )}
                  </ListItem>
                }
              </List>
            </Box>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ListComp;
