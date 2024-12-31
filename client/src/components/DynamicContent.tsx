import { useEffect, useState } from "react";

const renderers = {
  form: ({id, children, commands}) => (
    <form id={id} className="space-y-4 border p-4 rounded">
      {children}
      {commands?.includes('submit') && (
        <button type="submit" className="bg-blue-500 hover:bg-700 text-white py-2 px-4 rounded">Submit</button>
      )}
    </form>
  ),
  
  div: ({id, children}) => (
    <div id={id} className="mb-4">{children}</div>
  ),
  
  input: ({id, type, label, required}) => (
    <div id={id} className={`mb-4 ${type === 'checkbox' ? 'flex items-center' : ''}`}>
      {type === 'checkbox' ? (
        <>
          <input type="checkbox" required={required} className="mr-2" />
          <label className="text-sm text-gray-700">{label}</label>
        </>
      ) : (
        <>
          <label className={`block text-sm font-medium text-gray-700 ${required ? 'after:content-["*"] after:text-red-500' : ''}`}>
            {label}
          </label>
          <input 
            type={type}
            required={required}
            className="mt-1 block w-full rounded-md border border-gray-300 p-2"
          />
        </>
      )}
    </div>
  )
};

const DynamicContent = () => {
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/form-data');
        const data = await response.json();
        setFormData(data);
      } catch (error) {
        console.error('Error fetching form data:', error);
      }
    };

    fetchData();
  }, []);

  const renderNode = (node, commands) => {
    const Renderer = renderers[node.domType];
    if (!Renderer) return null;
    
    return (
      <Renderer 
        key={node.id}
        {...node}
        commands={commands}
      >
        {node.content?.map(child => renderNode(child, commands))}
      </Renderer>
    );
  };

  
  if (!formData) return <div>Loading...</div>;
  return (
    <div className="max-w-md mx-auto p-6">
      {formData.content.map(node => renderNode(node, formData.commands))}
    </div>
  );
};

export default DynamicContent;