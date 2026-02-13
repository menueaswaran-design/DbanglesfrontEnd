import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log the error
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          padding: '40px 20px',
          textAlign: 'center',
          backgroundColor: '#fef2f2',
          minHeight: '200px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          border: '1px solid #fecaca',
          borderRadius: '8px',
          margin: '20px'
        }}>
          <div style={{
            fontSize: '48px',
            marginBottom: '16px'
          }}>
            ⚠️
          </div>
          <h2 style={{
            color: '#991b1b',
            marginBottom: '12px',
            fontSize: '20px',
            fontWeight: '600'
          }}>
            Oops! Something went wrong
          </h2>
          <p style={{
            color: '#6b7280',
            marginBottom: '20px',
            maxWidth: '400px',
            lineHeight: '1.5'
          }}>
            We're sorry, but something unexpected happened. Please try refreshing the page.
          </p>
          <button 
            onClick={() => window.location.reload()}
            style={{
              backgroundColor: '#764ba2',
              color: 'white',
              border: 'none',
              padding: '12px 24px',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'background-color 0.2s'
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#5a3a7a'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#764ba2'}
          >
            Refresh Page
          </button>
          {process.env.NODE_ENV === 'development' && (
            <details style={{
              marginTop: '20px',
              padding: '12px',
              backgroundColor: '#f9fafb',
              border: '1px solid #e5e7eb',
              borderRadius: '6px',
              textAlign: 'left',
              maxWidth: '600px',
              width: '100%'
            }}>
              <summary style={{
                cursor: 'pointer',
                fontWeight: '600',
                color: '#374151'
              }}>
                Error Details (Development Mode)
              </summary>
              <pre style={{
                marginTop: '8px',
                fontSize: '12px',
                color: '#6b7280',
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word'
              }}>
                {this.state.error && this.state.error.toString()}
                {this.state.errorInfo && this.state.errorInfo.componentStack}
              </pre>
            </details>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;