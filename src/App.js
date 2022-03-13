import './App.css';
import { useState, useEffect } from 'react';
import Axios from 'axios';

function App() {

  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [mail, setMail] = useState("");
  const [listOfFriends, setListOfFriends] = useState([]);


  const addFriend = () => {
    Axios.post("http://localhost:3001/addfriend", {
      name: name,
      age: age,
      mail: mail,
    }).then((response) => {
      setListOfFriends([...listOfFriends, {_id: response.data._id, name: name, age: age, mail: mail}]);
    });
  };

  const updateFriend = (id) => {
    const newAge = prompt("Entrez votre nouvelle Age: ");
    
    Axios.put("http://localhost:3001/update", {newAge: newAge, id: id}).then(() => {
      setListOfFriends(listOfFriends.map((val) => {
        return val._id == id 
        ? {_id: id, name: val.name, age: newAge, mail: val.mail} 
        : val;

      }))
    });
  };


  const deleteFriend = (id) => {
    Axios.delete(`http://localhost:3001/delete/${id}`).then(() => {
      setListOfFriends(
        listOfFriends.filter((val) => {
          return val._id != id;
        })
      );
    });
  };

  useEffect(() => {
    Axios.get("http://localhost:3001/read", {
      name: name,
      age: age,
      mail: mail,
    })
    .then((response) =>{
      setListOfFriends(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
  
  }, [])


  return  (
<div className="App">
   <div className="inputs">
     <input 
        type="text" 
        placeholder='Nom...' 
        onChange={(e) =>{
          setName(e.target.value);
      }}
     />
     <input 
        type="number"
        placeholder='Age'
        onChange={(e) =>{
          setAge(e.target.value);
      }}  
      />
     <input 
        type="text"
        placeholder='Email'
        onChange={(e) =>{
          setMail(e.target.value);
     }} 
     />

     <button onClick={addFriend}>Je m'ajoute</button>
   </div>

     <div className="listOfFriends"> 

          {listOfFriends.map((val) => {
            return ( 
              <div className="friendContainer"> 
                <div className="friend">
                    <h4> Nom: {val.name} </h4>  
                    <h4> Age: {val.age} </h4> 
                    <h4> mail: {val.mail} </h4>  
                </div>
                    <button 
                    onClick={() => {
                        updateFriend(val._id);
                      }}
                      > 
                       Update
                     </button>
                   
                    <button 
                    id="RemouveBtn" 
                    onClick={() => {
                      deleteFriend(val._id);
                    }}
                    > 
                      X 
                    </button>
                </div>
              );
          })};
     </div>
</div>
  );
  
}

export default App;
