-- Função para listar todos os recados para administração
-- Retorna tanto recados aprovados quanto pendentes, excluindo apenas os deletados.

CREATE OR REPLACE FUNCTION public.listar_recados_admin()
RETURNS TABLE (
    id UUID,
    nome TEXT,
    recado TEXT,
    created_at TIMESTAMPTZ,
    aprovado BOOLEAN
)
LANGUAGE plpgsql
SECURITY DEFINER -- Executa com as permissões do criador (bypass RLS)
AS $$
BEGIN
    RETURN QUERY
    SELECT r.id, r.nome, r.recado, r.created_at, r.aprovado
    FROM public.recados r
    WHERE r.delet_at IS NULL
    ORDER BY r.aprovado ASC, r.created_at DESC; -- Pendentes primeiro, depois por data
END;
$$;
