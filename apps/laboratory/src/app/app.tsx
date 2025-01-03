
import { ThemeProvider } from "@react-lab-nx/ui-components";
import { Layout } from "./layout";


export default function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Layout />
    </ThemeProvider>
  )
}

