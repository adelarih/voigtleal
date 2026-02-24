# Documentação das Funções RPC de Presentes

Esta pasta contém as funções SQL (Remote Procedure Calls - RPC) utilizadas para gerenciar a lista de presentes no Supabase.

## Funções Disponíveis

### 1. `listar_presentes()`
Retorna a lista de todos os presentes ativos.

- **Tipo:** `READ`
- **Retorno:** `SET OF public.lista_de_presentes`
- **Segurança:** `SECURITY DEFINER` (Executa com permissões de criador)
- **Lógica:** Filtra registros onde `is_active = true` e ordena pelos mais recentes (`created_at desc`).

### 2. `cadastrar_presente(...)`
Cria um novo item na lista de presentes.

**Parâmetros:**
| Nome | Tipo | Descrição |
| :--- | :--- | :--- |
| `p_nome` | `TEXT` | Nome do presente (Ex: Jogo de Panelas) |
| `p_descricao` | `TEXT` | Breve descrição ou mensagem sobre o item |
| `p_valor` | `NUMERIC` | Valor monetário sugerido |
| `p_url_imagem` | `TEXT` | URL da imagem hospedada no Storage |
| `p_link_pix` | `TEXT` | Chave ou link de pagamento PIX |
| `p_link_pagamento` | `TEXT` | Link externo de pagamento (Cartão/Boleto) |

- **Retorno:** O registro recém-criado (`public.lista_de_presentes`).

### 3. `atualizar_presente(...)`
Modifica os dados de um presente existente.

**Parâmetros:**
| Nome | Tipo | Descrição |
| :--- | :--- | :--- |
| `p_id` | `UUID` | ID único do presente a ser editado |
| `p_nome` | `TEXT` | Novo nome |
| `p_descricao` | `TEXT` | Nova descrição |
| `p_valor` | `NUMERIC` | Novo valor |
| `p_url_imagem` | `TEXT` | Nova URL da imagem |
| `p_link_pix` | `TEXT` | Nova chave PIX |
| `p_link_pagamento` | `TEXT` | Novo link de pagamento |

- **Retorno:** O registro atualizado.
- **Observação:** Atualiza automaticamente o campo `updated_at`.

### 4. `excluir_presente(p_id)`
Realiza a exclusão lógica (soft delete) de um presente.

**Parâmetros:**
| Nome | Tipo | Descrição |
| :--- | :--- | :--- |
| `p_id` | `UUID` | ID do presente a ser removido |

- **Lógica:** Em vez de deletar o registro fisicamente, define `is_active = false` e registra o timestamp em `deleted_at`. Isso permite auditoria e recuperação de dados se necessário.

---

## Como usar no Frontend (Javascript/Typescript)

```typescript
// Exemplo de chamada via Supabase Client
const { data, error } = await supabase.rpc('listar_presentes');
```

## Localização do Arquivo SQL
O script de criação destas funções está em: `documentation/supabase/functions/presentes_rpc.sql`
