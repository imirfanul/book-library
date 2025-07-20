const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

class ApiService {
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data.data || data;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Font API methods
  async getFonts() {
    return this.request('/fonts');
  }

  async uploadFont(formData: FormData) {
    return this.request('/fonts', {
      method: 'POST',
      headers: {}, // Remove Content-Type to let browser set it for FormData
      body: formData,
    });
  }

  async deleteFont(fontId: string) {
    return this.request(`/fonts/${fontId}`, {
      method: 'DELETE',
    });
  }

  async updateFont(fontId: string, data: any) {
    return this.request(`/fonts/${fontId}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  // Font Group API methods
  async getFontGroups() {
    return this.request('/font-groups');
  }

  async createFontGroup(data: any) {
    return this.request('/font-groups', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateFontGroup(groupId: string, data: any) {
    return this.request(`/font-groups/${groupId}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteFontGroup(groupId: string) {
    return this.request(`/font-groups/${groupId}`, {
      method: 'DELETE',
    });
  }

  // Health check
  async healthCheck() {
    return this.request('/health');
  }
}

export const apiService = new ApiService();