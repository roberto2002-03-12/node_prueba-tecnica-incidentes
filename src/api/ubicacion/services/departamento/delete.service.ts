import { getOneDepartamentoByIdService } from './';

export const deleteOneDepartamentoByIdService = async (id: number) => {
  try {
    const departamento = await getOneDepartamentoByIdService(id);

    await departamento.destroy();

    return { message: 'departamento eliminado' }
  } catch (error) {
    throw error;
  }
}