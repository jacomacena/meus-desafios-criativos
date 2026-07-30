# 💡 PlanejaAI — Educador Financeiro Inteligente

> Um assistente de planejamento financeiro pessoal simples, amigável e acessível para todos os públicos, potencializado por Inteligência Artificial (Google Gemini).

---

## 📌 Sobre o Projeto

O **PlanejaAI** nasceu com a missão de democratizar a educação e o planejamento financeiro pessoal. Muitas pessoas — especialmente iniciantes, adultos e idosos — encontram barreiras no controle de suas finanças devido a sistemas complexos, planilhas difíceis ou termos técnicos ("economês").

Esta aplicação resolve esse desafio ao oferecer:
1. **Interface intuitiva e acolhedora** que guia o usuário passo a passo.
2. **Diagnósticos financeiros automáticos** em linguagem clara e prática.
3. **Simulador de metas** que calcula o impacto real dos objetivos de vida no orçamento diário.
4. **Chat interativo com IA** atuando como um especialista em educação financeira digital para tirar dúvidas personalizadas.

---

## ✨ Principais Funcionalidades

- 🎯 **Simulação Guiada de Metas**: Coleta simples e intuitiva de renda mensal, custos fixos, parcelas/dívidas e metas financeiras (com valor e prazo).
- 🤖 **Diagnóstico Automático por IA (Google Gemini)**:
  - **Status de Viabilidade**: Classificação clara se a meta é *Viável*, *Necessita Ajustes* ou *Inviável*.
  - **Análise do Perfil**: Resumo da saúde financeira sem termos difíceis.
  - **Corte de Custos**: Recomendações práticas e acionáveis de onde economizar.
  - **Renda Extra**: Ideias realistas para complementar a receita mensal.
  - **Iniciação a Investimentos**: Conceitos básicos para rentabilizar o dinheiro com segurança.
  - **Motivação**: Mensagem personalizada para manter o usuário engajado.
- 💬 **Educador Financeiro Interativo (Chat)**: Converse em tempo real com a IA para esclarecer dúvidas específicas com base nos dados da sua simulação.
- 📜 **Histórico de Simulações**: Armazenamento local no navegador (`localStorage`) para consultar, reabrir ou comparar planejamentos anteriores.
- ♿ **Acessibilidade e Usabilidade**: Foco em clareza, fontes legíveis, navegação passo a passo e contraste adequado.

---

## 🛠️ Tecnologias Utilizadas

- **Frontend Core**: [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Build Tool & Dev Server**: [Vite](https://vitejs.dev/)
- **Estilização**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Roteamento**: [React Router v7](https://reactrouter.com/)
- **Ícones**: [Lucide React](https://lucide.dev/)
- **Inteligência Artificial**: [Google Gemini API](https://ai.google.dev/) (`gemini-flash-latest`)
- **Qualidade de Código & Linter**: [Oxlint](https://oxc.rs/), ESLint e Prettier

---

## 📁 Estrutura do Projeto

```text
EducadorFinanceiro/
├── plano.md                    # Documento com os requisitos e proposta da solução
├── README.md                   # Documentação principal da solução
└── planejai/                   # Aplicação web React + Vite
    ├── public/                 # Arquivos estáticos e ícones
    ├── src/
    │   ├── components/         # Componentes React reutilizáveis
    │   │   ├── features/       # Módulos de simulação, resultados e histórico
    │   │   ├── layout/         # Componentes estruturais de layout
    │   │   └── shared/         # Botões, inputs e elementos de UI comuns
    │   ├── context/            # Contextos React (gerenciamento de estado)
    │   ├── data/               # Prompts para a IA e dados do formulário
    │   ├── hooks/              # Hooks customizados
    │   ├── pages/              # Páginas da aplicação (Formulário, Resultados, Histórico)
    │   ├── services/           # Integração com a API do Google Gemini (aiService.ts)
    │   ├── styles/             # Estilos globais e utilitários CSS
    │   └── utils/              # Funções utilitárias (formatação de moeda, datas)
    ├── .env.example            # Modelo para variáveis de ambiente
    ├── package.json            # Scripts e dependências do projeto
    └── vite.config.ts          # Configurações do Vite
```

---

## 🚀 Como Executar o Projeto

### Pré-requisitos

- **Node.js**: Versão 18.x ou superior
- **Gerenciador de Pacotes**: `npm`, `pnpm` ou `yarn`
- **Chave de API do Google Gemini**: Obtenha gratuitamente no [Google AI Studio](https://aistudio.google.com/)

### Passo a Passo

1. **Acessar o diretório da aplicação web**:
   ```bash
   cd planejai
   ```

2. **Instalar as dependências**:
   ```bash
   npm install
   # ou usando pnpm:
   pnpm install
   ```

3. **Configurar as Variáveis de Ambiente**:
   Crie um arquivo `.env.local` na raiz da pasta `planejai` copiando o modelo `.env.example`:
   ```bash
   cp .env.example .env.local
   ```
   Abra o arquivo `.env.local` e insira sua chave da API Gemini:
   ```env
   VITE_GEMINI_API_KEY=sua_chave_gemini_aqui
   ```

4. **Executar a aplicação em modo de desenvolvimento**:
   ```bash
   npm run dev
   # ou:
   pnpm dev
   ```
   Acesse a aplicação no seu navegador pelo endereço indicado no terminal (ex: `http://localhost:5173`).

---

## 🧪 Scripts Disponíveis

Dentro do diretório `planejai`, você pode rodar:

- `npm run dev`: Inicia o servidor de desenvolvimento com Hot Module Replacement (HMR).
- `npm run build`: Compila o projeto com validação de tipos TypeScript e gera os arquivos otimizados para produção na pasta `dist/`.
- `npm run lint`: Executa a verificação estática de código com **Oxlint**.
- `npm run preview`: Executa localmente o servidor HTTP de demonstração da versão de produção.

---

## 💡 Filosofia de Comunicação da IA

A IA integrada no PlanejaAI foi instruída para:
- Falar em 2ª pessoa ("você", "sua meta") de forma empática e encorajadora.
- Evitar jargões bancários ou termos complexos sem explicação.
- Apresentar recomendações em **listas curtas** e **exemplos práticos do dia a dia**.
- Priorizar a segurança financeira e a viabilidade realista das metas.

---

 Desenvolvido com 💙 para tornar a educação financeira acessível a todos!
