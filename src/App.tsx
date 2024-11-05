import { useState } from 'react';
import { Container, Box, FormControl, InputLabel, Select, MenuItem, Typography } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import companiesConfig from '../companies.json';
import DynamicForm from './components/DynamicForm';

function App() {
  const [selectedCompany, setSelectedCompany] = useState<string>('');

  const handleCompanyChange = (event: SelectChangeEvent) => {
    setSelectedCompany(event.target.value);
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Formulário Dinâmico
        </Typography>
        
        <FormControl fullWidth sx={{ mb: 4 }}>
          <InputLabel id="company-select-label">Selecione a Empresa</InputLabel>
          <Select
            labelId="company-select-label"
            id="company-select"
            value={selectedCompany}
            label="Selecione a Empresa"
            onChange={handleCompanyChange}
          >
            {Object.keys(companiesConfig).map((company) => (
              <MenuItem key={company} value={company}>
                {company}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {selectedCompany && (
          <DynamicForm 
            fields={companiesConfig[selectedCompany as keyof typeof companiesConfig].FormFields}
            onSubmit={(values) => console.log('Form submitted:', values)}
          />
        )}
      </Box>
    </Container>
  );
}

export default App;
