// routes/m/index.tsx
import { redirect } from "react-router";

export function loader(){
  return redirect('/m/home');
}
