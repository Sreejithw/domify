import express, { Request, Response } from 'express';
import cors from 'cors';
import { FormData } from './types';


const app = express();
const port = 8000;

app.use(cors());

const data: FormData = {
    commands: ["submit"],
    content: [
      {
        id: "1",
        domType: "form",
        content: [
          {
            id: "2",
            domType: "input",
            type: "text",
            label: "Field 1",
            required: true
          },
          {
            id: "3",
            domType: "input",
            type: "text",
            label: "Field 2",
            required: true
          },
          {
            id: "4",
            domType: "input",
            type: "number",
            label: "Field 3",
            required: true
          },
          {
            id: "5",
            domType: "input",
            type: "checkbox",
            label: "Field 4"
          }
        ]
      },
      {
        id: "6",
        domType: "div",
        content: [
          {
            id: "7",
            domType: "input",
            type: "checkbox",
            label: "Field 4"
          }
        ]
      }
    ]
};
app.get('/api/form-data', (_req: Request, res: Response) => {
    res.json(data);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});