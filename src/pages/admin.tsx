import { useState, useEffect } from 'react';
import { Shell } from '@/components/site';
import { FadeIn } from '@/components/animations';

const API_URL = 'http://localhost:3001/api';

export default function Admin() {
  const [activeTab, setActiveTab] = useState<'content' | 'projects'>('content');
  
  const [contentBlocks, setContentBlocks] = useState<any[]>([]);
  const [projects, setProjects] = useState<any[]>([]);
  
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [contentRes, projectsRes] = await Promise.all([
        fetch(`${API_URL}/content`),
        fetch(`${API_URL}/projects`)
      ]);
      setContentBlocks(await contentRes.json());
      setProjects(await projectsRes.json());
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveContent = async (id: string, value: string) => {
    try {
      await fetch(`${API_URL}/content`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, value })
      });
      alert('Saved!');
    } catch (e) {
      alert('Error saving');
    }
  };

  return (
    <Shell>
      <main className="min-h-screen bg-[#f5f2e9] pt-28 pb-20 px-6">
        <div className="mx-auto max-w-6xl">
          <FadeIn>
            <h1 className="font-display text-4xl text-[#421319] mb-8">Admin Dashboard</h1>
            
            <div className="flex gap-4 mb-8 border-b border-[#947e82]/20 pb-4">
              <button 
                onClick={() => setActiveTab('content')}
                className={`text-sm font-bold uppercase tracking-wider px-4 py-2 rounded-lg transition ${activeTab === 'content' ? 'bg-[#421319] text-[#f5f2e9]' : 'text-[#421319] hover:bg-[#421319]/10'}`}
              >
                Website Content
              </button>
              <button 
                onClick={() => setActiveTab('projects')}
                className={`text-sm font-bold uppercase tracking-wider px-4 py-2 rounded-lg transition ${activeTab === 'projects' ? 'bg-[#421319] text-[#f5f2e9]' : 'text-[#421319] hover:bg-[#421319]/10'}`}
              >
                Projects
              </button>
            </div>

            {loading ? (
              <p>Loading data...</p>
            ) : (
              <div>
                {activeTab === 'content' && (
                  <div className="space-y-8">
                    <h2 className="text-2xl font-display text-[#421319] mb-4">Edit Text Blocks</h2>
                    <p className="text-sm text-[#493337] mb-8">Change titles, descriptions, and paragraphs across the website.</p>
                    
                    {/* Hardcoded fields for now for testing */}
                    {[
                      { id: 'hero_title', label: 'Homepage Hero Title' },
                      { id: 'hero_subtitle', label: 'Homepage Hero Subtitle' },
                      { id: 'chairman_quote', label: 'Chairman Quote' },
                    ].map((field) => {
                      const existing = contentBlocks.find(b => b.id === field.id)?.value || '';
                      return (
                        <div key={field.id} className="bg-white p-6 rounded-xl shadow-sm border border-[#947e82]/10">
                          <label className="block text-xs font-bold uppercase tracking-wider text-[#947e82] mb-3">{field.label}</label>
                          <textarea 
                            className="w-full bg-[#f5f2e9] border border-[#947e82]/30 rounded-lg p-4 min-h-[100px] outline-none focus:border-[#421319]"
                            defaultValue={existing}
                            id={`content_${field.id}`}
                          />
                          <button 
                            onClick={() => {
                              const val = (document.getElementById(`content_${field.id}`) as HTMLTextAreaElement).value;
                              handleSaveContent(field.id, val);
                            }}
                            className="mt-4 bg-[#421319] text-[#f5f2e9] px-6 py-2 rounded-lg text-sm font-bold hover:bg-[#250f12] transition"
                          >
                            Save Changes
                          </button>
                        </div>
                      );
                    })}
                  </div>
                )}

                {activeTab === 'projects' && (
                  <div>
                    <h2 className="text-2xl font-display text-[#421319] mb-4">Manage Projects</h2>
                    <div className="grid gap-4 mt-6">
                      {projects.map((p) => (
                        <div key={p.id} className="bg-white p-4 rounded-xl flex items-center justify-between border border-[#947e82]/10">
                          <div>
                            <p className="font-bold text-[#421319]">{p.name}</p>
                            <p className="text-sm text-[#947e82]">{p.city}</p>
                          </div>
                          <button className="text-sm font-bold text-[#421319] underline">Edit</button>
                        </div>
                      ))}
                      <button className="border-2 border-dashed border-[#947e82]/30 p-6 rounded-xl text-[#947e82] font-bold hover:bg-[#947e82]/5 transition">
                        + Add New Project
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </FadeIn>
        </div>
      </main>
    </Shell>
  );
}
