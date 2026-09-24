const fs = require('fs');

function updateProjects(file) {
  let code = fs.readFileSync(file, 'utf8');
  
  if (file.includes('projects.tsx')) {
    code = code.replace(/import \{ projects as allProjects \} from '@\/data\/projects';/, "import { useData } from '@/context/DataContext';");
    code = code.replace(/export default function Projects\(\) \{/, "export default function Projects() {\n  const { projects: allProjects } = useData();\n");
  } else if (file.includes('project-detail.tsx')) {
    code = code.replace(/import \{ projects \} from '@\/data\/projects';/, "import { useData } from '@/context/DataContext';");
    code = code.replace(/export default function ProjectDetail\(\) \{/, "export default function ProjectDetail() {\n  const { projects } = useData();\n");
  } else if (file.includes('why-us.tsx')) {
    code = code.replace(/import \{ projects \} from '@\/data\/projects';/, "import { useData } from '@/context/DataContext';");
    code = code.replace(/export default function WhyUs\(\) \{/, "export default function WhyUs() {\n  const { projects } = useData();\n");
  }
  
  fs.writeFileSync(file, code);
}

updateProjects('src/pages/projects.tsx');
updateProjects('src/pages/project-detail.tsx');
updateProjects('src/pages/why-us.tsx');
console.log('Fixed projects, project-detail, why-us');
