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

  test('renderiza um campo de texto padrão corretamente', () => {
    const field: FormField = {
      Label: 'Nome',
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

    const textField = screen.getByLabelText('Nome');
    expect(textField).toBeInTheDocument();
    expect(textField).toHaveAttribute('type', 'text');
  });

  test('renderiza um campo textarea corretamente', () => {
    const field: FormField = {
      Label: 'Descrição',
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

    const textarea = screen.getByLabelText('Descrição');
    expect(textarea).toBeInTheDocument();
    expect(textarea.tagName.toLowerCase()).toBe('textarea');
  });

  test('renderiza um campo de data corretamente', () => {
    const field: FormField = {
      Label: 'Data',
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

    const dateField = screen.getByLabelText('Data');
    expect(dateField).toBeInTheDocument();
    expect(dateField).toHaveAttribute('type', 'date');
    expect(dateField).toHaveValue('2024-03-20');
  });


  test('exibe mensagem de erro quando fornecida', () => {
    const field: FormField = {
      Label: 'Nome',
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
        helperText="Este campo é obrigatório"
      />
    );

    expect(screen.getByText('Este campo é obrigatório')).toBeInTheDocument();
  });

  test('chama onChange quando o valor é alterado', () => {
    const field: FormField = {
      Label: 'Nome',
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

    const input = screen.getByLabelText('Nome');
    fireEvent.change(input, { target: { value: 'Novo valor' } });
    
    expect(mockOnChange).toHaveBeenCalled();
  });
}); 