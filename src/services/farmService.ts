/**
 * FarmPro AI - Domain Services Layer
 * Bao đóng toàn bộ logic gọi API nghiệp vụ và tương tác AI
 */
import { apiClient } from './apiClient.ts';
import { Animal } from '../types/farm.ts';

export const animalService = {
  async getAnimals(): Promise<{ animals: Animal[]; total: number }> {
    return apiClient.get('/api/animals', { timeoutMs: 5000 });
  },

  async createAnimal(animalData: Partial<Animal>): Promise<any> {
    return apiClient.post('/api/animals', animalData);
  },

  async updateAnimal(id: string, updatedFields: Partial<Animal>): Promise<any> {
    return apiClient.put(`/api/animals/${id}`, updatedFields);
  },

  async deleteAnimal(id: string): Promise<any> {
    return apiClient.delete(`/api/animals/${id}`);
  },

  async sellAnimal(
    id: string,
    saleData: { salePriceVnd: number; buyer: string; weightAtSaleKg?: number }
  ): Promise<any> {
    return apiClient.put(`/api/animals/${id}/sell`, saleData);
  },
};

export const aiService = {
  async chat(message: string, history: any[] = [], farmContext?: any): Promise<{ text: string }> {
    return apiClient.post('/api/ai/chat', { message, history, farmContext }, { timeoutMs: 20000 });
  },

  async diagnose(animalData: { species: string; weightKg: number; symptoms: string; daysSick?: number }): Promise<any> {
    return apiClient.post('/api/ai/diagnose', animalData, { timeoutMs: 20000 });
  },

  async runMultiAgent(query: string): Promise<any> {
    return apiClient.post('/api/ai/multi-agent/run', { query }, { timeoutMs: 30000 });
  },

  async getHerdSummary(animals: Animal[]): Promise<any> {
    return apiClient.post('/api/ai/herd-summary', { animals }, { timeoutMs: 15000 });
  },

  async getGrowthReport(species: string, currentWeight: number, targetWeight?: number): Promise<any> {
    return apiClient.post('/api/ai/growth-report', { species, currentWeight, targetWeight }, { timeoutMs: 15000 });
  },

  async runRequirementsAgent(requirement: string): Promise<any> {
    return apiClient.post('/api/ai/requirements-agent/analyze', { requirement }, { timeoutMs: 25000 });
  },

  async runSdlcFactory(requirement: string): Promise<any> {
    return apiClient.post('/api/ai/sdlc-factory/run', { requirement }, { timeoutMs: 25000 });
  },

  async getPromptComparison(query?: string): Promise<any> {
    return apiClient.get('/api/ai/prompt-comparison', { params: query ? { query } : undefined });
  },
};

export const systemService = {
  async getDbStatus(): Promise<{ connected: boolean; mode: string; message: string }> {
    return apiClient.get('/api/db/status', { timeoutMs: 4000 });
  },

  async getHealth(): Promise<any> {
    return apiClient.get('/api/health', { timeoutMs: 4000 });
  },
};
