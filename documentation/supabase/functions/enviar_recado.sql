-- Função para Enviar Recado (Mural de Recados)
-- Esta função é SECURITY DEFINER para permitir inserções por usuários anônimos.
-- Por padrão, todo recado nasce COM 'aprovado = false' para moderação futura.

CREATE OR REPLACE FUNCTION enviar_recado(
  p_nome text,
  p_recado text
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.recados (
    nome, 
    recado, 
    aprovado
  )
  VALUES (
    p_nome, 
    p_recado, 
    false -- Nasce sem aprovação para moderação futura
  );
END;
$$;

-- Concede permissão de execução para o papel anônimo
GRANT EXECUTE ON FUNCTION enviar_recado(text, text) TO anon;
