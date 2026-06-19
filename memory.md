# Memória do Projeto: Solucionne Site

## 🚀 Hospedagem e Infraestrutura
* **Provedor:** Netlify
* **Plano:** Grátis (Starter)
* **Limitações Conhecidas:**
  * **Largura de Banda:** Limite de 100 GB/mês. Evitar subir arquivos de mídia excessivamente grandes (vídeos pesados ou imagens sem compressão).
  * **Minutos de Build:** Limite de 300 minutos de build por mês. Como o projeto é composto de páginas HTML estáticas simples, o tempo de build é extremamente baixo, mas deve-se evitar deploys em massa desnecessários ou loops de CI/CD.
  * **Funções Serverless (Netlify Functions):** Limite de uso no plano grátis (125.000 requisições/mês, execução máx de 10s). Atualmente não são muito utilizadas, mas caso venham a ser implementadas, devem seguir a limitação.
  * **Formulários (Netlify Forms):** Limite de 100 envios por mês no plano grátis.

## 🛠️ Tecnologias e Estrutura
* **Frontend:** HTML5, CSS3, Tailwind CSS (via CDN) e JavaScript puro.
* **Componentes reutilizáveis:** O projeto utiliza um script de inclusão de parciais (`assets/js/includes.js`) para carregar o header, footer e outros elementos comuns dinamicamente.
* **Estilização:** CSS customizado em `assets/css/styles.css` e classes utilitárias do Tailwind CSS.

## 🤖 Contexto para Claude / Assistentes de IA
* **Design & Estética:** A marca Solucionne foca em acústica de alta performance. O design deve ser premium, limpo, moderno, de alta tecnologia e focado em tons escuros (cor primária: `#A01217` vermelho corporativo, fundo principal: `#1C1C1C`).
* **Preservação de Código:** Sempre preservar as tags de rastreamento (Google Tag Manager, Google Analytics) presentes nas páginas.
* **Carregamento de Componentes:** Não quebrar o funcionamento do `includes.js` ao editar páginas HTML. A maioria das páginas possui `data-include="partials/header.html"` e `data-include="partials/footer.html"`.
* **Imagens e Ativos:** Todas as imagens devem ser salvas na pasta correspondente em `assets/` e otimizadas para a web (formatos WebP ou SVG preferencialmente).
