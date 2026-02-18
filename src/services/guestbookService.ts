import { supabase } from '../lib/supabase';

export interface GuestMessage {
    id?: string;
    nome: string;
    recado: string;
    created_at?: string;
    aprovado?: boolean;
}

export const guestbookService = {
    /**
     * Fetches all approved guest messages
     */
    async getMessages(): Promise<GuestMessage[]> {
        const { data, error } = await supabase
            .from('recados')
            .select('id, nome, recado, created_at')
            .eq('aprovado', true)
            .is('delet_at', null)
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error fetching guestbook messages:', error);
            throw error;
        }

        return data || [];
    },

    /**
     * Submits a new guest message via RPC for security
     */
    async submitMessage(nome: string, recado: string): Promise<boolean> {
        const { error } = await supabase.rpc('enviar_recado', {
            p_nome: nome,
            p_recado: recado
        });

        if (error) {
            console.error('Error submitting guestbook message via RPC:', error);
            throw error;
        }

        return true;
    },

    /**
     * Admin: Fetches all messages (approved and pending)
     */
    async getAllMessagesAdmin(): Promise<GuestMessage[]> {
        const { data, error } = await supabase.rpc('listar_recados_admin');

        if (error) {
            console.error('Error fetching admin guestbook messages:', error);
            throw error;
        }

        return data || [];
    },

    /**
     * Admin: Approve or soft-delete a message
     */
    async moderateMessage(id: string, aprovado: boolean, deletar: boolean = false): Promise<boolean> {
        const { error } = await supabase.rpc('moderacao_recado', {
            p_id: id,
            p_aprovado: aprovado,
            p_deletar: deletar
        });

        if (error) {
            console.error('Error moderating message:', error);
            throw error;
        }

        return true;
    }
};
