import React,{useState} from 'react';
import {Form , Button} from 'semantic-ui-react';
import {useMutation, gql } from '@apollo/client';
import {useNavigate} from 'react-router-dom';

import { useForm } from '../util/hooks';

const REGISTER_USER = gql`
    mutation Register($input: RegisterInput! ){
        register(registerInput: $input){
            id email username createdAt token
        }
    }
`;

function Register(props){

    const navigate = useNavigate();
    const [errors, setErrors] = useState({});

    const {onChange , onSubmit , values} = useForm(registerUser,{
        username:'',
        email:'',
        password:'',
        confirmPassword:''
    });

    const[addUser,{loading}] = useMutation(REGISTER_USER , {
       update(_, result){
        console.log(result);

        navigate("/");
       },
       onError(err){
            setErrors(err.graphQLErrors[0].extensions.errors);
       },
       variables:{
        input:{
            username:values.username,
            password:values.password,
            confirmPassword:values.confirmPassword,
            email:values.email,
        },
    },
     });


    function registerUser(){
        addUser();
    }

    return(
        <div className='form-container' >
            <Form onSubmit={onSubmit} noValidate className={loading? 'loading':''}>
                <h1>Register</h1>
                <Form.Input 
                    label='Username'
                    placeholder='Username..'
                    name ='username'
                    type='text'
                    value={values.username}
                    error={errors.username ? true : false}
                    onChange={onChange}
                    
                />
                <Form.Input 
                    label='Email'
                    placeholder='Email..'
                    name ='email'
                    type='email'
                    value={values.email}
                    error={errors.email ? true : false}
                    onChange={onChange}
                    
                />
                <Form.Input 
                    label='Password'
                    placeholder='Password..'
                    name ='password'
                    type='password'
                    value={values.password}
                    error={errors.password ? true : false}
                    onChange={onChange}
                    
                />
                 <Form.Input 
                    label='Confirm Password'
                    placeholder='Confirm Password..'
                    name ='confirmPassword'
                    type='password'
                    value={values.confirmPassword}
                    error={errors.confirmPassword ? true : false}
                    onChange={onChange}
                    
                />
                <Button type='submit' primary
                >Register
                </Button>
            </Form>
            {Object.keys(errors).length > 0 && (
                <div className="ui error message">
                    <ul className="list">
                        {Object.values(errors).map((value) => (
                            <li key={value}>{value}</li>
                        ))}
                    </ul>
                </div>
                )}
            </div>

    )
}


export default Register;