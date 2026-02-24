-- Função para listar presentes (público e admin)
create or replace function public.listar_presentes()
returns setof public.lista_de_presentes
language sql
security definer
as $$
  select *
  from public.lista_de_presentes
  where is_active = true
  order by created_at desc;
$$;

-- Função para cadastrar presente
create or replace function public.cadastrar_presente(
  p_nome text,
  p_descricao text,
  p_valor numeric,
  p_url_imagem text,
  p_link_pix text,
  p_link_pagamento text,
  p_is_custom boolean default false
)
returns public.lista_de_presentes
language plpgsql
security definer
as $$
declare
  v_presente public.lista_de_presentes;
begin
  insert into public.lista_de_presentes (
    nome,
    descricao,
    valor,
    url_imagem,
    link_pix,
    link_pagamento,
    is_custom
  )
  values (
    p_nome,
    p_descricao,
    p_valor,
    p_url_imagem,
    p_link_pix,
    p_link_pagamento,
    p_is_custom
  )
  returning * into v_presente;
  
  return v_presente;
end;
$$;

-- Função para atualizar presente
create or replace function public.atualizar_presente(
  p_id uuid,
  p_nome text,
  p_descricao text,
  p_valor numeric,
  p_url_imagem text,
  p_link_pix text,
  p_link_pagamento text,
  p_is_custom boolean default false
)
returns public.lista_de_presentes
language plpgsql
security definer
as $$
declare
  v_presente public.lista_de_presentes;
begin
  update public.lista_de_presentes
  set
    nome = p_nome,
    descricao = p_descricao,
    valor = p_valor,
    url_imagem = p_url_imagem,
    link_pix = p_link_pix,
    link_pagamento = p_link_pagamento,
    is_custom = p_is_custom,
    updated_at = now()
  where id = p_id
  returning * into v_presente;
  
  return v_presente;
end;
$$;

-- Função para exclusão lógica (Soft Delete)
create or replace function public.excluir_presente(p_id uuid)
returns void
language plpgsql
security definer
as $$
begin
  update public.lista_de_presentes
  set 
    is_active = false,
    deleted_at = now()
  where id = p_id;
end;
$$;
