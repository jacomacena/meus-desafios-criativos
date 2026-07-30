# 💡 PlanejaAI — Frontend App

> Aplicação web do **PlanejaAI (Educador Financeiro Inteligente)** construída com React 19, TypeScript, Vite, Tailwind CSS e API do Google Gemini.

Para visualizar a documentação completa da proposta conceitual, arquitetura e guia do projeto, consulte o arquivo [README.md principal](../README.md).

---

## 🚀 Guia Rápido de Execução

### 1. Instalar dependências
```bash
npm install
# ou
pnpm install
```

### 2. Configurar Variáveis de Ambiente
Crie um arquivo `.env.local` baseado em `.env.example`:
```bash
cp .env.example .env.local
```
Adicione a sua chave da API do Google Gemini:
```env
VITE_GEMINI_API_KEY=sua_chave_gemini_aqui
```

### 3. Rodar em Modo de Desenvolvimento
```bash
npm run dev
```

### 4. Scripts Úteis
- `npm run dev`: Inicia o servidor local de desenvolvimento.
- `npm run build`: Compila e gera os arquivos estáticos de produção na pasta `dist`.
- `npm run lint`: Executa a verificação estática do código utilizando Oxlint.
- `npm run preview`: Visualiza a versão compilada de produção localmente.
