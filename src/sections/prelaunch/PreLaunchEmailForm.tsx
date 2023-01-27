import { m } from 'framer-motion';
import { useRef, useState } from 'react';
import * as Yup from 'yup';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import {
  Stack,
  Alert,
  // makeStyles,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import FormProvider, { RHFTextField } from '../../components/hook-form';
import PreLaunchThankYou from './PreLaunchThankYou';
import { varFade } from '../../components/animate';

// ----------------------------------------------------------------------

type FormValuesProps = {
  email: string;
  firstName: string;
  lastName: string;
  afterSubmit?: string;
};

const defaultValues = {
  firstName: '',
  lastName: '',
  email: '',
};

const inputRootStyles = {
  '.MuiFormLabel-root': {
    color: 'white',
    '&.Mui-focused': {
      color: 'white',
    },
  },
  input: { color: 'white' },
};

export default function PreLaunchEmailForm() {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);

  const RegisterSchema = Yup.object().shape({
    firstName: Yup.string().required('First name required'),
    lastName: Yup.string().required('Last name required'),
    email: Yup.string().required('Email is required').email('Email must be a valid email address'),
  });

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(RegisterSchema),
    defaultValues,
  });

  const {
    reset,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = async (e: any) => {
    try {
      if (emailRef.current && firstNameRef.current && lastNameRef.current) {
        // TODO: use useRequest
        await fetch('/api/subscribeUser', {
          body: JSON.stringify({
            email: emailRef.current.value,
            firstName: firstNameRef.current.value,
            lastName: lastNameRef.current.value,
          }),

          headers: {
            'Content-Type': 'application/json',
          },

          method: 'POST',
        });
        setIsDialogOpen(true);
      }
    } catch (error) {
      console.error(error);
      reset();
      setError('afterSubmit', {
        ...error,
        message: error.message,
      });
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack
        spacing={2.5}
        sx={{
          textAlign: {
            xs: 'center',
            md: 'center',
          },
          pl: {
            xs: 0,
            md: 6,
          },
        }}
      >
        {!!errors.afterSubmit && <Alert severity="error">{errors.afterSubmit.message}</Alert>}

        <Stack
          component={m.div}
          variants={varFade().inDown}
          sx={{
            color: 'common.white',
            typography: 'body1',
          }}
        >
          Don&apos;t miss your chance to be among the first to experience NativeSay and provide
          valuable feedback before it&apos;s officially launched.
          <br />
          <br />
          Sign up for NativeSay beta test now!
        </Stack>

        <Stack
          component={m.div}
          variants={varFade().inDown}
          direction={{ xs: 'column', sm: 'row' }}
          spacing={2}
        >
          <RHFTextField
            inputRef={firstNameRef}
            name="firstName"
            label="First name"
            sx={{ ...inputRootStyles }}
            variant="filled"
          />
          <RHFTextField
            inputRef={lastNameRef}
            name="lastName"
            label="Last name"
            sx={{ ...inputRootStyles }}
            variant="filled"
          />
        </Stack>

        <Stack spacing={3} component={m.div} variants={varFade().inDown}>
          <RHFTextField
            inputRef={emailRef}
            name="email"
            label="Email address"
            sx={{ ...inputRootStyles }}
            variant="filled"
          />

          <LoadingButton
            fullWidth
            color="inherit"
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
            sx={{
              color: 'grey.800',
              bgcolor: 'common.white',
            }}
          >
            Join Beta Test
          </LoadingButton>
        </Stack>
      </Stack>

      {isDialogOpen && <PreLaunchThankYou open={isDialogOpen} setOpen={setIsDialogOpen} />}
    </FormProvider>
  );
}
