import { supabase } from '../lib/supabase';

export interface RSVPData {
    name: string;
    cerimonia_religiosa: boolean;
    cerimonia_festiva: boolean;
    brinde_casa: boolean;
}

export interface RSVPEntry extends RSVPData {
    id: string;
    created_at: string;
}

export const rsvpService = {
    async submitRSVP(data: RSVPData) {
        const { error } = await supabase.rpc('confirmar_presenca', {
            p_name: data.name,
            p_religiosa: data.cerimonia_religiosa,
            p_festiva: data.cerimonia_festiva,
            p_casa: data.brinde_casa
        });

        if (error) {
            console.error('Error submitting RSVP via RPC:', error);
            throw error;
        }

        return true;
    },

    /**
     * Admin: Fetches all confirmed guests
     */
    async getConfirmadosAdmin(): Promise<RSVPEntry[]> {
        const { data, error } = await supabase.rpc('listar_confirmados_admin');

        if (error) {
            console.error('Error fetching confirmed guests:', error);
            throw error;
        }

        return data || [];
    }
};
