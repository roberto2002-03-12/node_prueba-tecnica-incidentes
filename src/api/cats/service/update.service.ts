import { getOneCatService } from './read.service';
import { UpdateCat } from '../model';

export const updateCatService = async (catUpdate: UpdateCat, id: number) => {
  try {
    const cat = await getOneCatService(id);
    await cat.update(catUpdate);
    return { message: 'cat updated' };
  } catch (error) {
    throw error;
  }
}