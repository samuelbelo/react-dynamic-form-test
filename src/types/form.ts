export interface Validation {
  required?: boolean;
  pattern?: string;
}

export interface FormField {
  Label: string;
  Type: string;
  Validation?: Validation;
  Options?: string[];
} 