import { FC, useEffect, useState } from 'react';
import CreateUserForm from '../Components/CreateUserForm';
import Header from '../Components/Header';
import LoginUserForm from '../Components/LoginUserForm';
import { postUser } from '../Services/ApiService';
import { User } from '../Models/User';

const Home: FC = () => {
const [userName, setUserName] = useState<string>("");

useEffect(() => {
  console.log(userName);
}, [userName]);  

const handleCreateUser = async (submittedUserName: string) => {
  try {
    const createdUser: User = await postUser(submittedUserName);
    setUserName(createdUser.username);
  } catch (error) {
    console.error('Error creating user:', error);
  } 
};

const handleLoginUser = (submittedUserName : string) => {
  setUserName(submittedUserName);
};

    return(
      <div>
        <Header userName={userName}/>

        <CreateUserForm 
          onSubmit={handleCreateUser}          
        />

        <LoginUserForm 
          onSubmit={handleLoginUser}
        />
      </div>
     
    )    
}
  
  export default Home;