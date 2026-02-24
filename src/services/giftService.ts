import { supabase } from '../lib/supabase';

export interface Gift {
    id: string;
    created_at: string;
    updated_at: string;
    nome: string;
    descricao?: string;
    valor: number;
    url_imagem?: string;
    link_pix?: string;
    link_pagamento?: string;
    is_active: boolean;
    is_custom: boolean;
    deleted_at?: string;
}

export type GiftInput = Omit<Gift, 'id' | 'created_at' | 'updated_at' | 'is_active' | 'deleted_at'>;

export const giftService = {
    async getAll(): Promise<Gift[]> {
        const { data, error } = await supabase.rpc('listar_presentes');
        if (error) {
            console.error('Error listing gifts:', error);
            throw error;
        }
        return data || [];
    },

    async create(gift: GiftInput): Promise<Gift> {
        const { data, error } = await supabase.rpc('cadastrar_presente', {
            p_nome: gift.nome,
            p_descricao: gift.descricao || '',
            p_valor: gift.valor,
            p_url_imagem: gift.url_imagem || '',
            p_link_pix: gift.link_pix || '',
            p_link_pagamento: gift.link_pagamento || '',
            p_is_custom: gift.is_custom ?? false
        });

        if (error) {
            console.error('Error creating gift:', error);
            throw error;
        }
        return data;
    },

    async update(id: string, gift: Partial<GiftInput>): Promise<Gift> {
        const { data, error } = await supabase.rpc('atualizar_presente', {
            p_id: id,
            p_nome: gift.nome,
            p_descricao: gift.descricao || '',
            p_valor: gift.valor,
            p_url_imagem: gift.url_imagem || '',
            p_link_pix: gift.link_pix || '',
            p_link_pagamento: gift.link_pagamento || '',
            p_is_custom: gift.is_custom
        });

        if (error) {
            console.error('Error updating gift:', error);
            throw error;
        }
        return data;
    },

    async softDelete(id: string): Promise<void> {
        const { error } = await supabase.rpc('excluir_presente', { p_id: id });
        if (error) {
            console.error('Error deleting gift:', error);
            throw error;
        }
    },

    async uploadImage(file: File): Promise<string> {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
        const filePath = `gifts/${fileName}`;

        const { error: uploadError } = await supabase.storage
            .from('assets')
            .upload(filePath, file);

        if (uploadError) throw uploadError;

        const { data } = supabase.storage
            .from('assets')
            .getPublicUrl(filePath);

        return data.publicUrl;
    }
};
