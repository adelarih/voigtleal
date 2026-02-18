-- Função para moderar recados (aprovar ou deletar)
-- Esta função permite que o administrador aprove um recado ou o marque como deletado.

CREATE OR REPLACE FUNCTION public.moderacao_recado(
    p_id UUID,
    p_aprovado BOOLEAN DEFAULT TRUE,
    p_deletar BOOLEAN DEFAULT FALSE
)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER -- Executa com as permissões do criador (bypass RLS)
AS $$
BEGIN
    IF p_deletar THEN
        UPDATE public.recados
        SET delet_at = NOW()
        WHERE id = p_id;
    ELSE
        UPDATE public.recados
        SET aprovado = p_aprovado
        WHERE id = p_id;
    END IF;
    
    RETURN FOUND;
END;
$$;
