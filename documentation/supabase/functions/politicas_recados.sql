-- Políticas de Segurança (RLS) para a tabela recados

-- 1. Habilitar RLS
ALTER TABLE public.recados ENABLE ROW LEVEL SECURITY;

-- 2. Permitir que qualquer pessoa (anon) visualize apenas recados aprovados
-- IMPORTANTE: Sem esta política, o frontend não conseguirá listar os recados mesmo que existam no banco.
CREATE POLICY "Visualização de recados aprovados" 
ON public.recados 
FOR SELECT 
TO anon 
USING (aprovado = true AND delet_at IS NULL);

-- 3. As inserções são feitas via função RPC 'enviar_recado' que possui 'SECURITY DEFINER',
-- portanto não é estritamente necessária uma política de INSERT para o papel anon na tabela direta,
-- a menos que você queira permitir inserções diretas via API REST.
