import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DynamicForm from '../DynamicForm';
import { FormField } from '../../types/form';

describe('DynamicForm', () => {
  const mockOnSubmit = vi.fn();

  const mockFields: FormField[] = [
    {
      Label: 'Nome',
      Type: 'text',
      Validation: {
        required: true
      }
    },
    {
      Label: 'Email',
      Type: 'email',
      Validation: {
        required: true
      }
    },
    {
      Label: 'Idade',
      Type: 'number',
      Validation: {
        required: true
      }
    },
    {
      Label: 'Telefone',
      Type: 'text',
      Validation: {
        pattern: '^\\d{11}$',
        required: true
      }
    }
  ];

  it('should render all fields correctly', () => {
    render(<DynamicForm fields={mockFields} onSubmit={mockOnSubmit} />);
    
    mockFields.forEach(field => {
      expect(screen.getByLabelText(field.Label)).toBeInTheDocument();
    });
    
    expect(screen.getByRole('button', { name: /enviar/i })).toBeInTheDocument();
  });

  it('should validate email format', async () => {
    render(<DynamicForm fields={mockFields} onSubmit={mockOnSubmit} />);
    
    const emailInput = screen.getByLabelText('Email');
    await userEvent.type(emailInput, 'invalid-email');
    
    const submitButton = screen.getByRole('button', { name: /enviar/i });
    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Email inválido')).toBeInTheDocument();
    });

    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  it('should validate pattern', async () => {
    render(<DynamicForm fields={mockFields} onSubmit={mockOnSubmit} />);
    
    const phoneInput = screen.getByLabelText('Telefone');
    await userEvent.type(phoneInput, '123');
    
    const submitButton = screen.getByRole('button', { name: /enviar/i });
    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Formato inválido')).toBeInTheDocument();
    });

    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

}); 