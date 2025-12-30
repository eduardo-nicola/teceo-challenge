# CHANGES

## Melhorias Implementadas

###  Backend

#### 1. Indexação da coluna `id` na BaseModel
- Adicionado índice na coluna `id` (chave primária) em todas as tabelas que herdam de `BaseModel`.
- Melhora significativa em consultas por ID único e operações com JOINs entre tabelas relacionadas.
- Implementado via decorator `@Index()` no TypeORM e aplicado através de migração do banco de dados.

#### 2. Refatoração de consultas em ProductColorsService (commit 5e587d7)
- Removidas `getColorsForProductColors` e `getPricesForProductColors` (JOINs separados).
- Função `list` reestruturada para 3 consultas rápidas:
  - contagem direta em `product_colors` para o total,
  - listagem paginada com `innerJoin` de `product` e `color`,
  - cálculo de preço apenas para os IDs retornados, evitando varrer ~43M de registros em `skus`.
- Redução de latência observada nas APIs (≈120–300ms).

### Frontend
#### 1. Suporte a `.env` no frontend
- Adicionada configuração via variáveis de ambiente (`.env`), facilitando parametrização por ambiente sem necessidade de rebuild.

#### 2. Virtualização e infinite scroll com `@tanstack/react-virtual`
- Biblioteca adicionada e integrada em `HomeProductColorList.tsx` usando `useWindowVirtualizer` para renderizar apenas itens visíveis.
- Scroll infinito com carregamento incremental, reduzindo memória e tempo de renderização em listas grandes.

#### 3. `React.StrictMode` condicional no `main.tsx`
- Aplicado somente em desenvolvimento, mantendo checagens durante o dev e evitando efeitos duplicados em produção.
