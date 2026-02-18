# Documentação de Otimização de SEO e Meta Tags

Este documento detalha as atualizações realizadas nos arquivos `index.html` e `site.webmanifest` para melhorar o SEO, a aparência em redes sociais e a experiência do usuário ao salvar o site em dispositivos móveis.

## 1. Organização do `<head>` em `index.html`

O cabeçalho do arquivo `index.html` foi completamente reorganizado para seguir as melhores práticas.

### Ações Realizadas:

-   **Remoção de Tags Duplicadas:** Foram eliminadas todas as tags `<link>` e `<meta>` antigas, duplicadas e com caminhos incorretos.
-   **Adição de Meta Tags de SEO:** Foram incluídas tags essenciais para SEO:
    -   `keywords`: Para definir as palavras-chave relevantes para o negócio.
    -   `author`: Para identificar o autor da página.
    -   `robots`: Para instruir os robôs de busca a indexar a página.
    -   `canonical`: Para especificar a URL preferida da página, evitando conteúdo duplicado.
-   **Estrutura Lógica:** As novas tags foram agrupadas em seções claras para facilitar a manutenção:
    -   Favicons modernos (`.svg` e `.ico`).
    -   Ícone de toque da Apple (`apple-touch-icon`).
    -   Manifesto de Web App (`site.webmanifest`).
    -   Meta tags para Open Graph (Facebook, WhatsApp, etc.).
    -   Meta tags para Twitter Cards.
-   **Correção de Caminhos:** Todos os caminhos para os recursos (ícones, manifesto) foram corrigidos para apontar para o diretório `assets/visual-identity/`.

### Novo Bloco de Tags em `index.html`:

```html
    <!-- SEO & Favicon Meta Tags -->
    <meta name="description" content="Transforme seu negócio com a TOPSTACK. IA, automações e software sob medida para eliminar tarefas, otimizar marketing e trazer clareza com BI. Democratizamos o acesso a IA e automações para pequenas empresas. Otimize processos, reduza custos e maximize resultados.">
    <meta name="keywords" content="Inteligência Artificial, Automações, Software Sob Medida, Otimização de Marketing, Business Intelligence, IA para pequenas empresas, TOPSTACK, automação de processos, redução de custos, aumento de eficiência">
    <meta name="author" content="TOPSTACK">
    <meta name="robots" content="index, follow">
    <link rel="canonical" href="https://www.topstack.com.br/">
    <meta name="theme-color" content="#ffffff">

    <!-- Modern Favicons -->
    <link rel="icon" href="/assets/visual-identity/favicon.svg" type="image/svg+xml">
    <link rel="icon" href="/assets/visual-identity/favicon.ico" sizes="any"> <!-- Fallback for older browsers -->

    <!-- Apple Touch Icon -->
    <link rel="apple-touch-icon" href="/assets/visual-identity/apple-touch-icon.png">

    <!-- Web App Manifest -->
    <link rel="manifest" href="site.webmanifest">
```

## 2. Otimização para Redes Sociais

As meta tags para compartilhamento em redes sociais (Open Graph e Twitter) foram revisadas.

### Ações Realizadas:

-   **Imagem de Compartilhamento Corrigida:** As tags `og:image` e `twitter:image` foram atualizadas para usar a imagem correta, com dimensões de 1200x630 pixels, que estava localizada em `assets/visual-identity/topstack-og-image-1200x630-cf.png`.
-   **Caminhos Relativos:** As URLs das imagens foram alteradas de absolutas (`https://...`) para relativas à raiz (`/...`) para maior flexibilidade, conforme solicitado.

### Exemplo da Tag Corrigida:

```html
<meta property="og:image" content="/assets/visual-identity/topstack-og-image-1200x630-cf.png">
<meta property="twitter:image" content="/assets/visual-identity/topstack-og-image-1200x630-cf.png">
```

## 3. Correção do `site.webmanifest`

O arquivo de manifesto, essencial para a experiência de "adicionar à tela inicial" no Android, foi corrigido.

### Ações Realizadas:

-   **Movido para a Raiz:** O arquivo `site.webmanifest` foi movido de `assets/visual-identity/` para a raiz do projeto para simplificar o acesso. A referência no `index.html` foi atualizada.
-   **Nome do Aplicativo:** O campo `"name"` foi atualizado para o título completo do site, proporcionando uma melhor descrição quando o site é "instalado".
-   **Caminhos dos Ícones:** Os caminhos (`src`) para os ícones de 192x192 e 512x512 pixels foram corrigidos para serem relativos e apontarem para a localização correta dentro de `assets/visual-identity/`.

### Conteúdo do `site.webmanifest` Corrigido:

```json
{
  "name": "TOPSTACK | Inteligência Artificial, Automações e Software Sob Medida",
  "short_name": "TOPSTACK",
  "icons": [
    {
      "src": "/assets/visual-identity/web-app-manifest-192x192.png",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "maskable"
    },
    {
      "src": "/assets/visual-identity/web-app-manifest-512x512.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "maskable"
    }
  ],
  "theme_color": "#ffffff",
  "background_color": "#ffffff",
  "display": "standalone"
}
```

## 4. Arquivos Essenciais de SEO e PWA

Para completar a otimização, foram adicionados arquivos cruciais na raiz do projeto.

### a) `robots.txt`

-   **O que faz:** Instrui os robôs de busca (como o do Google) sobre como rastrear o site.
-   **Configuração:** Permite o rastreamento de todo o site (`Disallow:` vazio) e aponta para a localização do `sitemap.xml`.
-   **Nota:** O link para o Sitemap deve ser absoluto por exigência do protocolo.

### b) `sitemap.xml`

-   **O que faz:** Lista todas as páginas importantes do site para ajudar os buscadores a encontrá-las e indexá-las de forma mais eficiente.
-   **Configuração:** Inclui a URL principal do site (`https://www.topstack.com.br/`), com prioridade máxima de rastreamento.
-   **Nota:** As URLs dentro do sitemap (`<loc>`) devem ser absolutas por exigência do protocolo.

### c) Service Worker (`sw.js`)

-   **O que faz:** É a base para um Progressive Web App (PWA). Ele permite que o site funcione offline e carregue mais rápido ao armazenar os arquivos principais (como HTML, CSS, JS e imagens) em cache no dispositivo do usuário.
-   **Implementação:**
    1.  Foi criado o arquivo `sw.js` na raiz do projeto com a lógica de cache.
    2.  Foi adicionado um código em `script.js` para registrar o service worker quando a página é carregada.

## 5. Páginas de Experiência do Usuário e Legais

Para garantir a conformidade legal (LGPD) e uma boa experiência do usuário, as seguintes páginas e arquivos foram criados:

### a) `404.html`

-   **O que faz:** Uma página de erro personalizada que é exibida quando um usuário tenta acessar uma URL inexistente. Ela mantém a identidade visual do site e oferece um link para voltar à página inicial, evitando que o visitante se perca.
-   **Estrutura:** Movida para a pasta `/404/` (contendo um `index.html`) para ser servida como a página de erro padrão pela maioria dos serviços de hospedagem modernos.

### b) `.well-known/security.txt`

-   **O que faz:** Um arquivo padronizado que fornece um ponto de contato para que pesquisadores de segurança possam reportar vulnerabilidades de forma ética e responsável.

### c) `politica-de-privacidade.html`

-   **O que faz:** Página essencial que informa os usuários sobre quais dados são coletados, como são usados e quais são seus direitos, em conformidade com a Lei Geral de Proteção de Dados (LGPD).
-   **Estrutura:** Movida para a pasta `/politica-de-privacidade/` para permitir uma URL limpa (ex: `seusite.com/politica-de-privacidade`).
-   **Atenção:** O conteúdo é um modelo e **deve ser revisado por um profissional jurídico**.

### d) `termos-de-servico.html`

-   **O que faz:** Define as regras e condições de uso do site, protegendo legalmente tanto a empresa quanto o usuário.
-   **Estrutura:** Movida para a pasta `/termos-de-servico/` para permitir uma URL limpa.
-   **Atenção:** O conteúdo é um modelo e **deve ser revisado por um profissional jurídico**.

### e) Links no Rodapé

-   Para garantir fácil acesso, os links no rodapé foram atualizados para os caminhos relativos e sem a extensão `.html` (ex: `/politica-de-privacidade/`).

Com essas alterações, o site está agora configurado corretamente para ter uma melhor apresentação nos navegadores, nos resultados de busca e nas redes sociais, além de estar em conformidade com as principais exigências legais e de segurança.

