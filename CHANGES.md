# CHANGES

## Melhorias Implementadas

### Performance no Backend

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