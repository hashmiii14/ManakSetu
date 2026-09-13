import React from 'react';
import { AlertTriangle, RotateCcw, Home } from 'lucide-react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("[ErrorBoundary caught an error]:", error, errorInfo);
    this.setState({ errorInfo });
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    if (this.props.onReset) {
      this.props.onReset();
    }
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-[300px] flex items-center justify-center p-6 bg-slate-50 border border-slate-300 rounded-sm m-4 text-left">
          <div className="max-w-md w-full space-y-4">
            <div className="flex items-center gap-3 text-red-700">
              <div className="p-2 bg-red-100 border border-red-200 rounded-sm">
                <AlertTriangle className="w-5 h-5 text-red-700" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  Section Display Exception
                </h3>
                <p className="text-xs text-slate-500">
                  ManakSetu recovered safely to maintain portal availability.
                </p>
              </div>
            </div>

            {this.state.error && (
              <div className="p-3 bg-white rounded-sm border border-slate-300 text-xs text-slate-700 font-mono overflow-auto max-h-32">
                {this.state.error.message || String(this.state.error)}
              </div>
            )}

            <div className="flex items-center gap-2 pt-2">
              <button
                onClick={this.handleReset}
                className="px-3.5 py-1.5 rounded-sm bg-gov-800 hover:bg-gov-900 text-white text-xs font-bold inline-flex items-center gap-1.5 transition-colors shadow-2xs"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Retry Action</span>
              </button>

              <button
                onClick={() => window.location.reload()}
                className="px-3.5 py-1.5 rounded-sm bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 text-xs font-semibold inline-flex items-center gap-1.5 transition-colors"
              >
                <Home className="w-3.5 h-3.5" />
                <span>Reload Page</span>
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
