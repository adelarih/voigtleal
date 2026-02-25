-- Função para listar textos das cerimonias
create or replace function public.listar_textos_cerimonias()
returns setof public.texto_cerimonias
language sql
security definer
as $$
  select *
  from public.texto_cerimonias
  order by cerimonia asc;
$$;

-- Função para atualizar texto de uma cerimonia
create or replace function public.atualizar_texto_cerimonia(
  p_id uuid,
  p_conteudo text
)
returns public.texto_cerimonias
language plpgsql
security definer
as $$
declare
  v_texto public.texto_cerimonias;
begin
  update public.texto_cerimonias
  set
    conteudo = p_conteudo
  where id = p_id
  returning * into v_texto;
  
  return v_texto;
end;
$$;
