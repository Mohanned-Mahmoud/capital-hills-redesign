import { useState, useEffect, useRef } from 'react';
import { Shell } from '@/components/site';
import { FadeIn } from '@/components/animations';

const API_URL = 'http://localhost:3001/api';

export default function Admin() {
  const [activeTab, setActiveTab] = useState<'home' | 'whyus' | 'contact' | 'global' | 'projects' | 'media'>('home');
  
  const [contentBlocks, setContentBlocks] = useState<any[]>([]);
  const [projects, setProjects] = useState<any[]>([]);
  
  const [loading, setLoading] = useState(true);

  // For adding new content blocks
  const [newKey, setNewKey] = useState('');
  const [newValue, setNewValue] = useState('');

  // For projects
  const [editingProject, setEditingProject] = useState<any | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);

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

  const handleProjectImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploadingImage(true);

    try {
      const newUrls = [];
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const res = await fetch(`${API_URL}/upload-url`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ filename: file.name, contentType: file.type })
        });
        const { uploadUrl, publicUrl } = await res.json();

        await fetch(uploadUrl, {
          method: 'PUT',
          headers: { 'Content-Type': file.type },
          body: file,
        });

        newUrls.push(publicUrl);
      }

      setEditingProject((prev: any) => ({
        ...prev,
        gallery: [...(prev.gallery || []), ...newUrls]
      }));
    } catch (error) {
      alert('Upload failed');
    } finally {
      setUploadingImage(false);
    }
  };

  const removeProjectImage = (index: number) => {
    setEditingProject((prev: any) => {
      const g = [...prev.gallery];
      g.splice(index, 1);
      return { ...prev, gallery: g };
    });
  };

  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const method = editingProject.id ? 'PUT' : 'POST';
      const url = editingProject.id ? `${API_URL}/projects/${editingProject.id}` : `${API_URL}/projects`;
      
      await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingProject)
      });
      
      alert('Project saved!');
      setEditingProject(null);
      fetchData();
    } catch (error) {
      alert('Failed to save project');
    }
  };

  const handleDeleteProject = async (id: number) => {
    if(!window.confirm('Are you sure you want to delete this project?')) return;
    try {
      await fetch(`${API_URL}/projects/${id}`, { method: 'DELETE' });
      fetchData();
    } catch (error) {
      alert('Failed to delete project');
    }
  };

  // Group content blocks by page
  const homeBlocks = contentBlocks.filter(b => b.id.startsWith('home_') || b.id.startsWith('stat_') || b.id.startsWith('partners_') || b.id === 'hero_title' || b.id === 'hero_subtitle' || b.id === 'chairman_quote');
  const whyUsBlocks = contentBlocks.filter(b => b.id.startsWith('whyus_'));
  const contactBlocks = contentBlocks.filter(b => b.id.startsWith('contact_'));
  const globalBlocks = contentBlocks.filter(b => b.id.startsWith('global_') || b.id.startsWith('site_') || b.id.startsWith('footer_') || b.id.startsWith('header_'));

  const renderContentTab = (blocks: any[], title: string, desc: string, prefix: string) => (
    <div className="space-y-8">
      <h2 className="text-2xl font-display text-[#421319] mb-4">{title}</h2>
      <p className="text-sm text-[#493337] mb-8">{desc}</p>
      
      {/* Add new block */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-[#421319]/30 mb-8 flex flex-col md:flex-row gap-4 items-end">
        <div className="flex-1 w-full">
          <label className="block text-xs font-bold uppercase tracking-wider text-[#947e82] mb-3">New Block Key (Must start with {prefix})</label>
          <input 
            type="text" 
            value={newKey}
            onChange={e => setNewKey(e.target.value)}
            placeholder={`${prefix}my_new_text`}
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
        {blocks.map((block) => {
          return (
            <div key={block.id} className="bg-white p-6 rounded-xl shadow-sm border border-[#947e82]/10 relative">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#947e82] mb-3">{block.id}</label>
              <textarea 
                className="w-full bg-[#f5f2e9] border border-[#947e82]/30 rounded-lg p-4 min-h-[60px] outline-none focus:border-[#421319]"
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
  );

  return (
    <Shell>
      <main className="min-h-screen bg-[#f5f2e9] pt-28 pb-20 px-6">
        <div className="mx-auto max-w-6xl">
          <FadeIn>
            <h1 className="font-display text-4xl text-[#421319] mb-8">Admin Dashboard</h1>
            
            <div className="flex gap-4 mb-8 border-b border-[#947e82]/20 pb-4 overflow-x-auto">
              <button onClick={() => setActiveTab('home')} className={`text-sm font-bold uppercase tracking-wider px-4 py-2 rounded-lg transition whitespace-nowrap ${activeTab === 'home' ? 'bg-[#421319] text-[#f5f2e9]' : 'text-[#421319] hover:bg-[#421319]/10'}`}>Home Page</button>
              <button onClick={() => setActiveTab('whyus')} className={`text-sm font-bold uppercase tracking-wider px-4 py-2 rounded-lg transition whitespace-nowrap ${activeTab === 'whyus' ? 'bg-[#421319] text-[#f5f2e9]' : 'text-[#421319] hover:bg-[#421319]/10'}`}>Why Us Page</button>
              <button onClick={() => setActiveTab('contact')} className={`text-sm font-bold uppercase tracking-wider px-4 py-2 rounded-lg transition whitespace-nowrap ${activeTab === 'contact' ? 'bg-[#421319] text-[#f5f2e9]' : 'text-[#421319] hover:bg-[#421319]/10'}`}>Contact Page</button>
              <button onClick={() => setActiveTab('global')} className={`text-sm font-bold uppercase tracking-wider px-4 py-2 rounded-lg transition whitespace-nowrap ${activeTab === 'global' ? 'bg-[#421319] text-[#f5f2e9]' : 'text-[#421319] hover:bg-[#421319]/10'}`}>Global (Footer/Header)</button>
              <button onClick={() => { setActiveTab('projects'); setEditingProject(null); }} className={`text-sm font-bold uppercase tracking-wider px-4 py-2 rounded-lg transition whitespace-nowrap ${activeTab === 'projects' ? 'bg-[#421319] text-[#f5f2e9]' : 'text-[#421319] hover:bg-[#421319]/10'}`}>Projects</button>
              <button onClick={() => setActiveTab('media')} className={`text-sm font-bold uppercase tracking-wider px-4 py-2 rounded-lg transition whitespace-nowrap ${activeTab === 'media' ? 'bg-[#421319] text-[#f5f2e9]' : 'text-[#421319] hover:bg-[#421319]/10'}`}>Media Upload</button>
            </div>

            {loading ? (
              <p>Loading data...</p>
            ) : (
              <div>
                {activeTab === 'home' && renderContentTab(homeBlocks, 'Home Page Content', 'Edit the hero, stats, and text on the Home page.', 'home_')}
                {activeTab === 'whyus' && renderContentTab(whyUsBlocks, 'Why Us Page Content', 'Edit the pillars and text on the Why Us page.', 'whyus_')}
                {activeTab === 'contact' && renderContentTab(contactBlocks, 'Contact Page Content', 'Edit the contact information and titles.', 'contact_')}
                {activeTab === 'global' && renderContentTab(globalBlocks, 'Global Content', 'Edit footer text, header text, and overall site elements.', 'global_')}

                {activeTab === 'projects' && (
                  <div>
                    {!editingProject ? (
                      <>
                        <div className="flex items-center justify-between mb-8">
                          <h2 className="text-2xl font-display text-[#421319]">Manage Projects</h2>
                          <button 
                            onClick={() => setEditingProject({ gallery: [], name: '', slug: '', city: '', location: '', product: '' })}
                            className="bg-[#421319] text-[#f5f2e9] px-6 py-2 rounded-lg text-sm font-bold hover:bg-[#250f12] transition"
                          >
                            + New Project
                          </button>
                        </div>
                        <div className="grid gap-4 mt-6">
                          {projects.map((p) => (
                            <div key={p.id} className="bg-white p-4 rounded-xl flex items-center justify-between border border-[#947e82]/10">
                              <div>
                                <p className="font-bold text-[#421319]">{p.name}</p>
                                <p className="text-sm text-[#947e82]">{p.city}</p>
                              </div>
                              <div className="flex gap-4">
                                <button onClick={() => setEditingProject(p)} className="text-sm font-bold text-[#421319] underline">Edit</button>
                                <button onClick={() => handleDeleteProject(p.id)} className="text-sm font-bold text-red-600 underline">Delete</button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </>
                    ) : (
                      <div className="bg-white p-8 rounded-xl shadow-sm border border-[#947e82]/10">
                        <div className="flex justify-between items-center mb-6 border-b pb-4">
                          <h2 className="text-2xl font-display text-[#421319]">{editingProject.id ? 'Edit Project' : 'New Project'}</h2>
                          <button onClick={() => setEditingProject(null)} className="text-sm font-bold text-[#947e82] hover:text-[#421319]">Cancel</button>
                        </div>

                        <form onSubmit={handleSaveProject} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-[#947e82] mb-2">Project Name *</label>
                            <input required type="text" value={editingProject.name} onChange={e => setEditingProject({...editingProject, name: e.target.value})} className="w-full bg-[#f5f2e9] rounded p-3 outline-none focus:ring-2" />
                          </div>
                          <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-[#947e82] mb-2">Slug (URL friendly) *</label>
                            <input required type="text" value={editingProject.slug} onChange={e => setEditingProject({...editingProject, slug: e.target.value})} className="w-full bg-[#f5f2e9] rounded p-3 outline-none focus:ring-2" />
                          </div>
                          <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-[#947e82] mb-2">City *</label>
                            <input required type="text" value={editingProject.city} onChange={e => setEditingProject({...editingProject, city: e.target.value})} className="w-full bg-[#f5f2e9] rounded p-3 outline-none focus:ring-2" />
                          </div>
                          <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-[#947e82] mb-2">Location *</label>
                            <input required type="text" value={editingProject.location} onChange={e => setEditingProject({...editingProject, location: e.target.value})} className="w-full bg-[#f5f2e9] rounded p-3 outline-none focus:ring-2" />
                          </div>
                          <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-[#947e82] mb-2">Product Type *</label>
                            <input required type="text" value={editingProject.product} onChange={e => setEditingProject({...editingProject, product: e.target.value})} className="w-full bg-[#f5f2e9] rounded p-3 outline-none focus:ring-2" />
                          </div>
                          <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-[#947e82] mb-2">Project Space</label>
                            <input type="text" value={editingProject.projectSpace || ''} onChange={e => setEditingProject({...editingProject, projectSpace: e.target.value})} className="w-full bg-[#f5f2e9] rounded p-3 outline-none focus:ring-2" />
                          </div>
                          <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-[#947e82] mb-2">Built Up Area</label>
                            <input type="text" value={editingProject.builtUpArea || ''} onChange={e => setEditingProject({...editingProject, builtUpArea: e.target.value})} className="w-full bg-[#f5f2e9] rounded p-3 outline-none focus:ring-2" />
                          </div>
                          <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-[#947e82] mb-2">Construction</label>
                            <input type="text" value={editingProject.construction || ''} onChange={e => setEditingProject({...editingProject, construction: e.target.value})} className="w-full bg-[#f5f2e9] rounded p-3 outline-none focus:ring-2" />
                          </div>
                          <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-[#947e82] mb-2">Finishing</label>
                            <input type="text" value={editingProject.finishing || ''} onChange={e => setEditingProject({...editingProject, finishing: e.target.value})} className="w-full bg-[#f5f2e9] rounded p-3 outline-none focus:ring-2" />
                          </div>
                          <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-[#947e82] mb-2">Delivery</label>
                            <input type="text" value={editingProject.delivery || ''} onChange={e => setEditingProject({...editingProject, delivery: e.target.value})} className="w-full bg-[#f5f2e9] rounded p-3 outline-none focus:ring-2" />
                          </div>
                          <div className="col-span-1 md:col-span-2">
                            <label className="block text-xs font-bold uppercase tracking-wider text-[#947e82] mb-2">Description</label>
                            <textarea value={editingProject.description || ''} onChange={e => setEditingProject({...editingProject, description: e.target.value})} className="w-full min-h-[100px] bg-[#f5f2e9] rounded p-3 outline-none focus:ring-2" />
                          </div>
                          
                          {/* GALLERY UPLOAD DIRECTLY IN PROJECT */}
                          <div className="col-span-1 md:col-span-2 border-t pt-6 mt-4">
                            <label className="block text-xs font-bold uppercase tracking-wider text-[#947e82] mb-4">Gallery Images</label>
                            
                            {/* Display current images */}
                            {editingProject.gallery && editingProject.gallery.length > 0 && (
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                                {editingProject.gallery.map((imgUrl: string, idx: number) => (
                                  <div key={idx} className="relative group rounded-lg overflow-hidden border border-[#947e82]/20 aspect-video">
                                    <img src={imgUrl} alt="Project" className="w-full h-full object-cover" />
                                    <button 
                                      type="button"
                                      onClick={() => removeProjectImage(idx)}
                                      className="absolute inset-0 bg-red-600/80 text-white font-bold opacity-0 group-hover:opacity-100 transition flex items-center justify-center"
                                    >
                                      Remove
                                    </button>
                                  </div>
                                ))}
                              </div>
                            )}

                            {/* Direct Upload Button */}
                            <div className="relative overflow-hidden w-full bg-[#f5f2e9] border-2 border-dashed border-[#947e82]/30 p-8 rounded-xl text-center hover:bg-[#947e82]/5 transition cursor-pointer">
                              <input 
                                type="file" 
                                multiple
                                onChange={handleProjectImageUpload} 
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                accept="image/*"
                              />
                              <span className="font-bold text-[#421319]">
                                {uploadingImage ? 'Uploading to Cloudflare R2...' : '+ Select Images to Upload'}
                              </span>
                            </div>
                          </div>

                          <div className="col-span-1 md:col-span-2">
                            <button type="submit" className="w-full bg-[#421319] text-[#f5f2e9] px-6 py-4 rounded-lg text-lg font-bold hover:bg-[#250f12] transition mt-6">
                              Save Project
                            </button>
                          </div>
                        </form>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === 'media' && (
                  <div className="bg-white p-8 rounded-xl shadow-sm border border-[#947e82]/10 text-center">
                    <h2 className="text-2xl font-display text-[#421319] mb-4">Upload to Cloudflare R2</h2>
                    <p className="text-[#947e82] mb-8">Select an image to upload it directly to your R2 bucket. You can then copy the URL to use in your Projects or Content.</p>
                    
                    <div className="border-2 border-dashed border-[#947e82]/30 rounded-xl p-12 hover:bg-[#947e82]/5 transition relative">
                      <input 
                        type="file" 
                        onChange={handleFileUpload} 
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        accept="image/*"
                      />
                      <span className="font-bold text-[#421319]">
                        {uploadingImage ? 'Uploading to R2...' : 'Click or drag image here'}
                      </span>
                    </div>

                    {uploadedUrl && (
                      <div className="mt-8 p-6 bg-green-50 border border-green-200 rounded-lg text-left">
                        <p className="text-green-800 font-bold mb-2 text-lg">Upload Successful!</p>
                        <p className="text-sm text-green-700 break-all mb-4">URL: <a href={uploadedUrl} target="_blank" rel="noreferrer" className="underline">{uploadedUrl}</a></p>
                        <img src={uploadedUrl} alt="Uploaded" className="max-h-40 rounded-lg shadow-sm mb-4" />
                        <button 
                          onClick={() => {
                            navigator.clipboard.writeText(uploadedUrl);
                            alert('Copied to clipboard!');
                          }}
                          className="bg-green-700 text-white px-4 py-2 rounded text-sm font-bold hover:bg-green-800 transition"
                        >
                          Copy URL
                        </button>
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
