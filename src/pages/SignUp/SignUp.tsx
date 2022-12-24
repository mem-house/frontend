import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import LockOpenIcon from '@mui/icons-material/LockOpen';
import { Avatar, Box, Button, Container, Divider, Link, Typography } from '@mui/material';

import { useSnackbar } from 'notistack';

import BlockPageWhileLoading from '../../components/BlockPageWhileLoading';
import CustomTextField from '../../components/CustomTextField';
import { AUTH_TOKEN } from '../../constants/auth-token.constant';
import { SignUpMutationVariables, useSignUpMutation } from '../../generated/graphql';
import { ErrorResponse } from '../../interfaces/error-response.interface';
import routes from '../../routes/index';
import { Pages } from '../../routes/types';

function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
  } = useForm<SignUpMutationVariables>();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [signUpMutation, { loading }] = useSignUpMutation({ errorPolicy: 'all' });

  const onSubmit = async (params: SignUpMutationVariables) => {
    const { data, errors } = await signUpMutation({ variables: params });

    if (errors) {
      const response = errors[0].extensions.response as ErrorResponse;
      const message = Array.isArray(response.message)
        ? response.message.join('. ')
        : response.message;

      enqueueSnackbar(message, { variant: 'error' });
    }

    if (data) {
      localStorage.setItem(AUTH_TOKEN, data?.registration.jwtToken);
      enqueueSnackbar('Регистрация успешна', { variant: 'success' });
      navigate(routes[Pages.Profile].path);
    }
    // client.resetStore() - for logout
  };

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <Container component="main" maxWidth="xs">
      <BlockPageWhileLoading isLoading={loading} />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOpenIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
          {/* register your input into the hook by invoking the "register" function */}
          <CustomTextField
            label="Email Address"
            type="email"
            {...register('email', {
              required: 'Email Address is required',
              pattern: {
                // Check the @ and . in email
                value: new RegExp('.+@.+..+'),
                message: 'It is not a valid email address',
              },
            })}
            error={formErrors.email ? true : false}
            helperText={formErrors.email?.message}
          />

          {/* include validation with required or other standard HTML validation rules */}
          <CustomTextField
            label="Password"
            type="password"
            {...register('password', {
              required: 'Password is required',
              minLength: { value: 6, message: 'Password must be at least 6 characters' },
            })}
            error={formErrors.password ? true : false}
            helperText={formErrors.password?.message}
          />

          <Divider sx={{ p: 1 }} />

          <CustomTextField
            label="Nickname"
            type="text"
            {...register('nickname', {
              required: 'Nickname is required',
              minLength: { value: 1, message: 'Nickname must be at least 1 character' },
            })}
            error={formErrors.nickname ? true : false}
            helperText={formErrors.nickname?.message}
          />

          <CustomTextField
            label="Name"
            type="text"
            {...register('name', {
              required: 'Name is required',
              minLength: { value: 1, message: 'Name must be at least 1 character' },
            })}
            error={formErrors.name ? true : false}
            helperText={formErrors.name?.message}
          />

          <CustomTextField
            label="Surname"
            type="text"
            {...register('surname', {
              required: 'Surname is required',
              minLength: { value: 1, message: 'Surname must be at least 1 character' },
            })}
            error={formErrors.surname ? true : false}
            helperText={formErrors.surname?.message}
          />

          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Sign Up
          </Button>
          <Link href={routes[Pages.SignIn].path} variant="body2">
            {'Already have an account? Sign Ip'}
          </Link>
        </Box>
      </Box>
    </Container>
  );
}

export default SignUp;
