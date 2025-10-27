// routes/index.tsx
import { redirect } from "react-router";

export function loader(){
  return redirect('/store');
}
