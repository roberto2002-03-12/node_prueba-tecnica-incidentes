import { getOneBloqueByIdService } from './';

export const deleteOneBloqueByIdService = async (id: number) => {
  try {
    const bloque = await getOneBloqueByIdService(id);

    await bloque.destroy();

    return { message: 'bloque eliminado' }
  } catch (error) {
    throw error;
  }
}