import { TextField, MenuItem, Select, FormControl, InputLabel, FormHelperText, SelectChangeEvent } from '@mui/material';
import { FormField } from '../types/form';
import { ChangeEventHandler, FocusEventHandler, ReactNode } from 'react';

interface DynamicFieldProps {
  field: FormField;
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  onBlur: FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  error?: boolean;
  helperText?: string;
}

interface SelectFieldProps {
  onChange: (event: SelectChangeEvent<string | never[]>, child: ReactNode) => void;
}

const DynamicField = ({
  field,
  value,
  onChange,
  onBlur,
  error,
  helperText,
}: DynamicFieldProps & SelectFieldProps) => {
  switch (field.Type) {
    case 'multiselect':
      return (
        <FormControl fullWidth error={error}>
          <InputLabel>{field.Label}</InputLabel>
          <Select
            multiple
            name={field.Label}
            value={value || []}
            onChange={onChange}
            onBlur={onBlur}
            label={field.Label}
          >
            {field.Options?.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
          {helperText && <FormHelperText>{helperText}</FormHelperText>}
        </FormControl>
      );

    case 'textarea':
      return (
        <TextField
          fullWidth
          multiline
          rows={4}
          name={field.Label}
          label={field.Label}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          error={error}
          helperText={helperText}
        />
      );

    case 'date':
      return (
        <TextField
          fullWidth
          name={field.Label}
          label={field.Label}
          type="date"
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          error={error}
          helperText={helperText}
          slotProps={{
            inputLabel: {
                shrink: true,
            }
          }}
        />
      );

    default:
      return (
        <TextField
          fullWidth
          name={field.Label}
          label={field.Label}
          type={field.Type}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          error={error}
          helperText={helperText}
        />
      );
  }
};

export default DynamicField;