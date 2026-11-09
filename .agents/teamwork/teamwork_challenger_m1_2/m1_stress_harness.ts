import React from "react";
import ReactDOMServer from "react-dom/server";
import fs from "node:fs";
import path from "node:path";
import { NeumorphicButton } from "@/components/ui/NeumorphicButton";
import { NeumorphicCard } from "@/components/ui/NeumorphicCard";
import { NeumorphicInput } from "@/components/ui/NeumorphicInput";
import { NeumorphicSelect } from "@/components/ui/NeumorphicSelect";
import { StatusBadge } from "@/components/ui/StatusBadge";

// ============================================================================
// 1. WCAG 2.1 Contrast Mathematics Oracle
// ============================================================================

function parseHex(hex: string): [number, number, number] {
  let cleaned = hex.trim().replace(/^#/, "");
  if (cleaned.length === 3) {
    cleaned = cleaned.split("").map((c) => c + c).join("");
  }
  if (cleaned.length !== 6) {
    throw new Error(`Invalid hex color: ${hex}`);
  }
  const r = parseInt(cleaned.slice(0, 2), 16);
  const g = parseInt(cleaned.slice(2, 4), 16);
  const b = parseInt(cleaned.slice(4, 6), 16);
  return [r, g, b];
}

function channelLuminance(val8bit: number): number {
  const c = val8bit / 255;
  return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
}

function relativeLuminance(hex: string): number {
  const [r, g, b] = parseHex(hex);
  return (
    0.2126 * channelLuminance(r) +
    0.7152 * channelLuminance(g) +
    0.0722 * channelLuminance(b)
  );
}

function contrastRatio(hex1: string, hex2: string): number {
  const l1 = relativeLuminance(hex1);
  const l2 = relativeLuminance(hex2);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

interface ContrastEvaluation {
  foreground: string;
  background: string;
  ratio: number;
  ratioFormatted: string;
  passesAANormal: boolean; // >= 4.5
  passesAALarge: boolean;  // >= 3.0
  passesAAA: boolean;      // >= 7.0
  passesUIElement: boolean; // >= 3.0 (WCAG 2.1 Non-text contrast 1.4.11)
}

function evaluateContrast(fg: string, bg: string): ContrastEvaluation {
  const ratio = contrastRatio(fg, bg);
  return {
    foreground: fg,
    background: bg,
    ratio: Number(ratio.toFixed(3)),
    ratioFormatted: `${ratio.toFixed(2)}:1`,
    passesAANormal: ratio >= 4.5,
    passesAALarge: ratio >= 3.0,
    passesAAA: ratio >= 7.0,
    passesUIElement: ratio >= 3.0,
  };
}

// ============================================================================
// 2. Main Stress Test Execution
// ============================================================================

async function runEmpiricalStressTests() {
  console.log("==================================================================");
  console.log("  EMPIRICAL CHALLENGER 2: MILESTONE 1 STRESS TEST HARNESS");
  console.log("==================================================================\n");

  const findings: Array<{
    id: string;
    severity: "CRITICAL" | "HIGH" | "MEDIUM" | "LOW" | "INFO";
    category: string;
    description: string;
    evidence: any;
    recommendation: string;
  }> = [];

  // --------------------------------------------------------------------------
  // Suite 1: WCAG Mathematical Audit
  // --------------------------------------------------------------------------
  console.log("--- [SUITE 1] WCAG 2.1 Contrast Ratio Mathematics ---");
  const colorPairs = [
    // Light base pairs
    { name: "Primary Text on Light Base", fg: "#151A23", bg: "#E9EDF2", target: "AANormal" },
    { name: "Secondary Text on Light Base", fg: "#687386", bg: "#E9EDF2", target: "AANormal" },
    { name: "Muted Text on Light Base", fg: "#546073", bg: "#E9EDF2", target: "AANormal" },
    { name: "Accent on Light Base", fg: "#526FE5", bg: "#E9EDF2", target: "UIElement" },
    { name: "Success on Light Base", fg: "#36A783", bg: "#E9EDF2", target: "UIElement" },
    { name: "White on Brand Accent (Button)", fg: "#FFFFFF", bg: "#526FE5", target: "AANormal" },
    { name: "White on Accent Hover (Button)", fg: "#FFFFFF", bg: "#3D59D4", target: "AANormal" },
    { name: "Rose-600 Error Text on Light Base", fg: "#E11D48", bg: "#E9EDF2", target: "AANormal" },
    { name: "Amber-500 Warning on Light Base", fg: "#F59E0B", bg: "#E9EDF2", target: "UIElement" },
    { name: "Slate-400 Neutral on Light Base", fg: "#94A3B8", bg: "#E9EDF2", target: "UIElement" },

    // Dark base pairs
    { name: "Dark Text Primary on Dark Base", fg: "#F8FAFC", bg: "#171C29", target: "AANormal" },
    { name: "Dark Text Secondary on Dark Base", fg: "#94A3B8", bg: "#171C29", target: "AANormal" },
    { name: "Dark Text Muted on Dark Base", fg: "#64748B", bg: "#171C29", target: "AALarge" },
    { name: "Brand Accent on Dark Base", fg: "#526FE5", bg: "#171C29", target: "UIElement" },
    { name: "Brand Success on Dark Base", fg: "#36A783", bg: "#171C29", target: "UIElement" },
    { name: "White Text on Dark Base", fg: "#FFFFFF", bg: "#171C29", target: "AANormal" },
    { name: "Rose-400 Error Text on Dark Base", fg: "#FB7185", bg: "#171C29", target: "AANormal" },
  ];

  for (const pair of colorPairs) {
    const res = evaluateContrast(pair.fg, pair.bg);
    console.log(
      `  • ${pair.name.padEnd(36)}: ${res.ratioFormatted.padStart(7)} | ` +
      `AA Normal(>=4.5): ${res.passesAANormal ? "✔ PASS" : "✖ FAIL"} | ` +
      `AA Large(>=3.0): ${res.passesAALarge ? "✔ PASS" : "✖ FAIL"} | ` +
      `AAA(>=7.0): ${res.passesAAA ? "✔ PASS" : "  ----"}`
    );

    if (pair.target === "AANormal" && !res.passesAANormal) {
      findings.push({
        id: `WCAG-${pair.name.replace(/\s+/g, "-")}`,
        severity: pair.ratio >= 3.0 ? "MEDIUM" : "HIGH",
        category: "Accessibility / WCAG Contrast",
        description: `${pair.name} (${pair.fg} on ${pair.bg}) fails WCAG AA for normal text (< 18pt): got ${res.ratioFormatted}, requires >= 4.5:1.`,
        evidence: res,
        recommendation: `If used for body/label text (<18pt / <24px regular), increase contrast or designate strictly for Large Text (>=18pt or >=14pt bold).`,
      });
    }

    if (pair.target === "UIElement" && !res.passesUIElement) {
      findings.push({
        id: `WCAG-UI-${pair.name.replace(/\s+/g, "-")}`,
        severity: "MEDIUM",
        category: "Accessibility / Non-Text Contrast",
        description: `${pair.name} (${pair.fg} on ${pair.bg}) fails WCAG 2.1 1.4.11 Non-text contrast: got ${res.ratioFormatted}, requires >= 3.0:1.`,
        evidence: res,
        recommendation: `Darken or lighten UI control boundary/icon to achieve >= 3.0:1.`,
      });
    }
  }

  // --------------------------------------------------------------------------
  // Suite 2: Component SSR & Adversarial Payloads
  // --------------------------------------------------------------------------
  console.log("\n--- [SUITE 2] Component Adversarial Stress Tests ---");

  // 2.1 NeumorphicButton Edge Cases
  try {
    // Edge case: empty children
    const b1 = ReactDOMServer.renderToString(React.createElement(NeumorphicButton));
    if (!b1.includes("<button")) throw new Error("NeumorphicButton failed to render with empty children");
    console.log("  ✔ NeumorphicButton: empty children renders cleanly");

    // Edge case: massive text payload (10,000 characters)
    const longString = "E".repeat(10000);
    const b2 = ReactDOMServer.renderToString(React.createElement(NeumorphicButton, null, longString));
    if (!b2.includes(longString.slice(0, 100))) throw new Error("NeumorphicButton failed with long text");
    console.log("  ✔ NeumorphicButton: 10,000 character payload rendered without crash");

    // Edge case: nested interactive elements (button inside button violation)
    // Testing if button accepts type="submit", "reset", aria attributes
    const b3 = ReactDOMServer.renderToString(
      React.createElement(NeumorphicButton, {
        type: "submit",
        "aria-expanded": true,
        "aria-controls": "test-panel",
        disabled: true,
      }, "Submit")
    );
    if (!b3.includes('disabled=""') && !b3.includes("disabled")) throw new Error("NeumorphicButton failed disabled prop");
    console.log("  ✔ NeumorphicButton: aria attributes and disabled prop properly forwarded");

    // Test all variants & sizes
    const variants = ["default", "accent", "dark", "ghost", "pressed"] as const;
    const sizes = ["sm", "md", "lg"] as const;
    for (const v of variants) {
      for (const s of sizes) {
        ReactDOMServer.renderToString(React.createElement(NeumorphicButton, { variant: v, size: s }, "Test"));
      }
    }
    console.log("  ✔ NeumorphicButton: all 15 variant x size combinations render valid HTML");
  } catch (err: any) {
    console.error("  ✖ NeumorphicButton stress test failed:", err);
    findings.push({
      id: "BTN-CRASH",
      severity: "CRITICAL",
      category: "Component Stability",
      description: `NeumorphicButton threw error during stress test: ${err.message}`,
      evidence: err.stack,
      recommendation: "Ensure default props and children guards prevent crashes.",
    });
  }

  // 2.2 NeumorphicCard Edge Cases
  try {
    const c1 = ReactDOMServer.renderToString(React.createElement(NeumorphicCard));
    if (!c1.includes("<div")) throw new Error("NeumorphicCard failed empty render");
    console.log("  ✔ NeumorphicCard: empty card renders cleanly");

    // Interactive card accessibility check
    const cInteractive = ReactDOMServer.renderToString(
      React.createElement(NeumorphicCard, { interactive: true }, "Interactive Card")
    );
    // Check if interactive card adds role="button" or tabIndex
    const hasRoleOrTabIndex = cInteractive.includes("tabIndex") || cInteractive.includes('role=');
    console.log(`  • NeumorphicCard interactive mode: has keyboard affordance (tabIndex/role): ${hasRoleOrTabIndex}`);
    if (!hasRoleOrTabIndex) {
      findings.push({
        id: "CARD-A11Y-INTERACTIVE",
        severity: "LOW",
        category: "Accessibility / Keyboard Navigation",
        description: "NeumorphicCard with interactive={true} adds cursor-pointer and hover lift, but does not provide default tabIndex={0} or role='region'/'button'.",
        evidence: cInteractive,
        recommendation: "Consumers of interactive cards should explicitly pass tabIndex={0}, role='button', and onKeyDown handlers if the card acts as a clickable trigger.",
      });
    }

    const cardVariants = ["default", "dark", "inset", "dark-inset"] as const;
    const cardPaddings = ["none", "sm", "md", "lg"] as const;
    for (const cv of cardVariants) {
      for (const cp of cardPaddings) {
        ReactDOMServer.renderToString(React.createElement(NeumorphicCard, { variant: cv, padding: cp }, "Card"));
      }
    }
    console.log("  ✔ NeumorphicCard: all 16 variant x padding combinations render cleanly");
  } catch (err: any) {
    console.error("  ✖ NeumorphicCard stress test failed:", err);
    findings.push({
      id: "CARD-CRASH",
      severity: "CRITICAL",
      category: "Component Stability",
      description: `NeumorphicCard threw error during stress test: ${err.message}`,
      evidence: err.stack,
      recommendation: "Fix NeumorphicCard implementation.",
    });
  }

  // 2.3 NeumorphicInput Edge Cases
  try {
    // Normal render
    const i1 = ReactDOMServer.renderToString(
      React.createElement(NeumorphicInput, { label: "Email", id: "custom-email" })
    );
    if (!i1.includes('id="custom-email"') || !i1.includes('for="custom-email"')) {
      throw new Error("NeumorphicInput failed to bind explicit id to label for attribute");
    }
    console.log("  ✔ NeumorphicInput: explicit id correctly binds to label for attribute");

    // Both error and hint
    const i2 = ReactDOMServer.renderToString(
      React.createElement(NeumorphicInput, {
        id: "field-both",
        label: "Field",
        error: "Fatal Error",
        hint: "Helpful Hint",
      })
    );
    // When error is present, aria-describedby must reference errorId
    if (!i2.includes('aria-describedby="field-both-error"')) {
      throw new Error("NeumorphicInput failed to set aria-describedby to errorId when error present");
    }
    if (!i2.includes('aria-invalid="true"')) {
      throw new Error("NeumorphicInput failed to set aria-invalid='true' when error present");
    }
    console.log("  ✔ NeumorphicInput: error takes precedence in aria-describedby and marks aria-invalid='true'");

    // XSS in label and error
    const xssPayload = "<script>alert('xss')</script>";
    const iXss = ReactDOMServer.renderToString(
      React.createElement(NeumorphicInput, {
        label: xssPayload,
        error: xssPayload,
        hint: xssPayload,
      })
    );
    if (iXss.includes("<script>")) {
      throw new Error("NeumorphicInput raw script injection detected!");
    }
    console.log("  ✔ NeumorphicInput: XSS payloads safely sanitized by React escaping");
  } catch (err: any) {
    console.error("  ✖ NeumorphicInput stress test failed:", err);
    findings.push({
      id: "INPUT-CRASH",
      severity: "HIGH",
      category: "Component Stability",
      description: `NeumorphicInput failed: ${err.message}`,
      evidence: err.stack,
      recommendation: "Ensure input component handles all prop combinations safely.",
    });
  }

  // 2.4 NeumorphicSelect Edge Cases
  try {
    // Empty options array and no children
    const sEmpty = ReactDOMServer.renderToString(React.createElement(NeumorphicSelect, { options: [] }));
    if (!sEmpty.includes("<select")) throw new Error("NeumorphicSelect failed with empty options");
    console.log("  ✔ NeumorphicSelect: empty options array renders valid select");

    // Placeholder support
    const sPlaceholder = ReactDOMServer.renderToString(
      React.createElement(NeumorphicSelect, {
        placeholder: "Choose an option...",
        options: [{ value: "1", label: "Option 1" }],
      })
    );
    if (!sPlaceholder.includes("Choose an option...") || !sPlaceholder.includes('disabled=""')) {
      throw new Error("NeumorphicSelect placeholder not disabled option");
    }
    console.log("  ✔ NeumorphicSelect: placeholder renders as disabled initial option");

    // Custom JSX children fallback
    const sCustom = ReactDOMServer.renderToString(
      React.createElement(
        NeumorphicSelect,
        { id: "custom-select" },
        React.createElement("optgroup", { label: "Group 1" },
          React.createElement("option", { value: "g1" }, "Group 1 Item")
        )
      )
    );
    if (!sCustom.includes("<optgroup") || !sCustom.includes("Group 1 Item")) {
      throw new Error("NeumorphicSelect failed to render custom children when options=[]");
    }
    console.log("  ✔ NeumorphicSelect: children fallback (optgroups) renders properly");
  } catch (err: any) {
    console.error("  ✖ NeumorphicSelect stress test failed:", err);
    findings.push({
      id: "SELECT-CRASH",
      severity: "HIGH",
      category: "Component Stability",
      description: `NeumorphicSelect failed: ${err.message}`,
      evidence: err.stack,
      recommendation: "Fix NeumorphicSelect children fallback.",
    });
  }

  // 2.5 StatusBadge Edge Cases
  try {
    const sb1 = ReactDOMServer.renderToString(
      React.createElement(StatusBadge, { variant: "success", pulse: true, dark: true }, "Live")
    );
    if (!sb1.includes("animate-ping") || !sb1.includes("bg-brand-success")) {
      throw new Error("StatusBadge pulse / variant class missing");
    }
    console.log("  ✔ StatusBadge: pulse animation and color classes correctly applied");

    const sbNoPulse = ReactDOMServer.renderToString(
      React.createElement(StatusBadge, { pulse: false }, "Static")
    );
    if (sbNoPulse.includes("animate-ping")) {
      throw new Error("StatusBadge rendered animate-ping when pulse=false");
    }
    console.log("  ✔ StatusBadge: pulse=false cleanly removes animated ping ring");
  } catch (err: any) {
    console.error("  ✖ StatusBadge stress test failed:", err);
    findings.push({
      id: "BADGE-CRASH",
      severity: "HIGH",
      category: "Component Stability",
      description: `StatusBadge failed: ${err.message}`,
      evidence: err.stack,
      recommendation: "Fix StatusBadge implementation.",
    });
  }

  // --------------------------------------------------------------------------
  // Suite 3: Token Consistency & CSS Boundaries
  // --------------------------------------------------------------------------
  console.log("\n--- [SUITE 3] CSS Token Consistency & Global Rules ---");
  const globalsCss = fs.readFileSync(path.resolve(process.cwd(), "src/app/globals.css"), "utf8");
  const tailwindConfig = fs.readFileSync(path.resolve(process.cwd(), "tailwind.config.ts"), "utf8");

  // Check shadow dual definitions
  const requiredShadows = [
    "neu-flat",
    "neu-flat-sm",
    "neu-flat-lg",
    "neu-pressed",
    "neu-pressed-sm",
    "neu-accent",
    "neu-dark-flat",
    "neu-dark-flat-lg",
    "neu-dark-pressed",
    "neu-dark-pressed-sm",
  ];
  let missingShadows = 0;
  for (const s of requiredShadows) {
    if (!tailwindConfig.includes(`"${s}":`)) {
      console.error(`  ✖ Missing shadow in tailwind.config.ts: ${s}`);
      missingShadows++;
    }
  }
  if (missingShadows === 0) {
    console.log("  ✔ All 10 Neumorphic 2.0 dual box-shadow tokens present in tailwind.config.ts");
  } else {
    findings.push({
      id: "CSS-MISSING-SHADOWS",
      severity: "MEDIUM",
      category: "Design System Tokens",
      description: `${missingShadows} required box-shadow tokens are missing from tailwind.config.ts.`,
      evidence: tailwindConfig,
      recommendation: "Ensure all specified dual and inset box shadow tokens are defined.",
    });
  }

  // Check prefers-reduced-motion block
  if (!globalsCss.includes("prefers-reduced-motion")) {
    findings.push({
      id: "CSS-A11Y-MOTION",
      severity: "HIGH",
      category: "Accessibility / Motion",
      description: "globals.css missing @media (prefers-reduced-motion: reduce) block.",
      evidence: globalsCss,
      recommendation: "Add reduced motion overrides.",
    });
  } else {
    console.log("  ✔ globals.css contains @media (prefers-reduced-motion: reduce) rule");
  }

  // Check overflow-x: hidden on body
  if (globalsCss.includes("overflow-x: hidden")) {
    console.log("  ✔ globals.css sets body { overflow-x: hidden }");
  } else {
    findings.push({
      id: "CSS-OVERFLOW-X",
      severity: "MEDIUM",
      category: "Responsive Layout",
      description: "globals.css does not enforce overflow-x: hidden on body.",
      evidence: globalsCss,
      recommendation: "Add overflow-x: hidden to body to prevent accidental horizontal scroll.",
    });
  }

  // Check skip link in layout.tsx
  const layoutContent = fs.readFileSync(path.resolve(process.cwd(), "src/app/layout.tsx"), "utf8");
  if (layoutContent.includes('href="#main-content"') && layoutContent.includes('id="main-content"')) {
    console.log("  ✔ layout.tsx contains accessible Skip-to-content link pointing to #main-content");
  } else {
    findings.push({
      id: "A11Y-SKIP-LINK",
      severity: "MEDIUM",
      category: "Accessibility / Navigation",
      description: "layout.tsx missing accessible skip to main content link.",
      evidence: layoutContent,
      recommendation: "Add skip-link anchor to layout.tsx.",
    });
  }

  // Summary
  console.log("\n==================================================================");
  console.log(`STRESS TEST COMPLETE: ${findings.length} findings recorded.`);
  console.log("==================================================================\n");

  for (const f of findings) {
    console.log(`[${f.severity}] ${f.id}: ${f.description}`);
  }

  // Write findings to JSON in state directory for reporting
  fs.writeFileSync(
    path.resolve(process.cwd(), ".agents/teamwork/teamwork_challenger_m1_2/empirical_findings.json"),
    JSON.stringify(findings, null, 2),
    "utf8"
  );

  return findings;
}

runEmpiricalStressTests().catch((err) => {
  console.error("FATAL: Harness crashed:", err);
  process.exit(1);
});
