const fs = require('fs');
let code = fs.readFileSync('src/pages/admin.tsx', 'utf8');

// The replacement code for handleProjectImageUpload
const newProjectImageUpload = `  const handleProjectImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploadingImage(true);

    try {
      const newUrls = [];
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const formData = new FormData();
        formData.append('file', file);
        
        const res = await fetch(\`\${API_URL}/upload\`, {
          method: 'POST',
          body: formData
        });
        
        if (!res.ok) throw new Error('Upload failed');
        const { publicUrl } = await res.json();
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
  };`;

code = code.replace(
  /const handleProjectImageUpload = async.*?setUploadingImage\(false\);\r?\n\s*\};\r?\n\s*\};/s, 
  newProjectImageUpload
);

// I must also add handleFileUpload and uploadedUrl state if they are missing or fix them if they exist
if (!code.includes('const [uploadedUrl, setUploadedUrl]')) {
  code = code.replace(
    /const \[uploadingImage, setUploadingImage\] = useState\(false\);/,
    "const [uploadingImage, setUploadingImage] = useState(false);\n  const [uploadedUrl, setUploadedUrl] = useState('');"
  );
}

const newMediaUpload = `  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploadingImage(true);
    try {
      const file = files[0];
      const formData = new FormData();
      formData.append('file', file);
      
      const res = await fetch(\`\${API_URL}/upload\`, {
        method: 'POST',
        body: formData
      });
      
      if (!res.ok) throw new Error('Upload failed');
      const { publicUrl } = await res.json();
      setUploadedUrl(publicUrl);
    } catch (error) {
      alert('Upload failed');
    } finally {
      setUploadingImage(false);
    }
  };`;

// Insert handleFileUpload before handleProjectImageUpload if it doesn't exist
if (!code.includes('const handleFileUpload = async')) {
  code = code.replace(
    /const handleProjectImageUpload/,
    newMediaUpload + '\n\n  const handleProjectImageUpload'
  );
} else {
  // Replace existing handleFileUpload
  code = code.replace(
    /const handleFileUpload = async.*?setUploadingImage\(false\);\r?\n\s*\};\r?\n\s*\};/s,
    newMediaUpload
  );
}

fs.writeFileSync('src/pages/admin.tsx', code);
console.log('Fixed admin.tsx upload routes!');
