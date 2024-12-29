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
  const data = {
    commands: ["submit"],
    content: [
      {
        "id": "1",
        "domType": "form",
        "content": [
          {
            "id": "2",
            "domType": "input",
            "type": "text",
            "label": "Field 1",
            "required": true
          },
          {
            "id": "3",
            "domType": "input",
            "type": "text",
            "label": "Field 2",
            "required": true
          },
          {
            "id": "4",
            "domType": "input",
            "type": "number",
            "label": "Field 3",
            "required": true
          },
          {
            "id": "5",
            "domType": "input",
            "type": "checkbox",
            "label": "Field 4"
          }
        ]
      },
      {
        "id": "6",
        "domType": "div",
        "content": [
          {
            "id": "7",
            "domType": "input",
            "type": "checkbox",
            "label": "Field 4"
          }
        ]
      }
    ]
  };

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

  return (
    <div className="max-w-md mx-auto p-6">
      {data.content.map(node => renderNode(node, data.commands))}
    </div>
  );
};

export default DynamicContent;