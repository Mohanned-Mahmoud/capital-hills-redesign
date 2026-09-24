import { useState, useEffect } from 'react';
import { Shell } from '@/components/site';
import { FadeIn } from '@/components/animations';

const API_URL = 'http://localhost:3001/api';

export default function Admin() {
  const [activeTab, setActiveTab] = useState<'content' | 'projects' | 'media'>('content');
  
  const [contentBlocks, setContentBlocks] = useState<any[]>([]);
  const [projects, setProjects] = useState<any[]>([]);
  
  const [loading, setLoading] = useState(true);

  // For adding new content blocks
  const [newKey, setNewKey] = useState('');
  const [newValue, setNewValue] = useState('');

  // For media upload
  const [uploading, setUploading] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState('');

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
      fetchData();
    } catch (e) {
      alert('Error saving');
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setUploadedUrl('');

    try {
      // 1. Get presigned URL
      const res = await fetch(`${API_URL}/upload-url`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ filename: file.name, contentType: file.type })
      });
      const { uploadUrl, publicUrl } = await res.json();

      // 2. Upload file to R2 directly
      await fetch(uploadUrl, {
        method: 'PUT',
        headers: { 'Content-Type': file.type },
        body: file,
      });

      setUploadedUrl(publicUrl);
    } catch (error) {
      alert('Upload failed');
    } finally {
      setUploading(false);
    }
  };

  return (
    <Shell>
      <main className="min-h-screen bg-[#f5f2e9] pt-28 pb-20 px-6">
        <div className="mx-auto max-w-6xl">
          <FadeIn>
            <h1 className="font-display text-4xl text-[#421319] mb-8">Admin Dashboard</h1>
            
            <div className="flex gap-4 mb-8 border-b border-[#947e82]/20 pb-4 overflow-x-auto">
              <button 
                onClick={() => setActiveTab('content')}
                className={`text-sm font-bold uppercase tracking-wider px-4 py-2 rounded-lg transition whitespace-nowrap ${activeTab === 'content' ? 'bg-[#421319] text-[#f5f2e9]' : 'text-[#421319] hover:bg-[#421319]/10'}`}
              >
                Website Content
              </button>
              <button 
                onClick={() => setActiveTab('projects')}
                className={`text-sm font-bold uppercase tracking-wider px-4 py-2 rounded-lg transition whitespace-nowrap ${activeTab === 'projects' ? 'bg-[#421319] text-[#f5f2e9]' : 'text-[#421319] hover:bg-[#421319]/10'}`}
              >
                Projects
              </button>
              <button 
                onClick={() => setActiveTab('media')}
                className={`text-sm font-bold uppercase tracking-wider px-4 py-2 rounded-lg transition whitespace-nowrap ${activeTab === 'media' ? 'bg-[#421319] text-[#f5f2e9]' : 'text-[#421319] hover:bg-[#421319]/10'}`}
              >
                Media Upload
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
                    
                    {/* Add new block */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-[#421319]/30 mb-8 flex flex-col md:flex-row gap-4 items-end">
                      <div className="flex-1 w-full">
                        <label className="block text-xs font-bold uppercase tracking-wider text-[#947e82] mb-3">New Block Key (e.g. footer_text)</label>
                        <input 
                          type="text" 
                          value={newKey}
                          onChange={e => setNewKey(e.target.value)}
                          className="w-full bg-[#f5f2e9] border border-[#947e82]/30 rounded-lg p-3 outline-none focus:border-[#421319]"
                        />
                      </div>
                      <div className="flex-1 w-full">
                        <label className="block text-xs font-bold uppercase tracking-wider text-[#947e82] mb-3">Value (Text)</label>
                        <input 
                          type="text" 
                          value={newValue}
                          onChange={e => setNewValue(e.target.value)}
                          className="w-full bg-[#f5f2e9] border border-[#947e82]/30 rounded-lg p-3 outline-none focus:border-[#421319]"
                        />
                      </div>
                      <button 
                        onClick={() => {
                          if(newKey && newValue) {
                            handleSaveContent(newKey, newValue);
                            setNewKey('');
                            setNewValue('');
                          }
                        }}
                        className="bg-[#421319] text-[#f5f2e9] px-6 py-3 rounded-lg text-sm font-bold hover:bg-[#250f12] transition h-full w-full md:w-auto"
                      >
                        + Add Text
                      </button>
                    </div>

                    <div className="grid gap-6">
                      {contentBlocks.map((block) => {
                        return (
                          <div key={block.id} className="bg-white p-6 rounded-xl shadow-sm border border-[#947e82]/10 relative">
                            <label className="block text-xs font-bold uppercase tracking-wider text-[#947e82] mb-3">{block.id}</label>
                            <textarea 
                              className="w-full bg-[#f5f2e9] border border-[#947e82]/30 rounded-lg p-4 min-h-[100px] outline-none focus:border-[#421319]"
                              defaultValue={block.value}
                              id={`content_${block.id}`}
                            />
                            <button 
                              onClick={() => {
                                const val = (document.getElementById(`content_${block.id}`) as HTMLTextAreaElement).value;
                                handleSaveContent(block.id, val);
                              }}
                              className="mt-4 bg-[#421319] text-[#f5f2e9] px-6 py-2 rounded-lg text-sm font-bold hover:bg-[#250f12] transition"
                            >
                              Save Changes
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {activeTab === 'projects' && (
                  <div>
                    <h2 className="text-2xl font-display text-[#421319] mb-4">Manage Projects</h2>
                    <p className="text-sm text-[#493337] mb-8">Project editing interface will be available here.</p>
                    <div className="grid gap-4 mt-6">
                      {projects.map((p) => (
                        <div key={p.id} className="bg-white p-4 rounded-xl flex items-center justify-between border border-[#947e82]/10">
                          <div>
                            <p className="font-bold text-[#421319]">{p.name}</p>
                            <p className="text-sm text-[#947e82]">{p.city}</p>
                          </div>
                          <button className="text-sm font-bold text-[#421319] underline">Edit (Coming soon)</button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'media' && (
                  <div className="bg-white p-8 rounded-xl shadow-sm border border-[#947e82]/10 text-center">
                    <h2 className="text-2xl font-display text-[#421319] mb-4">Upload to Cloudflare R2</h2>
                    <p className="text-[#947e82] mb-8">Select an image to upload it directly to your R2 bucket.</p>
                    
                    <div className="border-2 border-dashed border-[#947e82]/30 rounded-xl p-12 hover:bg-[#947e82]/5 transition relative">
                      <input 
                        type="file" 
                        onChange={handleFileUpload} 
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        accept="image/*"
                      />
                      <span className="font-bold text-[#421319]">
                        {uploading ? 'Uploading to R2...' : 'Click or drag image here'}
                      </span>
                    </div>

                    {uploadedUrl && (
                      <div className="mt-8 p-4 bg-green-50 border border-green-200 rounded-lg text-left">
                        <p className="text-green-800 font-bold mb-2">Upload Successful!</p>
                        <p className="text-sm text-green-700 break-all mb-4">URL: {uploadedUrl}</p>
                        <img src={uploadedUrl} alt="Uploaded" className="max-h-40 rounded-lg shadow-sm" />
                      </div>
                    )}
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
