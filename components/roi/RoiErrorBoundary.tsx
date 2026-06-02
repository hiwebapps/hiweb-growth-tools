"use client";

import { Component, type ErrorInfo, type ReactNode } from "react";
import { RoiDesignerPreview, type RoiDesignerPreviewProps } from "./RoiDesignerPreview";

type RoiErrorBoundaryProps = RoiDesignerPreviewProps & {
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
      return <RoiDesignerPreview {...this.props} />;
    }
    return this.props.children;
  }
}
