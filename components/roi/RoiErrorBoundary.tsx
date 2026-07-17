"use client";

import { Component, type ErrorInfo, type ReactNode } from "react";
import { RoiNativeStyles } from "./RoiNativeStyles";

type RoiErrorBoundaryProps = {
  children: ReactNode;
};

type State = { hasError: boolean };

export class RoiErrorBoundary extends Component<RoiErrorBoundaryProps, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    console.error("[RoiCalculator]", error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <>
          <RoiNativeStyles />
          <p className="roi-error" style={{ textAlign: "center", padding: "2rem" }}>
            No pudimos cargar la calculadora. Recarga la página e inténtalo de nuevo.
          </p>
        </>
      );
    }
    return this.props.children;
  }
}
