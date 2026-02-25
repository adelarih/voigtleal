import { supabase } from '../lib/supabase';

export interface CeremonyText {
    id: string;
    created_at: string;
    conteudo: string;
    cerimonia: string;
}

export const contentService = {
    async getAll(): Promise<CeremonyText[]> {
        const { data, error } = await supabase.rpc('listar_textos_cerimonias');

        if (error) {
            console.error('Error fetching ceremony texts:', error);
            throw error;
        }

        return data || [];
    },

    async update(id: string, conteudo: string): Promise<void> {
        const { error } = await supabase.rpc('atualizar_texto_cerimonia', {
            p_id: id,
            p_conteudo: conteudo
        });

        if (error) {
            console.error('Error updating ceremony text:', error);
            throw error;
        }
    }
};
