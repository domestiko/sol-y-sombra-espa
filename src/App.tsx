console.log("Loading App.tsx...");

// Test with minimal imports first
import { Component, ErrorInfo, ReactNode } from "react";
console.log("Imported React components");

// Error Boundary Component for debugging
class ErrorBoundary extends Component<
  { children: ReactNode },
  { hasError: boolean; error?: Error }
> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    console.error("ErrorBoundary caught an error:", error);
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("ErrorBoundary details:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: 20, color: 'red', backgroundColor: 'white' }}>
          <h1>Something went wrong.</h1>
          <p>{this.state.error?.message}</p>
        </div>
      );
    }
    return this.props.children;
  }
}

const App = () => {
  console.log("App component starting...");
  
  try {
    console.log("Rendering minimal app...");
    return (
      <ErrorBoundary>
        <div style={{ padding: 20, backgroundColor: 'white', color: 'black' }}>
          <h1>App is working!</h1>
          <p>If you can see this, the basic app is loading correctly.</p>
        </div>
      </ErrorBoundary>
    );
  } catch (error) {
    console.error("Error in App component:", error);
    return (
      <div style={{ padding: 20, color: 'red', backgroundColor: 'white' }}>
        <h1>App Error</h1>
        <p>{error instanceof Error ? error.message : 'Unknown error'}</p>
      </div>
    );
  }
};

console.log("App component defined");

export default App;
