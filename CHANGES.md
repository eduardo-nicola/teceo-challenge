# CHANGES

## Melhorias Implementadas

### Performance no Backend

#### 1. Indexação da coluna `id` na BaseModel
- Adicionado índice na coluna `id` (chave primária) em todas as tabelas que herdam de `BaseModel`.
- Melhora significativa em consultas por ID único e operações com JOINs entre tabelas relacionadas.
- Implementado via decorator `@Index()` no TypeORM e aplicado através de migração do banco de dados.