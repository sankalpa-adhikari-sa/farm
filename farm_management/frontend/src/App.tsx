import "./App.css";
import { ThemeProvider } from "@/components/theme-provider";
// import { ModeToggle } from "./mode-toggle";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Navbar from "./components/Navbar";
import Sidebar from "./components/sidebar";
import Body from "./components/Body";

function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <div className="flex bg-background h-screen w-screen">
          <Sidebar />
          <div className="w-full h-full">
            <Navbar />
            <Body />
          </div>
        </div>
      </ThemeProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default App;
