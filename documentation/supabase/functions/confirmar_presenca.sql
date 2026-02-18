-- Função para Confirmar Presença (RSVP)
-- Esta função é SECURITY DEFINER para permitir inserções por usuários anônimos
-- ignorando restrições de RLS na tabela lista_confirmados.

CREATE OR REPLACE FUNCTION confirmar_presenca(
  p_name text,
  p_religiosa boolean,
  p_festiva boolean,
  p_casa boolean
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.lista_confirmados (
    name, 
    cerimonia_religiosa, 
    cerimonia_festiva, 
    brinde_casa
  )
  VALUES (
    p_name, 
    p_religiosa, 
    p_festiva, 
    p_casa
  );
END;
$$;

-- Concede permissão de execução para o papel anônimo
GRANT EXECUTE ON FUNCTION confirmar_presenca(text, boolean, boolean, boolean) TO anon;
