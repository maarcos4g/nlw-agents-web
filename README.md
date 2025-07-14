# Let Me Ask

Um app web para criar salas de perguntas e respostas com inteligência artificial, desenvolvido com React, TypeScript e TailwindCSS.

## Funcionalidades

- Criação de salas para perguntas e respostas
- Listagem de salas recentes
- Envio de perguntas para a IA responder
- Listagem de perguntas e respostas em tempo real
- Gravação e envio de áudio para perguntas (MediaRecorder API)
- Interface responsiva e moderna

## Tecnologias Utilizadas

- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [TailwindCSS](https://tailwindcss.com/)
- [React Hook Form](https://react-hook-form.com/)
- [Zod](https://zod.dev/)
- [React Query](https://tanstack.com/query/latest)
- [Radix UI](https://www.radix-ui.com/)
- [Lucide Icons](https://lucide.dev/)
- [Day.js](https://day.js.org/)

## Como rodar o projeto

1. Instale as dependências:
   ```sh
   npm install
   # ou
   pnpm install
   ```

2. Inicie o servidor de desenvolvimento:
   ```sh
   npm run dev
   # ou
   pnpm dev
   ```

3. Acesse [http://localhost:5173](http://localhost:5173) no navegador.

> **Obs:** Certifique-se de que a API backend esteja rodando em `http://localhost:3333`.

## Estrutura de Pastas

- `src/components`: Componentes reutilizáveis da interface
- `src/pages`: Páginas principais do app
- `src/http`: Hooks para integração com a API
- `src/lib`: Utilitários e configurações globais
- `src/index.css`: Estilos globais com TailwindCSS

## Contribuição

Sinta-se à vontade para abrir issues ou pull requests!

---