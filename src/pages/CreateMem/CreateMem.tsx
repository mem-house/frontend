import { FileUploader } from 'react-drag-drop-files';
import { Controller, useForm } from 'react-hook-form';

import { Button, Typography } from '@mui/material';
import { Box, Container } from '@mui/system';

import { encode } from 'base64-arraybuffer';
import { useSnackbar } from 'notistack';

import CustomTextField from '../../components/CustomTextField';
import { FullCenteredFlexBox } from '../../components/styled';
import { CreateMemMutationVariables, useCreateMemMutation } from '../../generated/graphql';

type FormInput = Omit<CreateMemMutationVariables, 'imgsBuffers'> & { images: FileList };

function CreateMem() {
  const {
    reset,
    control,
    register,
    handleSubmit,
    formState: { errors: formErrors },
  } = useForm<FormInput>();
  const { enqueueSnackbar } = useSnackbar();
  const [createMemMutation] = useCreateMemMutation({ errorPolicy: 'all' });

  const onSubmit = async (params: FormInput) => {
    const imgsBuffers: string[] = [];

    for (const image of params.images) {
      const buffer = await image.arrayBuffer();
      imgsBuffers.push(encode(buffer));
    }

    const creationResult = await createMemMutation({
      variables: { text: params.text || undefined, tags: params.tags || undefined, imgsBuffers },
    });

    if ('errors' in creationResult) {
      enqueueSnackbar('Ошибка', { variant: 'error' });
    }

    enqueueSnackbar('Успешно', { variant: 'success' });
    reset();
  };

  return (
    <Container component="main" maxWidth="xs">
      <FullCenteredFlexBox>
        <Typography component="h1" variant="h5">
          Create Mem
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
          <Controller
            name="images"
            control={control}
            render={({ field }) => (
              <FileUploader
                multiple={true}
                handleChange={field.onChange}
                types={['png', 'jpeg']}
                maxSize={10} // in mb
              />
            )}
          />

          <CustomTextField
            label="Text"
            type="text"
            multiline
            {...register('text')}
            error={formErrors.text ? true : false}
            helperText={formErrors.text?.message}
          />

          <CustomTextField
            label="Tags"
            type="text"
            {...register('tags')}
            error={formErrors.tags ? true : false}
            helperText={formErrors.tags?.message}
          />

          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Create
          </Button>
        </Box>
      </FullCenteredFlexBox>
    </Container>
  );
}

export default CreateMem;
