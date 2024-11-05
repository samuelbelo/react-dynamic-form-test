import { render, screen, fireEvent } from '@testing-library/react';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import DynamicField from '../DynamicField';
import { FormField } from '../../types/form';

describe('DynamicField', () => {
  const mockOnChange = vi.fn();
  const mockOnBlur = vi.fn();

  beforeEach(() => {
    mockOnChange.mockClear();
    mockOnBlur.mockClear();
  });

  test('renders a default text field correctly', () => {
    const field: FormField = {
      Label: 'Name',
      Type: 'text',
      Validation: {
        required: true
      }
    };

    render(
      <DynamicField
        field={field}
        value=""
        onChange={mockOnChange}
        onBlur={mockOnBlur}
      />
    );

    const textField = screen.getByLabelText('Name');
    expect(textField).toBeInTheDocument();
    expect(textField).toHaveAttribute('type', 'text');
  });

  test('renders a textarea field correctly', () => {
    const field: FormField = {
      Label: 'Description',
      Type: 'textarea',
      Validation: {
        required: true
      }
    };

    render(
      <DynamicField
        field={field}
        value=""
        onChange={mockOnChange}
        onBlur={mockOnBlur}
      />
    );

    const textarea = screen.getByLabelText('Description');
    expect(textarea).toBeInTheDocument();
    expect(textarea.tagName.toLowerCase()).toBe('textarea');
  });

  test('renders a date field correctly', () => {
    const field: FormField = {
      Label: 'Date',
      Type: 'date',
      Validation: {
        required: true
      }
    };

    render(
      <DynamicField
        field={field}
        value="2024-03-20"
        onChange={mockOnChange}
        onBlur={mockOnBlur}
      />
    );

    const dateField = screen.getByLabelText('Date');
    expect(dateField).toBeInTheDocument();
    expect(dateField).toHaveAttribute('type', 'date');
    expect(dateField).toHaveValue('2024-03-20');
  });


  test('displays error message when provided', () => {
    const field: FormField = {
      Label: 'Name',
      Type: 'text',
      Validation: {
        required: true
      }
    };

    render(
      <DynamicField
        field={field}
        value=""
        onChange={mockOnChange}
        onBlur={mockOnBlur}
        error={true}
        helperText="This field is required"
      />
    );

    expect(screen.getByText('This field is required')).toBeInTheDocument();
  });

  test('calls onChange when value changes', () => {
    const field: FormField = {
      Label: 'Name',
      Type: 'text',
      Validation: {
        required: true
      }
    };

    render(
      <DynamicField
        field={field}
        value=""
        onChange={mockOnChange}
        onBlur={mockOnBlur}
      />
    );

    const input = screen.getByLabelText('Name');
    fireEvent.change(input, { target: { value: 'New value' } });
    
    expect(mockOnChange).toHaveBeenCalled();
  });
}); 