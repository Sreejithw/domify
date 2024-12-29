interface FormField {
    id: string;
    domType: string;
    type?: string;
    label?: string;
    required?: boolean;
    content?: FormField[];
  }
  
interface FormData {
commands: string[];
content: FormField[];
}
  
export { FormField, FormData };