import React, { createContext, useContext, useEffect, useState } from 'react';
import { Project } from '../data/projects';

type ContentMap = Record<string, string>;

interface DataContextType {
  content: ContentMap;
  projects: Project[];
  loading: boolean;
  refresh: () => Promise<void>;
}

const DataContext = createContext<DataContextType>({
  content: {},
  projects: [],
  loading: true,
  refresh: async () => {},
});

export const useData = () => useContext(DataContext);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [content, setContent] = useState<ContentMap>({});
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      // We will fallback to port 3001 if window.location is 5173
      const isDev = window.location.port === '5173';
      const API_URL = isDev ? 'http://localhost:3001/api' : '/api';
      
      const [contentRes, projectsRes] = await Promise.all([
        fetch(`${API_URL}/content`),
        fetch(`${API_URL}/projects`)
      ]);

      if (contentRes.ok) {
        const contentData = await contentRes.json();
        const map: ContentMap = {};
        contentData.forEach((item: { id: string, value: string }) => {
          map[item.id] = item.value;
        });
        setContent(map);
      }
      
      if (projectsRes.ok) {
        setProjects(await projectsRes.json());
      }
    } catch (e) {
      console.error('Failed to fetch dynamic data:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <DataContext.Provider value={{ content, projects, loading, refresh: fetchData }}>
      {children}
    </DataContext.Provider>
  );
};
