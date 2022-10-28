import React,{useContext,useState} from 'react';
import {Form , Button} from 'semantic-ui-react';
import {useMutation, gql } from '@apollo/client';
import {useNavigate} from 'react-router-dom';

import { AuthContext } from '../context/auth';
import { useForm } from '../util/hooks';

export default function Login() {
  const navigate = useNavigate();
  // const { login } = useAuth();
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState({});

  const initialState = {
    username: "",
    password: "",
  };

  const { onChange, onSubmit, values } = useForm(
    loginUserCallback,
    initialState
  );
  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    // this "update" function will be triggered when the mutation is successful
    update(_, {data:{login:userData}}) {
      console.log(userData);
      context.login(userData);
      navigate("/");
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.errors);
    },
    variables:{
        input:{
            username:values.username,
            password:values.password,
        },
    },
  });

  function loginUserCallback() {
    loginUser();
  }

  return (
    <div className="form-container">
      {/* html5 by default tries to validate email field */}
      <Form onSubmit={onSubmit} noValidate className={loading ? "loading" : ""}>
        <h1 style={{ fontWeight: 100 }}>Login</h1>
        <Form.Input
          label="Username"
          placeholder="Username..."
          name="username"
          value={values.username}
          onChange={onChange}
          error={errors.username ? true : false}
          type="text"
        />

        <Form.Input
          label="Password"
          placeholder="Password..."
          name="password"
          value={values.password}
          onChange={onChange}
          error={errors.password ? true : false}
          type="password"
        />
        <Button type="submit" primary>
          Login
        </Button>
      </Form>

      {Object.keys(errors).length > 0 && (
        <div className="ui error message">
          <ul className="list">
            {Object.values(errors).map(value => (
              <li key={value}>{value}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}


const LOGIN_USER = gql`
mutation Login($input: LoginInput!) {
  login(input: $input) {
    id
    email
    username
    createdAt
    token
  }
}
`;