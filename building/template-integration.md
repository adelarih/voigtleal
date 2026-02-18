# Guia de Integração de Novos Templates

Este documento descreve o processo padrão para adicionar novos templates à aplicação `wedding-builder`. Siga estes passos para garantir que qualquer novo template seja corretamente reconhecido, renderizado e suportado pelo sistema de roteamento (Builder, Preview, Config).

## Estrutura de Diretórios Recomendada

Todos os templates devem residir na pasta `src/templates/`.
Cada template deve ter sua própria subpasta nomeada seguindo o padrão `template-[número]` ou `template-[nome-descritivo]`.

Exemplo:
```
src/
  templates/
    template-1/
    template-2/
    template-3/  <-- Novo template
```

## Requisitos do Template

1.  **Ponto de Entrada**: Cada template deve ter um arquivo `App.tsx` (ou `index.tsx`) na raiz de sua pasta.
2.  **Exportação Padrão**: O arquivo de entrada deve exportar o componente principal do template como `default`.

Exemplo (`src/templates/template-3/App.tsx`):
```tsx
import React from 'react';

const Template3 = () => {
  return (
    <div className="w-full h-full">
      {/* Conteúdo do template */}
      <h1>Seu Template Aqui</h1>
    </div>
  );
};

export default Template3;
```

## Passo a Passo para Integração

### 1. Adicionar os Arquivos do Template

Copie a pasta do novo template para `src/templates/template-[N]`.
Certifique-se de que ele possui um arquivo `App.tsx` exportando o componente principal.

### 2. Registrar no Contexto (Lista de Opções)

Edite o arquivo `src/context/TemplateContext.tsx`.
Adicione uma nova entrada ao array `templates`:

```tsx
// src/context/TemplateContext.tsx

export const templates: Template[] = [
  { id: 'template-1', name: 'Original Template 1', description: '...' },
  { id: 'template-2', name: 'Original Template 2', description: '...' },
  // Adicione o novo template aqui:
  { 
    id: 'template-3', // ID único usado para roteamento inerno e URL
    name: 'Nome do Novo Template', 
    description: 'Descrição breve do estilo ou finalidade' 
  }
];
```

### 3. Configurar o Carregamento Dinâmico (Lazy Loading)

Edite o arquivo `src/App.tsx`.
Adicione a importação dinâmica (lazy import) para o novo template no topo do arquivo:

```tsx
// src/App.tsx

// ... importações existentes
const Template1 = lazy(() => import('./templates/template-1/App'));
const Template2 = lazy(() => import('./templates/template-2/App'));
// Adicione a importação do novo template:
const Template3 = lazy(() => import('./templates/template-3/App'));
```

### 4. Adicionar ao Renderizador

Ainda em `src/App.tsx`, localize o componente `TemplateRenderer` e adicione um novo `case` switch para o ID do seu template:

```tsx
// src/App.tsx -> TemplateRenderer

  const renderContent = () => {
    switch (activeTemplate) {
      case 'template-1': return <Template1 />;
      case 'template-2': return <Template2 />;
      // Adicione o case para o novo template:
      case 'template-3': return <Template3 />;
      
      default: return <Template1 />;
    }
  };
```

## Novas Funcionalidades de Roteamento

O sistema agora suporta diferentes modos de visualização através do React Router:

*   **Builder (`/builder`)**: Exibe o template com uma sidebar fixa expandida à esquerda.
*   **Preview (`/preview?template=ID`)**: Exibe *apenas* o template em tela cheia (sem sidebar). Útil para iframes ou compartilhamento.
    *   Suporta o parâmetro de URL `?template=[id]` para forçar a renderização de um template específico (ex: `/preview?template=template-3`).
*   **Config (`/config` ou root)**: Exibe o template com a sidebar em modo overlay (colapsada/stealth).

Ao adicionar um novo template seguindo os passos acima, ele estará automaticamente disponível em todas essas rotas.

## Gerenciamento de Assets (Imagens, Fontes)

*   **Imagens Locais**: Recomenda-se colocar imagens específicas do template em `src/assets/template-[N]/` ou usar a pasta compartilhada `src/assets/` se forem imagens genéricas.
*   **Caminhos**: Ao importar imagens no código, utilize imports diretos (ex: `import img from '../../assets/img.jpg'`) ou caminhos absolutos a partir da raiz `src` (ex: `/src/assets/...`).

Seguindo este guia, qualquer agente ou desenvolvedor pode integrar novos designs rapidamente.
