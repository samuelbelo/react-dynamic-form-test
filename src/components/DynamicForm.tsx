import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Button, Box } from '@mui/material';
import { FormField } from '../types/form';
import DynamicField from './DynamicField';

interface DynamicFormProps {
  fields: FormField[];
  onSubmit: (values: unknown) => void;
}

const DynamicForm = ({ fields, onSubmit }: DynamicFormProps) => {
  const initialValues: { [key: string]: string } = fields.reduce((acc, field) => ({
    ...acc,
    [field.Label]: '',
  }), {});

  const validationSchema = Yup.object().shape(
    fields.reduce((acc, field) => {
      let validator = Yup.string();

      if (field.Validation?.required) {
        validator = validator.required('Este campo é obrigatório');
      }

      if (field.Type === 'email') {
        validator = validator.email('Email inválido');
      }
      if (field.Type === 'number') {
        validator = validator.matches(/^\d+$/, 'Este campo deve ser um número');
      }

      if (field.Validation?.pattern) {
        validator = validator.matches(
          new RegExp(field.Validation.pattern),
          'Formato inválido'
        );
      }

      return {
        ...acc,
        [field.Label]: validator,
      };
    }, {})
  );

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {fields.map((field) => (
          <DynamicField
            key={field.Label}
            field={field}
            value={formik.values[field.Label] as string}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched[field.Label] && Boolean(formik.errors[field.Label])}
            helperText={formik.touched[field.Label] && formik.errors[field.Label] ? formik.errors[field.Label] as string : undefined}
          />
        ))}
        <Button type="submit" variant="contained" color="primary">
          Enviar
        </Button>
      </Box>
    </form>
  );
};

export default DynamicForm; 