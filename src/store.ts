import { create } from 'zustand';
import { FarmerRecord } from './types';

interface FarmerStore {
  farmers: Record<string, FarmerRecord>;
  addFarmer: (farmer: FarmerRecord) => void;
  updateFarmerData: (uniqueId: string, data: Partial<FarmerRecord>) => void;
  getFarmer: (uniqueId: string) => FarmerRecord | undefined;
}

export const useFarmerStore = create<FarmerStore>((set, get) => ({
  farmers: {},
  addFarmer: (farmer) =>
    set((state) => ({
      farmers: { ...state.farmers, [farmer.uniqueId]: farmer },
    })),
  updateFarmerData: (uniqueId, data) =>
    set((state) => {
      const farmer = state.farmers[uniqueId];
      if (!farmer) return state;
      return {
        farmers: {
          ...state.farmers,
          [uniqueId]: { ...farmer, ...data },
        },
      };
    }),
  getFarmer: (uniqueId) => get().farmers[uniqueId],
}));
