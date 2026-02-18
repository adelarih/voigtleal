-- Função para listar todos os confirmados para administração
-- SECURITY DEFINER para bypassar RLS e permitir que o administrador veja a lista completa.

CREATE OR REPLACE FUNCTION public.listar_confirmados_admin()
RETURNS TABLE (
    id UUID,
    name TEXT,
    cerimonia_religiosa BOOLEAN,
    cerimonia_festiva BOOLEAN,
    brinde_casa BOOLEAN,
    created_at TIMESTAMPTZ
)
LANGUAGE plpgsql
SECURITY DEFINER -- Executa com as permissões do criador
AS $$
BEGIN
    RETURN QUERY
    SELECT c.id, c.name, c.cerimonia_religiosa, c.cerimonia_festiva, c.brinde_casa, c.created_at
    FROM public.lista_confirmados c
    ORDER BY c.created_at DESC;
END;
$$;
