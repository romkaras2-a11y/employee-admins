// api/employeeApi.ts
import { Employee } from '../types/employee';

const STORAGE_KEY = 'mock_employees';

const INITIAL_DATA: Employee[] =[
  { id: 1, name: 'Anna Schmidt', email: 'anna.s@firma.de', department: 'IT', position: 'Frontend Entwicklerin', status: "Home Office"},
  { id: 2, name: 'Michael Weber', email: 'm.weber@firma.de', department: 'HR', position: 'Personalreferent',status: "Aktiv vor Ort" },
  { id: 3, name: 'Sofia Becker', email: 's.becker@firma.de', department: 'Marketing', position: 'Content Manager',status: "Home Office" },
  { id: 4, name: "Ben Mustermann", email:"b.mustermann@firma.de",position: "Software Entwickler", department: "IT", status: "Aktiv vor Ort" },
  { id: 5, name: "Magda Mustermann",email:"m.mustermann@firma.de", position: "Projektleiterin", department: "Marketing", status: "Home Office" },
  { id: 6, name: "Tom Maier",email:"t.maier@firma.de", position: "UI/UX Designer", department: "Design", status: "Aktiv vor Ort" }, 
  { id: 7, name: "Hans Bayermann", email:"",position: "Software Entwickler", department: "IT", status: "Home Office" },           
  { id: 8,  name: "John Bergmann", email:"jbergmann@firma.de",position: "UI/UX Designer", department: "Design", status: "Home Office" }, 
  { id: 9, name: "Janett Clain", email:"jclain@firma.de",position: "Systemadministrator", department: "IT", status: "Aktiv vor Ort" }, 
  { id: 10, name: 'David Wagner', email: 'd.wagner@firma.de', department: 'IT', position: 'DevOps Engineer',status: "Aktiv vor Ort" },
  { id: 11, name: 'Laura Hoffmann', email: 'l.hoffmann@firma.de', department: 'Finanzen', position: 'Buchhalterin', status: "Aktiv vor Ort"},
  { id: 12, name: 'Thomas Müller', email: 't.mueller@firma.de', department: 'IT', position: 'Software Architekt',  status: "Home Office"},
  { id: 13, name: 'Julia Koch', email: 'j.koch@firma.de', department: 'HR', position: 'Recruiterin' , status: "Home Office"},
  { id: 14, name: "Adam Mayer", email: "a.mayer@firma.de", department: "IT", position: "Backend Entwickler", status: "Home Office" },
  { id: 15, name: "Sharke Dodson",email: "s.dodson@firma.de",department: "Finanzen",position : "Finanzdirektor",status: "Aktiv vor Ort"},
  { id:16, name: "Markap Karson", email: "markap.k@firma.de", department: "IT", position: "Design",status: "Home Office", },
  { id:17,name: "O. Henry", email: "o.henry@firma.de", department: "Design", position: "Hoch UX Designer", status: "Aktiv vor Ort",}
];

if (!localStorage.getItem(STORAGE_KEY)) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_DATA));
}

export const api = {
  async getEmployees(): Promise<Employee[]> {
    await new Promise(resolve => setTimeout(resolve, 300));
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  },
  
  async saveEmployees(employees: Employee[]): Promise<Employee[]> {
    await new Promise(resolve => setTimeout(resolve, 200));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(employees));
    return employees;
  }
};
