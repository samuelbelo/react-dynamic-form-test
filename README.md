# Formulários Dinâmicos React

Este projeto implementa um sistema de formulários dinâmicos em React, onde diferentes formulários são gerados automaticamente baseados em configurações JSON. A solução foi desenvolvida seguindo princípios de clean code, SOLID e padrões de design React.

## 🚀 Tecnologias Utilizadas

- React
- TypeScript
- Material UI
- Formik
- Yup
- Vite

## 📦 Como Executar

1. Clone o repositório
2. Instale as dependências:

```bash
npm install
```
3. Execute o projeto:

```bash
npm run dev
```
4. Execute os testes:

```bash
npm run test
```

## 🏗️ Arquitetura da Solução

### Estrutura de Arquivos
```
src/
├── components/
│   ├── DynamicForm.tsx    # Componente principal do formulário
│   └── DynamicField.tsx   # Componente de campo individual
├── types/
│   └── form.ts            # Definições de tipos TypeScript
├── App.tsx                # Componente raiz
└── companies.json         # Configurações dos formulários
```

### Componentes Principais

#### DynamicForm
- Responsável pela lógica do formulário
- Gerencia estado e validações usando Formik
- Gera campos dinamicamente baseado na configuração

#### DynamicField
- Renderiza diferentes tipos de campos (text, email, multiselect, etc.)
- Implementa comportamento específico para cada tipo de campo
- Gerencia estados e eventos de campo individual

## 🎯 Princípios SOLID Aplicados

### Single Responsibility Principle (SRP)
- Cada componente tem uma única responsabilidade
- DynamicForm: gerenciamento do formulário
- DynamicField: renderização de campos específicos

### Open/Closed Principle (OCP)
- Sistema extensível para novos tipos de campos
- Novas empresas podem ser adicionadas sem modificar código existente
- Implementação via switch case permite fácil adição de novos tipos

### Interface Segregation Principle (ISP)
- Interfaces pequenas e específicas (FormField, Validation)
- Props interfaces segregadas por responsabilidade

### Dependency Inversion Principle (DIP)
- Componentes dependem de abstrações (interfaces)
- Baixo acoplamento entre componentes

## 🎨 Padrões de Design React

### Compound Components
- Separação clara entre DynamicForm e DynamicField
- Componentes trabalham juntos mantendo coesão

### Container/Presenter Pattern
- App.tsx atua como container
- DynamicField como componente de apresentação
- Separação clara entre lógica e apresentação

### Props Drilling Prevention
- Uso eficiente de props
- Estrutura hierárquica clara

## 💡 Funcionalidades

- Formulários gerados dinamicamente via JSON
- Validação de campos customizada
- Suporte para múltiplos tipos de campos:
  - Text
  - Email
  - Number
  - Date
  - Textarea
  - Multiselect
- Validações incluem:
  - Campos obrigatórios
  - Formato de email
  - Padrões customizados (regex)
  - Validação numérica

## 🔄 Extensibilidade

### Adicionando Novas Empresas
Para adicionar uma nova empresa, basta incluir sua configuração no arquivo `companies.json`:

```json
{
  "NovaEmpresa": {
    "FormFields": [
      {
        "Label": "Campo1",
        "Type": "text",
        "Validation": {
          "required": true
        }
      }
      // ... mais campos
    ]
  }
}
```

### Adicionando Novos Tipos de Campo
1. Adicione o novo tipo na interface FormField
2. Implemente o caso no switch do DynamicField
3. Adicione validações específicas se necessário

## 🔍 Boas Práticas

- Uso consistente de TypeScript para type safety
- Componentização eficiente
- Validação robusta com Formik e Yup
- Código limpo e bem documentado
- Nomes descritivos e semânticos
- Gerenciamento de estado eficiente
- Reutilização de código
- Tratamento adequado de erros

## 📝 Notas Adicionais

- A solução é escalável e pode ser facilmente expandida
- Manutenção simplificada devido à arquitetura modular
- Performance otimizada com renderização condicional
- Interface responsiva e acessível